const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Time extends Command {

    constructor (client) {
        super(client, {
            name: "date",
            description: (language) => language.get('DATE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_DATE'),
            enabled: true,
            guildOnly: false,
            aliases: ["now",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_DATE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var the_ts_now = new Date(Date.now() + 3600000);

        message.channel.send(message.language.get("DATE_MSG")+" "+timeConverter(the_ts_now));


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

module.exports = Time;