const Command = require("../../base/Command.js");


class ball extends Command {

    constructor (client) {
        super(client, {
            name: "8ball",
            description: (language) => language.get('BALL_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_8BALL'),
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_8BALL'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {

        let username = (message.member.nickname) ? message.member.nickname : message.author.username;

        if(!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);

        let replies = message.language.get('BALL_REPLIES')

        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(username+', '+replies[result]);

    }

}


module.exports = ball;