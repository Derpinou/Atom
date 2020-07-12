const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const functions = require('../../utils/functions.js');



class Setcolor extends Command {

    constructor (client) {
        super(client, {
            name: "setcolor",
            description: (language) => language.get('COLOR_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SETCOLOR'),
            enabled: true,
            guildOnly: false,
            aliases: ["sc","colorset",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SETCOLOR'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data, membre_data) {
        var color = args[0];
        if(!color) return this.client.errors.utilisation(message, guild_data, this.client);

        var hexa = functions.getHex(color, this.client);

        if(!hexa){
            if(!isHex(args[0])) return message.channel.send(message.language.get('COLOR_ERROR'))
            hexa = args[0];
        }

        this.client.databases[0].set(message.author.id+".color", hexa);

        message.channel.send(message.language.get('COLOR_SUCCESS', hexa));

        function isHex(h) {
            var a = parseInt(h,16);
            return (a.toString(16) ===h.toLowerCase())
        }




    }

}

module.exports = Setcolor;