import { Bot } from "./Client";
import { CommandInteraction } from "discord.js";
import {sep} from 'path'

interface CommandOptions {
    filename: string
    enabled?: boolean
    adminOnly?: boolean
}



export abstract class BaseCommand {
    protected client: Bot;
    public enabled: boolean;
    public name: string;
    public adminOnly: boolean;
    constructor(client: Bot, {
        filename = "Unknow",
        enabled = true,

        adminOnly = false
    }: CommandOptions) {
        this.client = client;
        this.name = filename ? filename.split(sep)[filename.split(sep).length - 1].replace('.js', "").toLowerCase(): 'Unkown';
        this.enabled = enabled;
        this.adminOnly = adminOnly;
    }
    abstract run(interaction: CommandInteraction, data: any) : void
}