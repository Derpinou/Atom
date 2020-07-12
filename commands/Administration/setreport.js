const Command = require("../../base/Command.js");

class SetReport extends Command {

    constructor (client) {
        super(client, {
            name: "setreport",
            description: (language) => language.get('SETREPORT_DESCRIPTION'),
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
        this.client.databases[1].set(message.guild.id+'.report.status', 'on');
        this.client.databases[1].set(message.guild.id+'.report.channel', the_channel.id);

        message.channel.send(message.language.get('SETREPORT_SUCCESS', the_channel, guild_data.prefix));

    }

}

module.exports = SetReport;