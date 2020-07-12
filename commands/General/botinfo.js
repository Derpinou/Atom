const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Botinfo extends Command {

    constructor (client) {
        super(client, {
            name: "botinfo",
            description: (language) => language.get('BOTINFO_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_BOTINFO'),
            enabled: true,
            guildOnly: false,
            aliases: ["bi","binfo", "boti",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_BOTINFO'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

            const { version } = require("discord.js");
        const moment = require("moment"); // npm install moment
        const os = require('os')

        const duration = moment.duration(this.client.uptime)
        const owner = this.client.users.cache.get(this.client.config.owner).username;
        /*
            const zeroCinquante = bot.guilds.filter(server => server.memberCount < 50);
            const cinquanteCent = bot.guilds.filter(server => server.memberCount > 50).filter(server => server.memberCount < 100);
            const centCinqCent = bot.guilds.filter(server => server.memberCount > 100).filter(server => server.memberCount < 500);
            const cinqcentMille = bot.guilds.filter(server => server.memberCount > 500).filter(server => server.memberCount < 1000);
            const moreMille = bot.guilds.filter(server => server.memberCount > 1000);

        */
        var infobot = new Discord.MessageEmbed()
            .setTitle(message.language.get('INFO', this.client))
            .addField(`:clipboard: ${message.language.get('NAME')}`, this.client.user.username, true)
            .addField(":wrench: "+message.language.get('DISCRIMINATOR') , "#" + this.client.user.discriminator, true)
            .addField(":pushpin: "+message.language.get('DEVELOPPER'), owner, true)
            .addField("<:data:697043020935331885> discord.js :", 'v'+version, true)
            .addField("<:node:679787852854591499> node.js :", process.version, true)
            .addField(`<:os:697043019337302078> ${message.language.get('OS')}`, `${os.platform()}`, true)
            .addField(`<:setting:697043025444208704> Architecture`, `${os.arch()}`, true)
            .addField(`<:cpu:697043024324067358>  ${message.language.get('PROCESSOR')}`, `${os.cpus().map(i => `${i.model}`)[0]}`, true)
            .addField("<:ram:697043027482378270> "+message.language.get('RAM'), (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB", true)
            .addField("<:clock:697043026496979064>  Uptime :", (Math.round(this.client.uptime / (1000 * 60 * 60))) + " Heure(s), " + (Math.round(this.client.uptime / (1000 * 60)) % 60) + " minute(s) et " + (Math.round(this.client.uptime / 1000) % 60) + " seconde(s)"+"", true)
            .addField('-------', 'Stats')
            .addField(message.language.get('SERVERS'), this.client.guilds.cache.size, true)
            .addField(message.language.get('MEMBERS'), this.client.users.cache.size, true)
            .addField(message.language.get('CHANNELS'), this.client.channels.cache.size, true)
            .setColor(data.embed.color)
        message.channel.send(infobot);


    }

}

module.exports = Botinfo;