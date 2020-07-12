const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')

class Giveaway extends Command {

    constructor (client) {
        super(client, {
            name: "giveaway",
            description: (language) => language.get('GIVEAWAY_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_GIVEAWAY'),
            enabled: true,
            guildOnly: true,
            aliases: ["gv","g",],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_GIVEAWAY'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0]) return this.client.errors.utilisation(message, guild_data, this.client);
        if(args[0] === 'delete'){
            if(!args[1]) this.client.errors.utilisation(message, guild_data, this.client);

            await message.delete()
            let messageID = args[1];
            this.client.gv.delete(messageID).then(() => {
                message.channel.send(message.language.get("GIVEAWAY_DELETE_SUCCESS"));
            }).catch((err) => {
                message.channel.send(message.language.get("GIVEAWAY_ERROR", messageID));
            });
        }
        if(args[0] === 'reroll'){
            if(!args[1]) return this.client.errors.utilisation(message, guild_data, this.client);
            await message.delete()
            let messageID = args[1];
            this.client.gv.reroll(messageID).then(() => {
                message.channel.send(message.language.get("GIVEAWAY_REROLL_SUCCESS"));
            }).catch((err) => {
                message.channel.send(message.language.get("GIVEAWAY_ERROR", messageID));
            })
        }
        if (args[0] === 'end') {
            if (!args[1]) return this.client.errors.utilisation(message, guild_data, this.client);
            await message.delete()
            let messageID = args[1];
            this.client.gv.end(messageID).then(() => {
                message.channel.send(`Le giveaway d'id \`${messageID}\` a été terminé avec succés`);
            }).catch((err) => {
                message.channel.send(`Je n'arrive pas a trouver le giveaway avec l'id \`${messageID}\``);
            });
        }
        if(args[0] === 'create'){
            if (!args[1]) return this.client.errors.utilisation(message, guild_data, this.client);
            if (!args[2]) return this.client.errors.utilisation(message, guild_data, this.client);
            if (!args[3]) return this.client.errors.utilisation(message, guild_data, this.client);
            await message.delete()
            this.client.gv.start(message.channel, {
                time: ms(args[1]),
                prize: args.slice(3).join(" "),
                winnerCount: parseInt(args[2]),
                messages: {
                    giveaway: "\n\n🎉🎉 **GIVEAWAY** 🎉🎉",
                    giveawayEnded: "\n\n🎉🎉 **GIVEAWAY Fini** 🎉🎉",
                    timeRemaining: "Temps Restant **{duration}**!",
                    inviteToParticipate: "Réagis avec 🎉 pour participer!",
                    winMessage: "Bravo, {winners}! tu gagne **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Giveaway annulé, pas de participants valides",
                    hostedBy: "Fait par: {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Finis dans",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            });
        }
    }

}
/*                time: ms(args[1]),
                prize: args.slice(3).join(" "),
                winnerCount: parseInt(args[2]),
                messages: {
                    giveaway: message.language.get("GIVEAWAY_FIELDS")[0],
                    giveawayEnded: message.language.get("GIVEAWAY_FIELDS")[1],
                    timeRemaining: message.language.get("GIVEAWAY_FIELDS")[2],
                    inviteToParticipate: message.language.get("GIVEAWAY_FIELDS")[3],
                    winMessage: message.language.get("GIVEAWAY_FIELDS")[4],
                    embedFooter: data.embed.footer,
                    noWinner: message.language.get("GIVEAWAY_FIELDS")[5],
                    hostedBy: message.language.get("GIVEAWAY_FIELDS")[6],
                    winners: message.language.get("GIVEAWAY_FIELDS")[7],
                    endedAt: message.language.get("GIVEAWAY_FIELDS")[8],
                    units: {
                        seconds: message.language.get("GIVEAWAY_FIELDS")[9],
                        minutes: message.language.get("GIVEAWAY_FIELDS")[10],
                        hours: message.language.get("GIVEAWAY_FIELDS")[11],
                        days: message.language.get("GIVEAWAY_FIELDS")[12],
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2

 */
module.exports = Giveaway;




