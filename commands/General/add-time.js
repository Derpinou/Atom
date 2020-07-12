const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class AddTime extends Command {

    constructor (client) {
        super(client, {
            name: "add-time",
            description: (language) => language.get('ADDTIME_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_ADDTIME'),
            enabled: true,
            guildOnly: false,
            aliases: ["addt", "at", "addtime"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_ADDTIME'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0] || isNaN(ms(args[0]))) return this.client.errors.utilisation(message, guild_data, this.client);


        var the_ts_now = new Date(Date.now() + ms(args[0]) + 3600000);

        message.channel.send(message.author.username + '```Résultat : '+args[0]+' + date actuelle = '+timeConverter(the_ts_now)+'```');
        message.channel.send(new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/701602010033553469/712343611995324425/clock.png")
            .setAuthor("AddTime")
            .addField(message.language.get("ADDTIME_NOW"),timeConverter(new Date(Date.now() + 3600000)) )
            .addField(message.language.get("ADDTIME_TOADD"), args[0])
            .addField(message.language.get("ADDTIME_RESULT"),timeConverter(the_ts_now))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        )


        function timeConverter(a){
            var months = message.language.get('MONTHS');
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }

    }

}

module.exports = AddTime;