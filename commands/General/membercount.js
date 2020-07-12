const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class MemberCount extends Command {

    constructor (client) {
        super(client, {
            name: "membercount",
            description: (language) => language.get('MC_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_MC'),
            enabled: true,
            guildOnly: false,
            aliases: ["mc","mcount", "memberc"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_MC'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var botCount = 0;
        var online = 0;
        var streamer = 0;
        var dnd = 0;
        var offline = 0;
        var afk = 0;
        var pjeu = 0;
        var bot_number = 0;
        var human_number = 0;

        message.guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
            if(member.presence.status === "dnd") dnd++;
            if(member.presence.status === "idle") afk++;
            if(member.presence.status === "offline") offline++;
            if(member.presence.status === "streamer") streamer++;
            if(member.presence.status === "online") online++;
            if(member.presence.game) pjeu++
            if(member.user.bot === true) bot_number++;
            if(member.user.bot === false) human_number++;
        });

        var stats_msg = new Discord.MessageEmbed()
            .setAuthor(message.language.get("MC_STATS", message))
            .setThumbnail(message.guild.iconURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .addField(message.language.get('MC_MEMBERS'),message.language.get("MC_STATUS", human_number, bot_number, online, dnd, afk, offline, streamer,pjeu) )

        message.channel.send(stats_msg);





    }

}

module.exports = MemberCount;