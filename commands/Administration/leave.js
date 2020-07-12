const Command = require("../../base/Command.js");
class Leave extends Command {

    constructor (client) {
        super(client, {
            name: "leave",
            description: (language) => language.get('LEAVE_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_LEAVE'),
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_LEAVE'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data) {

        if(args[0] === 'test'){
            this.client.emit('guildMemberRemove', message.member);
            return message.channel.send(message.language.get('LEAVE_TEST'))
        }

        if(guild_data.leave_plugin.status == 'on'){
            this.client.databases[1].set(message.guild.id+'.leave_plugin.status', 'disabled');
            this.client.databases[1].set(message.guild.id+'.leave_plugin.channel', 'unknow');
            this.client.databases[1].set(message.guild.id+'.leave_plugin.message', 'unknow');
            return message.channel.send(message.language.get('LEAVE_DISABLED', guild_data.prefix));
        }

        message.channel.send(message.language.get('LEAVE1', message.author.username));
        
        // Init new leave object 
        var leave = {
            status:'on',
            channel:'unknow',
            message:'unknow'
        };

        // Creates discordjs message collector
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 120000 }); // 2 min

        // When a message is received 

        collector.on('collect', msg => {

            if(leave.channel !== 'unknow' && leave.message === 'unknow'){
                if(msg.content.length < 1501){
                    leave.message = msg.content;
                    message.channel.send(message.language.get('LEAVE_SUCCESS', leave.channel, guild_data.prefix));
                    // Updates db
                    this.client.databases[1].set(`${message.guild.id}.leave_plugin`, leave);
                    collector.stop();
                } else return message.channel.send(message.language.get('LEAVE_CARACT'));
            }

            if(leave.channel === 'unknow'){
                var channel = msg.mentions.channels.first();
                if(!channel) return message.channel.send(message.language.get('MENTION_CHANNEL'));
                else leave.channel = channel.id;
                message.channel.send(message.language.get('LEAVE2', channel, message));
            }

        });
        
        collector.on('end', (collected, reason) => {
            if(reason === 'time'){
                return message.channel.send(message.language.get('LEAVE_TIMEOUT'));
            }
        });
    }

}

module.exports = Leave;