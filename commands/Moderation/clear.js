const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Clear extends Command {

    constructor (client) {
        super(client, {
            name: "clear",
            description: (language) => language.get('CLEAR_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_CLEAR'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES"],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_CLEAR'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        var to_delete;

        if(!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);

        if(isNaN(args[0]) == true) return message.channel.send(message.language.get('CLEAR_INVALIDNB'));

        if(args[0] === "0") return message.channel.send(message.language.get('CLEAR_0ERROR'));
        let messageSupprimer = parseInt(args[0]);

        if(messageSupprimer > 99) messageSupprimer = 99;

        let messages = await message.channel.messages.fetch({limit: 100});

        if(message.mentions.members.size > 0) {
            messages = messages.array().filter(m=>m.author.id === message.mentions.members.first().id);
            messages.length = messageSupprimer;
        } else {
            messages = messages.array();
            messages.length = messageSupprimer;
        }

        message.channel.bulkDelete(messages);

        message.channel.send(message.language.get('CLEAR_SUCCESS', args)).then(m =>{
            m.delete();
        }, ms('2s'));

        var the_channel = message.guild.channels.cache.get(guild_data.logs_plugin.channel);

        if(the_channel) return the_channel.send(message.language.get('CLEAR_LOG', args, message));
    }
}



module.exports = Clear;