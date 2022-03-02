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
        const client = this.client;

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

            if (!guildData) return;
            console.log(guildData.language)

            const language = function (key: string, args: any) {
                let language = client.translations.get(
                    guildData.language ? guildData.language : client.constants.default_language
                );
                if (!language) {
                    language = client.translations.get(client.constants.default_language);
                }
                if (!language) return console.error("Message: Invalid language set in data.");
                return language(key, args);
            };

            const cmd = this.client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply({
                content: ":x: error"
            })

            cmd.run(interaction, {
                guild: guildData,
                translate: language,
                guildRepository: guildRepository
            });
            console.log(`${interaction.member?.user.username}#${interaction.member?.user.discriminator} (${interaction.member?.user.id}) do command ${interaction.commandName} on ${interaction.guildId}`)
        }
    }
}