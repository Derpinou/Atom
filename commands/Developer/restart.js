const Command = require("../../base/Command.js"),
    Discord = require('discord.js');

class Restart extends Command {

    constructor (client) {
        super(client, {
            name: "restart",
            description: "restart",
            dirname: __dirname,
            usage: "restart",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$restart",
            owner: true
        });
    }

    async run (message) {
        var the_id;
        var channel_id;

        message.channel.send('<a:load2:679789707562975281> | Redémarrage en cours...').then(m => {
            the_id = m.id;
            channel_id = m.channel.id;
        });
        this.client.destroy();
        this.client.login(this.client.config.token).then( () => {
            this.client.channels.cache.get(channel_id).messages.fetch(the_id).then(the_m => {
                return the_m.edit('<:yes:697047113049047110> | Redémarrage effectué ! ');
            });
        });


    }

}

module.exports = Restart;