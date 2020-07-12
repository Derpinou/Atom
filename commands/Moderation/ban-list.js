const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Banlist extends Command {

    constructor (client) {
        super(client, {
            name: "banlist",
            description: (language) => language.get('BANLIST_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_BANLIST'),
            enabled: true,
            guildOnly: false,
            aliases: ["bl", "ban-list"],
            permission: "BAN_MEMBERS",
            botpermissions: [ "SEND_MESSAGES", "VIEW_AUDIT_LOG", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_BANLIST'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        message.guild.fetchBans()
            .then(banned => {
                let list = banned.map(user => `${user.user.tag} - ${(user.user.id)}`).join('\n');

                if (list.length >= 1950) list = `${list.slice(0, 1948)} ${message.language.get('BANLIST_FIELDS')[0]}`;

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${banned.size === 0 ? message.language.get('BANLIST_FIELDS')[1] : `${banned.size} ${message.language.get('BANLIST_FIELDS')[2]}`}`)
                    .setColor(data.embed.color)
                    .setDescription(`${list}`)
                    .setTimestamp()
                    .setFooter(data.embed.footer)
                message.channel.send(embed);
            })
            .catch(console.error);

    }
}



module.exports = Banlist;