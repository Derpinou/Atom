const Command = require("../../base/Command.js");

class Setsondage extends Command {

    constructor (client) {
        super(client, {
            name: "setsondages",
            description: (language) => language.get('SETSOND_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETREPORT'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('USAGE_SETREPORT'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {
        var the_channel = message.mentions.channels.first();
        if(!the_channel) return this.client.errors.utilisation(message, guild_data, this.client);
        this.client.databases[1].set(message.guild.id+'.sondages.status', 'off');
        this.client.databases[1].set(message.guild.id+'.sondages.channel', the_channel.id);

        message.channel.send(message.language.get('SETSOND_SUCCESS',the_channel, guild_data))
    }

}

module.exports = Setsondage;

