const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Kick extends Command {

    constructor (client) {
        super(client, {
            name: "kick",
            description: (language) => language.get('KICK_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_KICK'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: "BAN_MEMBERS",
            botpermissions: [ "SEND_MESSAGES", "KICK_MEMBERS", ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_KICK'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        message.delete();

        var the_member = message.mentions.members.first();

        if(!the_member)
            return this.client.errors.utilisation(message, guild_data, this.client);

        if(!the_member.kickable)
            return message.channel.send(message.language.get('KICK_ERROR1', the_member));

        let raison = args.slice(1).join(' ');
        if(!raison) raison = message.language.get('KICK_NOREASON');
        raison = raison + message.language.get('KICK_BY', message);

        the_member.kick(raison);

        message.channel.send(message.language.get('KICK_SUCCESS', the_member))

        var the_channel = message.guild.channels.cache.get(guild_data.logs_plugin.channel);

        if(the_channel) return the_channel.send(message.language.get('KICK_LOG', the_member, message));

    }
}



module.exports = Kick;