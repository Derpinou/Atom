const Command = require("../../base/Command.js"),
Discord = require('discord.js');


class Ping extends Command {

    constructor (client) {
        super(client, {
            name: "ping",
            description: (language) => language.get('PING_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_PING'),
            enabled: true,
            guildOnly: false,
            aliases: ["pong",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_PING'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        let début = Date.now();
        message.channel.send('ping')
            .then((m) => m.edit(' ',new Discord.MessageEmbed()
                .setAuthor("Pong")
                .setColor(this.client.config.embed.color)
                .addField(message.language.get('PING_MESSAGE'), `${Date.now() - début}`, true)
                .addField(message.language.get('PING_API'), `${this.client.ws.ping}`, true)
                .setFooter(this.client.config.embed.footer)));
        var membre = message.mentions.members.first();

    }

}

module.exports = Ping;