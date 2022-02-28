import {Client, Collection, Intents} from "discord.js";
import { sep } from "path";
import {readdir, readFile} from "fs"
import { BaseCommand } from "./Command";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { promisify } from 'util';
import {createConnection} from "typeorm";
import { Guild } from "../entities/guild";
const readDirAsync = promisify(readdir);

export class Bot extends Client {

    public commands: Collection<string, BaseCommand>;

    constructor(token: string) {
        super({
            presence: {activities: [ { name: 'Atom', type: 1 }], status: 'online'},
            intents: [Object.values(Intents.FLAGS)]
        });
        this.commands = new Collection();
        this.init(token);
    }

    private async init(token: string) {
        await this.login(token).catch(console.error);
        await this.commandLoader();
        this.eventLoader();

        if (process.env.ENVIRONMENT === "DEV") {
            const commands = this.commands.toJSON().map(x => x.bodyForm);
            const rest = new REST({ version: '9' }).setToken(token);
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                  Routes.applicationGuildCommands(process.env.CLIENTID as string, process.env.DEV_GUILDID as string),
                  { body: commands },
                );
                console.log('Successfully reloaded application (/) commands.');
              } catch (error) {
                console.error(error);
              }
        }

        (async () => {
            await createConnection({
                type: "postgres",
                host: process.env.PG_HOST as string,
                port: parseInt(process.env.PG_PORT as string),
                username: process.env.PG_USER as string,
                password: process.env.PG_PASSWORD as string,
                database: process.env.PG_DB as string,
                synchronize: true,
                entities: [Guild]
            }).catch(console.error)
        })()
    }

    async commandLoader(): Promise<void> {
        const content = await readDirAsync("./dist/src/commands/").catch(console.error);
        if (!content || !content.length) return console.log('Please create folder in "commands" folder.');
        let groups: any[] = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element); // If it's a folder
        });
        for (const folder of groups) {
            await readDirAsync(`./dist/src/commands/${folder}`).then((files) => {
                if (files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                files.forEach(element => {
                    const response = this.cmdLoad('../commands/' + folder, `${element}`);
                    if (response) console.log(response);
                });
            }).catch(console.error);
        }
    }

    cmdLoad(commandPath: string, commandName: string) {
        try {
            //@ts-ignore
            const props = new (Object.values(require(`${commandPath}${sep}${commandName}`))[0])(this);
            console.log(`Loading Command: ${props.name}. 👌`);
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    eventLoader() {
        readdir("./dist/src/events", (err, files) => {
            if (!files) return;
            if (err) console.log(err);
            for (const dir of files) {
                readdir(`./dist/src/events/${dir}`, (err, files) => {
                    if (!files) return;
                    if (err) console.log(err);
                    for (const evt of files) {
                        try {
                            if (!evt) return;
                            readFile(`./dist/src/events/${dir}/${evt}`, 'utf8' , async (err, data) => {
                                //@ts-ignore
                                const event = await new (Object.values(require(`../events/${dir}/${evt}`))[0])(this);
                                if (err) {
                                    console.error(err)
                                    return
                                }
                                console.log(`${evt} loaded`);
                                const ar = data.match(/run\((.*?)\)/);
                                //@ts-ignore
                                if(ar[1] === "") event.run();
                                else this.on(evt.split(".")[0], (...args) => event.run(...args));
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            }
        });
    }  
}