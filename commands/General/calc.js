const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const math = require("mathjs");


class Calc extends Command {

    constructor (client) {
        super(client, {
            name: "calc",
            description: (language) => language.get('CALC_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_CALC'),
            enabled: true,
            guildOnly: false,
            aliases: ["clc","calcul","calculate"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_CALC'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        var calcul = args.join(' ');
        calcul = calcul.replace(/['x'_]/g,'*');
        if(!calcul) return this.client.errors.utilisation(message, guild_data, this.client);
        if (calcul.length >= 800) return message.channel.send(message.language.get('CALC_LENGHT'))
        try {
            math.evaluate(calcul);
            const result = math.evaluate(calcul);
            message.channel.send(new Discord.MessageEmbed()
                .setAuthor(message.language.get('CALC_AUTHOR'))
                .addField(message.language.get("CALC_CALC"), calcul)
                .addField(message.language.get('CALC_RESULT'), result)
                .setThumbnail("https://cdn.discordapp.com/attachments/665212704562216960/712245154555363450/calculator_icon-512.webp")
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)

            )
        }
        catch(error) {
            message.channel.send(message.language.get('CALC_ERROR'));
        }






    }

}

module.exports = Calc;