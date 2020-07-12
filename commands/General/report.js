const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Report extends Command {

    constructor (client) {
        super(client, {
            name: "report",
            description: (language) => language.get('REPORT_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_REPORT'),
            enabled: false,
            guildOnly: false,
            aliases: ["rp","signal",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_REPORT'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        const emoteNo = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'no')
        const emoteUi = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'yes')
        const emoteWarn = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === "warn")
        var report_channel = message.guild.channels.cache.get(guild_data.report.channel);
        if(!report_channel) return message.channel.send(message.language.get('REPORT_NOCHAN'));

        var member = message.content.mentions.users.first();
        if(!member) return this.client.errors.utilisation(message, guild_data, this.client);

        var raison = args.slice(1).join(' ');
        if(!raison) return this.client.errors.utilisation(message, guild_data, this.client);

        var embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get('REPORT_EMBEDAUTH', member), member.user.displayAvatarURL)
            .addField(message.language.get('REPORT_AUTHOR'), `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.language.get('REPORT_MEMBER'), `\`${member.user.username}#${member.user.discriminator}\``)
            .addField(message.language.get('REPORT_DATE'), this.functions.printDate(new Date(Date.now()), true), true)
            .addField(message.language.get('RPEORT_REASON'), '**'+raison+'**')
            .setColor(data.embed.color)
            .setFooter(data.footer)
        report_channel.send(embed).then(m => {
            m.react(emoteWarn);
            m.react(emoteUi);
            m.react(emoteNo);
        });

        message.channel.send(message.language.get('REPORT_MSG'));

    }

}

module.exports = Report;