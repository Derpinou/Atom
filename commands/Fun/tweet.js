const Command = require("../../base/Command.js");


class Tweet extends Command {

    constructor (client) {
        super(client, {
            name: "tweet",
            description: (language) => language.get('TWEET_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_TWEET'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_TWEET'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {
        var fetch = require('node-superfetch');
        var user = args[0]
        if(!user) return this.client.errors.utilisation(message, guild_data, this.client);
        var text = args.slice(1).join(' ');
        if(!text) return this.client.errors.utilisation(message, guild_data, this.client);
        if (text.lenght >= 140) return message.channel.send(message.language.get('TWEET_CARACT'))
        const { body } = await fetch.get(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`))
        message.channel.send({
            files: [{
                attachment: body.message,
                name: 'tweet.png'
            }]
        })
    }

}


module.exports = Tweet;