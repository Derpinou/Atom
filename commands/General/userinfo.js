const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class UI extends Command {

    constructor (client) {
        super(client, {
            name: "userinfo",
            description: (language) => language.get('UI_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_USERINFO'),
            enabled: true,
            guildOnly: false,
            aliases: ["ui","useri","infouser", "uinfo"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_USERINFO'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var the_member = message.mentions.members.first();

        if(!args[0]){
            the_member = message.member;
        }
        if(!the_member && args[0]){
            the_member = message.guild.members.cache.get(args[0]);
            if(!the_member) return this.client.errors.utilisation(message, guild_data, this.client);
        }

        if(the_member.user.bot){
            return message.channel.send(message.language.get('UI_FIELDS')[0]);
        }

        let pseudo = the_member.user.username;
        let tag = the_member.user.discriminator;
        let date_join = this.functions.printDate(the_member.joinedAt, true);
        let id = the_member.id;
        let nickname = the_member.nickname;
        let salon = (the_member.voiceChannelID) ? message.language.get('UI_FIELDS')[1] + message.guild.channels.get(the_member.voiceChannelID).name :message.language.get('UI_FIELDS')[2];


        if(!nickname){
            nickname = message.language.get('UI_FIELDS')[3]
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get('UI_FIELDS')[4] + pseudo)
            .setThumbnail(the_member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(data.embed.color)
            .addField(message.language.get('UI_FIELDS')[5], pseudo)
            .addField(message.language.get('UI_FIELDS')[6], tag)
            .addField(message.language.get('UI_FIELDS')[7], nickname)
            .addField(message.language.get('UI_FIELDS')[8], id)
            .addField(message.language.get('UI_FIELDS')[9]+message.guild.name, date_join)
            .setFooter(data.embed.footer)

        message.channel.send(embed);


    }

}


module.exports = UI;