import { CommandInteraction } from "discord.js";
import { Bot } from "../../Structures/Client";
import { BaseCommand } from "../../Structures/Command";

export class HelpCommand extends BaseCommand {
    constructor(client: Bot) {
        super(client, {
            filename: __filename,
            bodyForm: {
                name: "lang",
                description: "Change bot's language on this server",
                options: [
                    {
                        name: "language",
                        description: "Choose language",
                        type: 3,
                        required: true,
                        choices: [{
                            name: "English en-EN",
                            value: "en-EN"
                        }, {
                            name: "Francais fr-FR",
                            value: "fr-FR"
                        }]
                    }
                ]
            }
        });
    }

    async run(interaction: CommandInteraction, data: any) {
        const options = interaction.options.data;

        if (!options || !options.length) return interaction.reply({
            content: data.translate("generic/lang:error_1"),
            ephemeral: true
        });

        const actualLang = data.guild.language;
        
        if (options[0].value === actualLang) return interaction.reply({
            content: data.translate("generic/lang:error_2", {
                lang: actualLang
            }),
            ephemeral: true
        })

        data.guild.language = options[0].value;

        data.guildRepository.save(data.guild);

        interaction.reply({
            content: data.translate("generic/lang:success", {
                old: actualLang,
                new: data.guild.language
            }),
        });
    }
}