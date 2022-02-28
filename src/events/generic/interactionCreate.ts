import { Bot } from "../../Structures/Client";
import {BaseEvent} from "../../Structures/Event";
import { CommandInteraction, Interaction } from "discord.js";

export class InteractionCreateEvent extends BaseEvent {
    constructor(client: Bot) {
        super(client)
    }
    
    async run(interaction: Interaction) {

        if (interaction.isCommand()) {

            interaction as CommandInteraction;

            const cmd = this.client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply({
                content: ":x: error"
            })

            cmd.run(interaction, {});
            console.log(`${interaction.member?.user.username}#${interaction.member?.user.discriminator} (${interaction.member?.user.id}) do command ${interaction.commandName} on ${interaction.guildId}`)
        }
    }
}