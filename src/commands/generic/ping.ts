import { CommandInteraction } from "discord.js";
import { Bot } from "../../Structures/Client";
import { BaseCommand } from "../../Structures/Command";

export class HelpCommand extends BaseCommand {
    constructor(client: Bot) {
        super(client, {
            filename: __filename,
            bodyForm: {
                name: "ping",
                description: "Ping Command",
            }
        });
    }

    async run(interaction: CommandInteraction, data: any) {
        interaction.reply({content: data.translate("generic/ping:pong"), ephemeral: true})
    }
}