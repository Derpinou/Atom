const Discord = require("discord.js");
const fs = require("fs");
let config = require('../config');

module.exports.utilisation = (message, guild_data , client) => {

    if(!message) return console.log('[ERRORS] Manque argument message ou data !');
    const args = message.content.slice(guild_data.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    // Gets the command
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    var examples = cmd.help.examples(message.language).replace(/[$_]/g,guild_data.prefix);
    var embed = new Discord.MessageEmbed()
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
        .addField('Standard',guild_data.prefix+cmd.help.usage(message.language))
        .setThumbnail('https://cdn.discordapp.com/attachments/665212704562216960/712776862576803853/warn.png')
        .addField('Example(s)', examples)
    message.channel.send(message.language.get('ERROR_SYNTAX'), embed);

    //        const errors = require('../../utils/errors.js');
    //         const client = this.client
    //         if (!membre) return errors.utilisation(message, guild_data, client);

}