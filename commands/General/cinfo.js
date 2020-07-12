const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Cinfo extends Command {

    constructor (client) {
        super(client, {
            name: "cinfo",
            description: (language) => language.get('CINFO_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_CINFO'),
            enabled: true,
            guildOnly: false,
            aliases: ["channel-info", "ci", "channelinfo"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_CINFO'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return this.client.errors.utilisation(message, guild_data, this.client);
        if(channel.type === 'voice') {
            var cat = (channel.parent) ? channel.parent.name : 'Aucune'

            var embed = new Discord.MessageEmbed()
                .setAuthor('Information sur le salon '+channel.name)
                .setThumbnail("https://cdn.discordapp.com/attachments/665212704562216960/712397243419852810/chatbox.png")
                .addField(message.language.get("CINFO_NAME"), channel.name, true)
                .addField(message.language.get("CINFO_ID"), channel.id, true)
                .addField(message.language.get("CINFO_BITRATE"), channel.bitrate+'kbps', true)
                .addField(message.language.get("CINFO_POS"), channel.position, true)
                .addField(message.language.get("CINFO_USERS"), channel.members.size+' connecté(s)', true)
                .addField(message.language.get("CINFO_CAT"), cat , true)
                .addField(message.language.get("CINFO_NBMAX"), channel.userLimit === 0 ? 'Infini' : channel.userLimit+' membres')
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)

            message.channel.send(embed);
        } else if(channel.type === 'text')  {
            var isnsfw = (channel.nsfw) ? message.language.get('YES') : message.language.get('NO');
            var cat = (channel.parent) ? channel.parent.name : message.language.get('NOTHING')
            var top = (channel.topic) ? channel.topic : message.language.get('NOTHING')

            var embed = new Discord.MessageEmbed()
                .setAuthor('Information sur le salon '+channel.name)
                .setThumbnail("https://cdn.discordapp.com/attachments/665212704562216960/712397243419852810/chatbox.png")
                .addField(message.language.get("CINFO_NAME"), channel, true)
                .addField(message.language.get("CINFO_ID"), channel.id, true)
                .addField(message.language.get("CINFO_NSFW"), isnsfw, true)
                .addField(message.language.get("CINFO_POS"), channel.position, true)
                .addField(message.language.get("CINFO_DESC"), top, true)
                .addField(message.language.get("CINFO_CAT"), cat , true)
                .addField(message.language.get("CINFO_USERS"), channel.members.size+' membres peuvent lire les messages du **#'+channel.name+'**')
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)

            message.channel.send(embed);

        } else if(channel.type !== "text" && channel.type !== "voice") {
            return message.channel.send(message.language.get("CINFO_ERROR"));

        }

    }

}

module.exports = Cinfo;