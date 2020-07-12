const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Invite extends Command {

    constructor (client) {
        super(client, {
            name: "invite",
            description: (language) => language.get('INVIT_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_INVITE'),
            enabled: true,
            guildOnly: false,
            aliases: ["i","invit"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_INVITE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {




        var embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get('INVIT_INVIT'))
            .setThumbnail(("https://cdn.discordapp.com/attachments/665212704562216960/712587826734039101/Atom2.png"))
            .addField(message.language.get('INVIT_1'), message.language.get('INVIT_GEN'))
            .addField(message.language.get('INVIT_SUPP'), message.language.get('INVIT_GEN'))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setTimestamp();

        var new_embed = new Discord.MessageEmbed()
            .setThumbnail(("https://cdn.discordapp.com/attachments/665212704562216960/712587826734039101/Atom2.png"))
            .setAuthor(message.language.get('INVIT_INVIT'))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setTimestamp();


        new_embed.addField(message.language.get('INVIT_1'), message.language.get("INVIT_CLICK")+"(https://discord.com/oauth2/authorize?client_id=683956301919027222&scope=bot&permissions=2146958847)")



        this.client.channels.cache.get(this.client.config.support.general).createInvite({
            maxAge : '0'
        }).then(invite =>{
            new_embed.addField(message.language.get('INVIT_SUPP'), `${message.language.get("INVIT_CLICK")}(${invite.url})`)
        });

        message.channel.send(embed).then(m =>{
            setTimeout(function(){
                m.edit(new_embed);
            }, ms('1.5s'));
        })
    }

}

module.exports = Invite;