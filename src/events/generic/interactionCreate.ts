import { Bot } from "../../Structures/Client";
import {BaseEvent} from "../../Structures/Event";
import { CommandInteraction, Interaction } from "discord.js";
import { getRepository } from "typeorm";
import { Guild } from "../../entities/guild";

export class InteractionCreateEvent extends BaseEvent {
    constructor(client: Bot) {
        super(client)
    }

    async run(interaction: Interaction) {

        if (interaction.isCommand()) {


            interaction as CommandInteraction;

            const guildRepository = getRepository(Guild);

            const guildData = await guildRepository.find({
                where: {
                    id: interaction.guildId
                }
            }).then(x => {
                return x[0]
            }).catch(console.error)
            if (!guildData) {
                const guildData = guildRepository.create({
                    id: interaction.guildId as string
                });
                guildRepository.save(guildData);
            }

            const cmd = this.client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply({
                content: ":x: error"
            })

            cmd.run(interaction, {guild: guildData});
            console.log(`${interaction.member?.user.username}#${interaction.member?.user.discriminator} (${interaction.member?.user.id}) do command ${interaction.commandName} on ${interaction.guildId}`)
        }
    }
}