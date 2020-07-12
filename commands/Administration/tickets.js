const Command = require("../../base/Command.js");

class Tickets extends Command {

    constructor (client) {
        super(client, {
            name: "tickets",
            description: (language) => language.get('TICKETS_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_TICKETS'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_TICKETS'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {
        let _tickets = this.client.databases[1].get(message.guild.id+'.tickets.status')
        if (!_tickets)  {
            this.client.databases[1].set(message.guild.id+'.tickets.status', 'disabled');
            message.channel.send(message.language.get('TICKETS_PLS'))
        } else
        if(guild_data.tickets.status === 'on'){
            this.client.databases[1].set(message.guild.id+'.tickets.status', 'disabled');
            message.channel.send(message.language.get('TICKETS_ACTIV', guild_data))
        } else {
            this.client.databases[1].set(message.guild.id+'.tickets.status', 'on');
            message.channel.send(message.language.get('TICKETS_DESAC', guild_data))
        }
    }
}

module.exports = Tickets;