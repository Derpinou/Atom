const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const fetch = require('node-superfetch')


class Haste extends Command {

    constructor (client) {
        super(client, {
            name: "hastebin",
            description: (language) => language.get('HASTE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_HASTEBIN'),
            enabled: true,
            guildOnly: false,
            aliases: ["h","haste","hb"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_HASTEBIN'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        fetch.checkout("https://blockchain.info/fr/ticker ").then(r => console.log(r.EUR));
        var texte = args.join(' ');
        if(!texte) return message.channel.send(message.language.get("HASTE_ERROR"))
        if (texte.length >= 800) return message.channel.send(message.language.get('HASTE_LENGHT'))
        fetch.post(`https://hastebin.com/documents`).send(texte).then(body => {
            const embed = new Discord.MessageEmbed()
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)
                .addField(message.language.get("HASTE_CONTENT"),`\`${texte}\``)
                .addField(message.language.get("HASTE_LINK"), `https://hastebin.com/${body.body.key}`)
                .setThumbnail("https://cdn.discordapp.com/attachments/665212704562216960/712555704191287316/whrite.png")
                .setAuthor("Hastebin")
            message.channel.send(message.language.get('HASTE_MSG')).then(m => {
                m.edit(" ", embed);
            })
        })
    }

}

module.exports = Haste;