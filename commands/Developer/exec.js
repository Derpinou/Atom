const Command = require("../../base/Command.js");
var { exec } = require('child_process');

class Exec extends Command {

    constructor (client) {
        super(client, {
            name: "exec",
            description: "exec",
            dirname: __dirname,
            usage: "exec",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$exec",
            owner: true
        });
    }

    async run (message, args) {
        exec(`${args.join(' ')}`, (error, stdout) => {
            var response = (error || stdout);
            if (!error) message.channel.send(`\\✅ | L'execution s'est terminée sans problêmes :`);
            else message.channel.send(`\\❌ | Une erreur est survenue lors de l'exécution :`);
            message.channel.send(`${response}`, {
                code: "js",
                split: "\n"
            }).catch(e => console.log(e));
        });


    }

}

module.exports = Exec;