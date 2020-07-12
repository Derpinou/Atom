const Command = require("../../base/Command.js"),
    Discord = require('discord.js');
var cgame = false;
const ms = require('ms')
class Number extends Command {

    constructor (client) {
        super(client, {
            name: "number",
            description: (language) => language.get('NUMBER_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_NUMBER'),
            enabled: true,
            guildOnly: false,
            aliases: ["nb",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_NUMBER'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {


        if(cgame){
            if(cgame === message.guild.id) return message.channel.send(message/language.get('NUMBER_ERROR'));
            else {
                var embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get('NUMBER_HELLO')+message.author.username, message.author.displayAvatarURL)
                    .setDescription('NUMBER_BUG')
                    .setColor(data.embed.color)
                    .setFooter(data.embed.footer)
                return message.channel.send(embed);
            }
        }

        var number_participants = 0;
        var participants = [];
        var essais = 0;
        var the_number = RandNum();

        message.channel.send(message.language.get('NUMBER_INIT'));
        console.log(the_number)

        var create_date = Date.now();

        const number_collector = new Discord.MessageCollector(message.channel, m => m.author.id !== 'xxx', { time: ms('10m') });

        cgame = message.guild.id;

        number_collector.on('collect', message => {

            if(message.author.bot) return;

            if(!participants.includes(message.author.id)){
                number_participants++;
                participants.push(message.author.id);
            }

            var contenu = message.content;

            if(isNaN(contenu)) return;
            if (contenu.length >= 20) return;

            if(parseInt(contenu) === the_number){
                cgame = false;
                var end_date = Date.now();
                var time = end_date - create_date;
                message.channel.send(message.language.get('NUMBER_FINISH', message, the_number, convertMS, time, number_participants, essais, displayMembers));
                this.client.databases[0].add(message.author.id+'.stats.number.wins', 1);
                number_collector.stop(message.author.username);
            }
            if(parseInt(contenu) < the_number){
                message.reply(message.language.get('NUMBER_SUP', contenu));
                essais++
            }
            if(parseInt(contenu) > the_number){
                message.reply(message.language.get('NUMBER_INF', contenu));
                essais++
            }

        });

        number_collector.on('end', (collected, reason) =>{
            if(reason === 'time'){
                cgame = false;
                return message.channel.send(message.language.get('NUMBER_NOFIND', the_number));
            }
        });

        function RandNum(){
            var min=1;
            var max=5000;
            var random = Math.floor(Math.random() * (+max - +min)) + +min;
            return random;
        }
        function displayMembers(message){
            var nb = 0;
            var part_message = "";
            participants.forEach(element =>{
                nb++;
                var the_member = message.guild.members.cache.get(element);
                part_message += "#"+nb+ ' | <@'+the_member.id + '>\n';
            });
            return part_message;
        }
        function convertMS(ms) {
            var d, h, m, s;
            s = Math.floor(ms / 1000);
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            h += d * 24;
            return h + message.language.get('NUMBER_TIME')[0] + m + message.language.get('NUMBER_TIME')[1] + s + message.language.get('NUMBER_TIME')[2];
        }
    }

}

module.exports = Number;