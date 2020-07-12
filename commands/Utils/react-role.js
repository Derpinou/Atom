const Command = require("../../base/Command.js"),
    Discord = require('discord.js'),
    errors = require('../../utils/errors.js');
const emotelist = require('../../data/emotes.json')


class Reactrole extends Command {

    constructor (client) {
        super(client, {
            name: "reactrole",
            description: (language) => language.get('REACTION_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_REACTIONROLE'),
            enabled: false,
            guildOnly: true,
            aliases: ['rr','reaction',"role-react",],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_REACTIONROLE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        //  if (!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);
        //a/eval  require('discord.js').Util.parseEmoji(This is a string with an unicode emoji <a:_PTDR:626050812657008662>  );
        var statut = args[0];
        if (statut !== "create" && statut !== "delete") {
            return this.client.errors.utilisation(message, guild_data, this.client);;
        }
        if (statut === "create") {
            var the_channel = message.mentions.channels.first();
            if (!the_channel) this.client.errors.utilisation(message, guild_data, this.client);
            if (!args[1]) return this.client.errors.utilisation(message, guild_data, this.client);
            var msg = the_channel.messages.fetch(args[1])
            if (!msg) return message.reply(message.channel.send(message.language.get('REACTROLE_ERROR')))
            var role = message.mentions.roles.first()
            if (!role) return this.client.errors.utilisation(message, guild_data, this.client);
            var the_id = message.mentions.roles.first().id;
            var emote = args[4]
            if (!emotelist.includes(emote)) {
                return message.channel.send(message.language.get("REACTROLE_NOEMOTE"))
            }
            this.client.rr.create({
                messageID: args[1],
                channel: the_channel,
                reaction: emote,
                role: message.guild.roles.cache.get(the_id),
            });
            message.channel.send(message.language.get('REACTIONROLE_SUCCESS1', guild_data))
        }
        if (statut === "delete") {
            if (!args[1]) return this.client.errors.utilisation(message, guild_data, this.client);
            var msg = the_channel.messages.cache.get(args[1])
            if (!msg) return message.channel.send(message.language.get('REACTROLE_ERROR'))
            var emote = args[2]
            if (!emotelist.includes(emote)) {
                return message.channel.send(message.language.get("REACTROLE_NOEMOTE"))
            }
            this.client.rr.delete({
                messageID: args[1],
                reaction: emote,
            });
            message.channel.send(message.language.get('REACTROLE_SUCCESS2'))
        }
    }
}

module.exports = Reactrole;