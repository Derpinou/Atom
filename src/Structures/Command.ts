import { Bot } from "./Client";
import { CommandInteraction } from "discord.js";
import {sep} from 'path'
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'; 

interface CommandOptions {
    filename: string
    enabled?: boolean
    adminOnly?: boolean
    bodyForm:  RESTPostAPIApplicationCommandsJSONBody
}

export abstract class BaseCommand {
    protected client: Bot;
    public enabled: boolean;
    public name: string;
    public adminOnly: boolean;
    public bodyForm: RESTPostAPIApplicationCommandsJSONBody;
    constructor(client: Bot, {
        filename = "Unknow",
        enabled = true,
        bodyForm,
        adminOnly = false
    }: CommandOptions) {
        this.client = client;
        this.name = filename ? filename.split(sep)[filename.split(sep).length - 1].replace('.js', "").toLowerCase(): 'Unkown';
        this.enabled = enabled;
        this.adminOnly = adminOnly;
        this.bodyForm = bodyForm;
    }
    public abstract run(interaction: CommandInteraction, data: any) : void
}