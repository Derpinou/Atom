const Command = require("../../base/Command.js");


class Everyrole extends Command {

    constructor (client) {
        super(client, {
            name: "everyrole",
            description: (language) => language.get('EVERYROLE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_EVERYROLE'),
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_EVERYROLE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {
        if (message.guild.memberCount >= 100) return message.channel.send(message.language.get('EVERYROLE_SPAM'))
        var role = message.mentions.roles.first();
        if(!role && !args[0]) return this.client.errors.utilisation(message, guild_data, this.client);
        else {
            if(role){
                message.channel.send(message.language.get('EVERYROLE_FIELDS'));
                message.guild.members.cache.forEach(element => {
                    element.roles.add(role);
                });
            } else {
                role = message.guild.roles.cache.find(e => e.name === args.join(' '));
                if(!role) return message.channel.send(message.language.get('EVERYROLE_NOROLE', role));
                message.channel.send(message.language.get('EVERYROLE_FIELDS'));
                message.guild.members.cache.forEach(element => {
                    element.roles.add(role);
                });
            }
        }

    }

}



module.exports = Everyrole;