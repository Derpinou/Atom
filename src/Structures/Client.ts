import {Client, Collection, Intents} from "discord.js";
import { sep } from "path";
import {readdir, readFile} from "fs"
import { BaseCommand } from "./Command";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { promisify } from 'util';
import {createConnection} from "typeorm";
import { Guild } from "../entities/guild";
import i18n from "../utils/i18n";
import { TFunction } from "i18next";
import * as constants from "../utils/constants";
const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

export class Bot extends Client {

    public commands: Collection<string, BaseCommand>;
    public translations: Map<string, TFunction>;
    public constants: constants.Constants;

    constructor(token: string) {
        super({
            presence: {activities: [ { name: 'Atom', type: 1 }], status: 'online'},
            intents: [Object.values(Intents.FLAGS)]
        });
        this.commands = new Collection();
        this.constants = constants;
        //@ts-ignore

        this.init(token);
    }

    private async init(token: string) {
        await this.login(token).catch(console.error);
        this.translations = await i18n();
        await this.commandHandler();
        await this.eventLoader();

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
        })();
    }

    async commandHandler() {
        const content = await readDirAsync("./dist/src/commands/").catch(console.error);
        if (!content || !content.length) return console.error('Please create folder in "commands" folder.');
        const groups: string[] = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element);
        });
        for (const folder of groups) {
        const files = await readDirAsync(`./dist/src/commands/${folder}`).catch(console.error);
            if (!files || !files.length) return console.error('Please create files in "' + folder + '" folder.');
            files.forEach(element => {
                try {
                    //@ts-ignore
                    const command = new (Object.values(require(`../commands/${folder}${sep}${element}`))[0])(this);
                    console.log(`Loading Command: ${command.name}. 👌`);
                    if (command.init) {
                        command.init(this);
                    }
                    this.commands.set(command.name, command);
                } catch (e) {
                    console.error(`Unable to load command ${element}: ${e}`);
                }
        });
        }
    }
    
    async eventLoader() {
        const content = await readDirAsync("./dist/src/events").catch(console.error);
        if (!content || !content.length) return console.error('Please create folder in "events" folder.');
        const groups: string[] = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element); // If it's a folder
        });
        for (const folder of groups) {
            const files = await readDirAsync(`./dist/src/events/${folder}`);
            if (!files || !files.length) return console.error('Please create files in "' + folder + '" folder.');
            for (const evt of files) {
                try {
                    const data = await readFileAsync(`./dist/src/events/${folder}/${evt}`, 'utf8').catch(console.error);
                    if (!data) return console.error(`Cannot find data from "./dist/src/events/${folder}/${evt}"`);
                    //@ts-ignore
                    const event = await new (Object.values(require(`../events/${folder}/${evt}`))[0])(this);
                    console.log(`${evt} loaded. 👌`);
                    const ar = data.match(/run\((.*?)\)/);
                    //@ts-ignore
                    if(ar[1] === "") event.run();
                    else this.on(evt.split(".")[0], (...args) => event.run(...args));

                } catch (e) {
                    console.error(e);
                }
            }
        }
    }  
}