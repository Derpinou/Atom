const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Permissions extends Command {

    constructor (client) {
        super(client, {
            name: "permissions",
            description: (language) => language.get('PERMS_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_PERMISSION'),
            enabled: true,
            guildOnly: false,
            aliases: ["perm"],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_PERMISSION'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        var membre = (message.mentions.members.first()) ? message.mentions.members.first() : message.member;

        var the_message = message.language.get('PERMS_THEMSG',membre);

        var permissions_array = [
            "ADMINISTRATOR",
            "CREATE_INSTANT_INVITE",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "MANAGE_GUILD",
            "MANAGE_CHANNELS",
            "ADD_REACTIONS",
            "VIEW_AUDIT_LOG",
            "PRIORITY_SPEAKER",
            "VIEW_CHANNEL",
            "READ_MESSAGES",
            "SEND_MESSAGES",
            "SEND_TTS_MESSAGES",
            "MANAGE_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
            "MENTION_EVERYONE",
            "USE_EXTERNAL_EMOJIS",
            "CONNECT",
            "SPEAK",
            "MOVE_MEMBERS",
            "CHANGE_NICKNAME",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS"
        ];

        var allowed = 0;
        var denied = 0;

        permissions_array.forEach(element => {
            if(membre.hasPermission(element)){
                the_message += `[${element}] => ${message.language.get('SUCCESS')} \n`;
                allowed++;
            }
            if(!membre.hasPermission(element)){
                the_message += `[${element}] => ${message.language.get('WARN')} \n`;
                denied++;
            }
        });
        let embed = new Discord.MessageEmbed()
            .setDescription(message.language.get('PERMS_MSG',the_message, allowed, denied))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)

        message.channel.send(embed);
    }
}



module.exports = Permissions;