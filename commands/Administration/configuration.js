const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Configuration extends Command {

    constructor (client) {
        super(client, {
            name: "configuration",
            description: (language) => language.get('CONFIGURATION_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_CONFIGURATION'),
            enabled: true,
            guildOnly: true,
            aliases: ["conf"],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_CONFIGURATION'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Creates new discord rich embed to display informations
        var embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .addField(message.language.get('PREFIX'), guild_data.prefix)
            .addField(message.language.get('IGNORED_CHANNELS'),
                (guild_data.ignored_channels.length > 0) ? 
                guild_data.ignored_channels.map(ch => '<#'+ch+'>').join(', ')
                : message.language.get('NO_IGNORED_CHANNELS')
            )
            .addField(message.language.get('AUTOROLE'), 
                (guild_data.autorole_plugin.status == 'on') ?
                    message.language.get('CONFIGURATION_AUTOROLE_ENABLED', guild_data.autorole_plugin)
                :   message.language.get('DISABLED_PLUGIN')

            )
            .addField(message.language.get('WELCOME'),
                (guild_data.welcome_plugin.status == 'on') ?
                    message.language.get('CONFIGURATION_WELCOME_ENABLED', guild_data.welcome_plugin)
                :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('LEAVE'),
                (guild_data.leave_plugin.status == 'on') ?
                    message.language.get('CONFIGURATION_LEAVE_ENABLED', guild_data.leave_plugin)
                :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('ANNONCE'),
                (guild_data.leave_plugin.status == 'on') ?
                    message.language.get('CONFIGURATION_ANNONCE_ENABLED', guild_data.leave_plugin)
                    :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('SETLOGS'),
                (guild_data.logs_plugin.status == 'on') ?
                    message.language.get('CONFIGURATION_SETLOGS_ENABLED', guild_data.logs_plugin)
                    :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('SETREPORT'),
                (guild_data.report.status == 'on') ?
                    message.language.get('CONFIGURATION_SETREPORT_ENABLED', guild_data.report)
                    :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('SETSONDAGES'),
                (guild_data.sondages.status == 'on') ?
                    message.language.get('CONFIGURATION_SETSONDAGES_ENABLED', guild_data.sondages)
                    :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('SETSUGGESTIONS'),
                (guild_data.suggestions.status == 'on') ?
                    message.language.get('CONFIGURATION_SETSUGGESTIONS_ENABLED', guild_data.suggestions)
                    :   message.language.get('DISABLED_PLUGIN')
            )
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        
        // Then, send the embed in the current channel
        message.channel.send(embed);

        function getSlowmodes(obj){
            var str = '';
            for(var id in obj){
                var time = obj[id];
                str += `<#${id}> | ${message.language.convertMs(time)}\n`;
            }
            return str;
        }
    }

}

module.exports = Configuration;