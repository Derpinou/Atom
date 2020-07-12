const Command = require("../../base/Command.js"),
    Discord = require('discord.js');

class Rconfig extends Command {

    constructor (client) {
        super(client, {
            name: "reset-config",
            description: (language) => language.get('RCONFIG_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_RCONFIG'),
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_RCONFIG'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {

        message.channel.send(message.language.get("RCONFIG_VERIF"));

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });

        collector.on('collect', message =>{
            if(message.content.toLowerCase() === message.language.get('YES')){
                collector.stop("oui");
            } else if(message.content.toLowerCase() === message.language.get('NO')){
                collector.stop("non");
            } else {
                return message.channel.send(message.language.get("RCONFIG_RESPONSE"));
            }
        });

        collector.on('end', (collected, reason) =>{
            if(reason === message.language.get('YES')){
                this.client.functions.createGuild(message.guild);
                return message.channel.send(message.language.get('RCONFIG_SUCCESS', guild_data))
            }
            if(reason === message.language.get('NO')){
                message.channel.send(message.language.get("RCONFIG_TIMEOUT"));
            }
            if(reason === 'time') return message.channel.send(message.language.get('WELCOME_TIMEOUT'));
        });
    }

}




module.exports = Rconfig;