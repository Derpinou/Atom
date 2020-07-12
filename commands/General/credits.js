const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Credits extends Command {

    constructor (client) {
        super(client, {
            name: "credits",
            description: (language) => language.get('CREDITS_DESCRITPION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_CREDITS'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_CREDITS'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {


        message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Page des remeriement")
            .addField("<@!422820341791064085>-androz", "Développeur Open source, la base de son bot a été reprise pour Atom")
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        )
            }

}

module.exports = Credits;