const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
const ms = require('ms')


class Sondage extends Command {

    constructor (client) {
        super(client, {
            name: "sondage",
            description: (language) => language.get('SOND_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SONDAGE'),
            enabled: false,
            guildOnly: false,
            aliases: [],
            permission: "MENTION_EVERYONE",
            botpermissions: [ "SEND_MESSAGES", "MENTION_EVERYONE", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SONDAGE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        const emoteNo = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'no')
        const emoteUi = this.client.guilds.cache.get(this.client.config.emo.id).emojis.cache.find(e => e.name === 'yes')

        var the_channel = message.guild.channels.cache.get(guild_data.sondages);
        if(!the_channel) return message.channel.send(message.language.get('SOND_NOCHAN'));
        message.delete().catch(O_o=>{});

        var question = args.join(" ");

        if(!args[0]){
            return this.client.errors.utilisation(message, guild_data, this.client);
        }

        var mention = "";
        var first_mention = "";
        message.channel.send(message.language.get('SOND_MENTION')).then(m =>{
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 240000 });

            collector.on('collect', message => {

                if(message.content === message.language.get('NO')){
                    message.delete();
                    mention = "";
                    collector.stop('ok');
                }
                if(message.content === message.language.get('YES')){
                    message.delete();
                    first_mention = "defined";
                    message.channel.send(message.language.get('SOND_MSG')).then(mess =>{
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

                if(reason === "time"){
                    return message.channel.send(message.language.get('SOND_TIMEOUT'));
                }

                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get('SOND_FIELDS')[0])
                    .setColor(data.embed.color)
                    .addField(question, message.language.get('SOND_FIELDS')[1] + emoteNo.toString() + message.language.get('SOND_FIELDS')[2] + emoteUi.toString() + " !")

                m.delete();

                the_channel.send(mention, embed).then((me) => {
                    me.react(emoteUi);
                    me.react(emoteNo);

                }).catch(err => message.channel.send(message.language.get('SOND_ERROR')))

            });
        });
    }
}



module.exports = Sondage;