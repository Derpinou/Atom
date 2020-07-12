const Command = require("../../base/Command.js");

class Setannonce extends Command {

    constructor (client) {
        super(client, {
            name: "setannonce",
            description: (language) => language.get('SETANNONCES_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETANNONCES'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SETANNONCES'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {


        var the_channel = message.mentions.channels.first();
        if(!the_channel) return this.client.errors.utilisation(message, guild_data, this.client);
        this.client.databases[1].set(message.guild.id+'.annonces.status', 'off');
        this.client.databases[1].set(message.guild.id+'.annonces.channel', the_channel.id);

        message.channel.send(message.language.get('SETANNONCES_SUCCESS',the_channel, guild_data));

    }

}

module.exports = Setannonce;