const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Invits extends Command {

    constructor (client) {
        super(client, {
            name: "invitations",
            description: (language) => language.get('INVITS_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_INVITATIONS'),
            enabled: true,
            guildOnly: false,
            aliases: ["invits"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_INVITATIONS'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        let membre = (message.mentions.members.first()) ? message.mentions.members.first() : message.member;
        let invites = message.guild.fetchInvites().catch(error => { // This will store all of the invites into the variable
        }).then(invites =>{
            var my_invites = invites.filter(invite => invite.inviter === membre.user);
            if(my_invites.size <= 0) return message.channel.send(message.language.get("INVITS_NOINVIT"))
            var uses_count = 0;
            var codes = '';
            my_invites.forEach(element => {
                //console.log(element.temporary);
                var isExpire = (element.temporary) ? message.language.get("YES") : message.language.get("NEVER")
                uses_count += element.uses;
                codes += '**'+element.code+'** ('+element.uses+ message.language.get("INVITS_UTILS")+element.channel+'\n';
            });
            const embed = new Discord.MessageEmbed()
                .setColor(data.embed.color)
                .setAuthor('Invitations')
                .setFooter(data.embed.footer)
                .setDescription(message.language.get("INVITS_INFO", membre, message))
                .addField(message.language.get('INVITS_USERCOUNT'), uses_count + ' membres')
                .addField(message.language.get("INVITS_CODE"), codes)
            message.channel.send(embed);
        });

    }

}

module.exports = Invits;