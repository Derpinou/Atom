import { CommandInteraction } from "discord.js";
import { Bot } from "../../Structures/Client";
import { BaseCommand } from "../../Structures/Command";

export class HelpCommand extends BaseCommand {
    constructor(client: Bot) {
        super(client, {
            filename: __filename,
        });
    }
    async run(interaction: CommandInteraction, data: any) {
        console.log("pong")
        

    }
}