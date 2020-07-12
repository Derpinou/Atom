const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Delrole extends Command {

    constructor (client) {
        super(client, {
            name: "delrole",
            description: (language) => language.get('DELROLE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_DELROLE'),
            enabled: true,
            guildOnly: false,
            aliases: ["delr", "dr", "del-role"],
            permission: ["MANAGE_ROLES"],
            botpermissions: [ "SEND_MESSAGES","MANAGE_ROLES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_DELROLE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        if (!args.join(' ')) return this.client.errors.utilisation(message, guild_data, this.client);

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!member) return this.client.errors.utilisation(message, guild_data, this.client);
        let role = message.guild.roles.cache.find((r) => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase() || r.id === args.slice(1).join(' '));

        if (!role) { return message.channel.send(message.language.get("DELROLE_ERROR")); }
        if (!member.roles.cache.has(role.id)) { return message.channel.send(message.language.get("DELROLE_ERROR2")); }

        member.roles.remove(role.id)
            .then(() => message.channel.send(message.language.get('DELROLE_SUCCESS', member, role)))
            .catch(console.error);




    }

}



module.exports = Delrole;