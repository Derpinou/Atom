const Command = require("../../base/Command.js")
const figlet = require('figlet')


class Ascii extends Command {

    constructor (client) {
        super(client, {
            name: "ascii",
            description: (language) => language.get('ASCII_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_ASCII'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_ASCII'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {

        if(!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);
        var id = args[0]
        if(!/[a-zA-Z]/.test(id)) return message.channel.send(message.language.get('ASCII_ERROR'))
        if(args.join(' ').length > 20){
            return message.reply(message.language.get('ASCII_CARACT'))
        }
        figlet(args.join(' '), function(err, rdata) {
            if (err) {
                message.reply(messgae.language.get('ASCII_BUG'));
                return;
            }
            message.channel.send('```' + rdata + '```');
        });

    }

}


module.exports = Ascii;