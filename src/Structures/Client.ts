import {Client, Collection, Intents} from "discord.js";
import { sep } from "path";
import {readdir, readFile} from "fs"
import { BaseCommand } from "./Command";


export class Bot extends Client {
    public commands: Collection<string, BaseCommand>
    constructor(token: string) {
        super({
            presence: {activities: [ { name: 'Atom', type: 1 }], status: 'online'},
            intents: [Object.values(Intents.FLAGS)]
        });
        this.commands = new Collection();

        
        this.init(token)


        


    }

    async init(token: string) {
        await this.login(token);

        this.commandLoader();
        this.eventLoader();
    }

    commandLoader(): void {
        readdir("./dist/src/commands/", (err, content) => {
            if (err) console.log(err);
            if (content.length < 1) return console.log('Please create folder in "commands" folder.');
            let groups: any[] = [];
            content.forEach(element => {
                if (!element.includes('.')) groups.push(element); // If it's a folder
            });
            groups.forEach(folder => {
                readdir("./dist/src/commands/" + folder, (e, files) => {
                    let js_files = files.filter(f => f.split(".").pop() === "js");
                    if (js_files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                    if (e) console.log(e);
                    js_files.forEach(element => {
                        const response = this.cmdLoad('../commands/' + folder, `${element}`);
                        if (response) console.log(response);
                    });
                });
            });
        });
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
                    let js_files = files.filter(f => f.split(".").pop() === "js");
                    for (const evt of js_files) {
                        try {
                            if (!evt) return;
                            readFile(`./dist/src/events/${dir}/${evt}`, 'utf8' , async(err, data) => {
                                //@ts-ignore
                                const event = await new (Object.values(require(`../events/${dir}/${evt}`))[0])(this);
                                if (err) {
                                    console.error(err)
                                    return
                                }
                                console.log(`${evt} loaded`);
                                var ar = data.match(/run\((.*?)\)/);
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