const Command = require("../../base/Command.js");

class Setprefix extends Command {

    constructor (client) {
        super(client, {
            name: "setprefix",
            description: (language) => language.get('SETPREFIX_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETPREFIX'),
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SETPREFIX'),
            owner: false
        });
    }

    async run (message, args) {

        var prefix = args[0];
        if(!prefix) return message.channel.send(message.language.get('VALID_PREFIX'));
        if(prefix.length > 5) return message.channel.send(message.language.get('PREFIX_CHARACTERS'));

        // Update server data 
        this.client.databases[1].set(`${message.guild.id}.prefix`, prefix);

        // Sucess
        return message.channel.send(message.language.get('PREFIX_SUCCESS', (prefix)));
        
    }

}

module.exports = Setprefix;