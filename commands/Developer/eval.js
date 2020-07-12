const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Eval extends Command {

    constructor (client) {
        super(client, {
            name: "eval",
            description: "eval",
            dirname: __dirname,
            usage: "eval",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$eval",
            owner: true
        });
    }

    async run (message) {

        if(message.content.includes('this.client.token') || message.content.includes('config.token')){
            return message.channel.send('```Js\nT0K3N```');
        }

        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then(output => {
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            if (output.includes(this.client.token)) output = output.replace(this.client.token, 'T0K3N');
            return message.channel.send(output, { code: 'js' });
        }).catch(err => {
            console.error(err);
            err = err.toString();

            if (err.includes(this.client.token)) err = err.replace(this.client.token, '`T0K3N`');

            return message.channel.send(err, { code: 'js' })
        });
    }

}

module.exports = Eval;