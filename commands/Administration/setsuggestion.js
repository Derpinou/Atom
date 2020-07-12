const Command = require("../../base/Command.js");

class Setsuggestion extends Command {

    constructor (client) {
        super(client, {
            name: "setsuggestion",
            description: (language) => language.get('SETSUGGEST_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETSUGGESTION'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SETSUGGESTION'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {
        var the_channel = message.mentions.channels.first();
        if(!the_channel) return this.client.errors.utilisation(message, guild_data, this.client);
        this.client.databases[1].set(message.guild.id+'.suggestions.status', 'off');
        this.client.databases[1].set(message.guild.id+'.suggestions.channel', the_channel.id);

        message.channel.send(message.language.get('SETSUGGEST_SUCCESS',the_channel, guild_data))
    }

}

module.exports = Setsuggestion;

