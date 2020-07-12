const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Qrcode extends Command {

    constructor (client) {
        super(client, {
            name: "qrcode",
            description: (language) => language.get('QR_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_QRCODE'),
            enabled: true,
            guildOnly: false,
            aliases: ["qr","codeqr","qr-code"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_QRCODE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        var texte = args.slice(0).join(' ');
        if(!texte) return message.channel.send(message.language.get("QR_ERROR"))
        if (texte.length >= 800) return message.channel.send(message.language.get('QR_LENGHT'))


        var the_request = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+texte;

const embed = new Discord.MessageEmbed()
    .setColor(data.embed.color)
    .setFooter(data.embed.footer)
    .addField(message.language.get("QR_CONTENT"), texte)
    .setThumbnail("https://cdn.discordapp.com/attachments/665212704562216960/712415489649016902/qrcode.png")
    .setImage(the_request)
    .setAuthor("QRcode")
      //  const attachment = new Discord.MessageAttachment(the_request, "qrcode.png")

        message.channel.send(message.language.get('QR_MSG')).then(m => {
            m.edit(" ", embed);
        })





    }

}

module.exports = Qrcode;