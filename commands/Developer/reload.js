const Command = require("../../base/Command.js"),
    Discord = require('discord.js');

class Reload extends Command {

    constructor (client) {
        super(client, {
            name: "reload",
            description: "reload",
            dirname: __dirname,
            usage: "reload",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$reload",
            owner: true
        });
    }

    async run (message) {
        await message.channel.send(`<a:load2:679789707562975281> | Reload en cours`)
        process.exit()


    }

}

module.exports = Reload;