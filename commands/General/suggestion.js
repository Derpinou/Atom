const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Suggestion extends Command {

    constructor (client) {
        super(client, {
            name: "suggestion",
            description: (language) => language.get('SUGGEST_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SUGGESTION'),
            enabled: false,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SUGGESTION'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        const emoteNo = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'no')
        const emoteUi = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'yes')
        var sugg_channel = message.guild.channels.cache.get(guild_data.suggestions);
        if(!sugg_channel) return message.channel.send(message.language.get('SUGGEST_NOCHAN'));

        var suggestion = args.join(' ');
        if(!suggestion) return this.client.errors.utilisation(message, guild_data, this.client);

        var embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get('SUGGEST_FIELDS')[0] +message.author.username, message.author.displayAvatarURL())
            .addField(message.language.get('SUGGEST_FIELDS')[1], `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.language.get('SUGGEST_FIELDS')[2], this.functions.printDate(new Date(Date.now()), true), true)
            .addField(message.language.get('SUGGEST_FIELDS')[3], '**'+suggestion+'**')
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        sugg_channel.send(embed).then(m => {
            m.react(emoteUi);
            m.react(emoteNo);
        });

        message.channel.send(message.language.get('SUGGEST_SUCCESS', sugg_channel));

    }

}

module.exports = Suggestion;

