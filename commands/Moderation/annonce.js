const Command = require("../../base/Command.js"),
    Discord = require('discord.js'),
    errors = require('../../utils/errors.js');
const ms = require('ms')


class Annonce extends Command {

    constructor (client) {
        super(client, {
            name: "annonce",
            description: (language) => language.get('ANNONCE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_ANNONCE'),
            enabled: false,
            guildOnly: true,
            aliases: [],
            permission: "MENTION_EVERYONE",
            botpermissions: [ "SEND_MESSAGES", "MENTION_EVERYONE", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_ANNONCE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var the_channel = message.guild.channels.cache.get(guild_data.annonces);
        if(!the_channel) return message.channel.send(message.language.get('ANNONCE_NOCHAN', guild_data));
        message.delete().catch(O_o=>{});

        var annonces = args.join(" ");
        if (annonces.length >= 800) return message.channel.send(message.language.get('ANNONCE_ERROR'))

        if(!args[0]){
            return this.client.errors.utilisation(message, guild_data, this.client);
        }


        var mention = "";
        var first_mention = "";

        message.channel.send(message.language.get('ANNONCE_MENTION')).then(m =>{
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 240000 });

            collector.on('collect', message => {

                if(message.content === "non" || message.content === "no"){
                    message.delete();
                    mention = "";
                    collector.stop('ok');
                }
                if(message.content === "oui" || message.content === "yes"){
                    message.delete();
                    first_mention = "defined";
                    message.channel.send(message.language.get('ANNONCE_MENTION2')).then(mess =>{
                        setTimeout(function(){
                            mess.delete();
                        }, ms('4s'))
                    })
                }
                if(first_mention === "defined"){
                    if(message.content === "here"){
                        message.delete();
                        mention = "@here";
                        collector.stop('ok');
                    }
                    if(message.content === "every"){
                        message.delete();
                        mention = "@everyone";
                        collector.stop('ok');
                    }
                }
            });

            collector.on('end', (collected, reason) => {

                m.delete();

                if(reason === "time"){
                    return message.channel.send(message.language.get('ANNONCE_NOTIME'));
                }

                var embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get('ANNONCE_FIELDS')[0])
                    .setColor(data.embed.color)
                    .setDescription(annonces)
                    .setFooter(message.language.get('ANNONCE_FIELDS')[1])
                    .setTimestamp()

                the_channel.send(mention, embed);

            });

        });


    }
}
module.exports = Annonce;