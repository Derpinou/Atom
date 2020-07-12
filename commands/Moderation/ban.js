const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Ban extends Command {

    constructor (client) {
        super(client, {
            name: "ban",
            description: (language) => language.get('BAN_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_BAN'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: ["BAN_MEMBERS"],
            botpermissions: [ "SEND_MESSAGES", "BAN_MEMBERS", ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_BAN'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        message.delete();

        var the_member = message.mentions.members.first();

        if(!the_member)
            return this.client.errors.utilisation(message, guild_data, this.client);

        if(!the_member.bannable)
            return message.channel.send(message.language.get('BAN_ERROR1', the_member));

        let raison = args.slice(1).join(' ');
        if(!raison) raison = message.language.get('BAN_NOREASON');
        raison = raison + message.language.get('BAN_BY', message);

        the_member.ban(raison);

        message.channel.send(message.language.get('BAN_SUCCESS', the_member))

        var the_channel = message.guild.channels.cache.get(guild_data.logs_plugin.channel);

        if(the_channel) return the_channel.send(message.language.get('BAN_LOG', the_member, message));

    }

}



module.exports = Ban;