const Command = require("../../base/Command.js");

class Setlogs extends Command {

    constructor (client) {
        super(client, {
            name: "setlogs",
            description: (language) => language.get('SETLOGS_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETLOGS'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('USAGE_SETLOGS'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {

        if(!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);

        var statut = args[0];
        if(statut !== "on" && statut !== "off"){
            return this.client.errors.utilisation(message, guild_data, this.client);
        }

        if(statut === "on"){
            var the_channel = message.mentions.channels.first();
            if(!the_channel) return this.client.errors.utilisation(message, guild_data, this.client);
            servers_data.set(message.guild.id+'.logs_plugin.status', 'on');
            servers_data.set(message.guild.id+'.logs_plugin.channel', the_channel.id);
            message.channel.send(message.language.get('SETLOG_SUCCESS1', guild_data));
        }
        if(statut === "off"){
            servers_data.set(message.guild.id+'.logs_plugin.status', 'disabled');
            servers_data.set(message.guild.id+'.logs_plugin.channel', the_channel.id);
            message.channel.send(message.language.get('SETLOG_SUCCESS2', guild_data));
        }
    }
}
module.exports = Setlogs;