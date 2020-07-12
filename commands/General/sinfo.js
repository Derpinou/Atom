const Command = require("../../base/Command.js"),
    Discord = require('discord.js');


class Sinfo extends Command {

    constructor (client) {
        super(client, {
            name: "sinfo",
            description: (language) => language.get('SI_DESCRIPTION'),
            dirname: __dirname,
            usage: (language) => language.get('USAGE_SINFO'),
            enabled: true,
            guildOnly: false,
            aliases: ["server-info","serverinfo","si","serveri",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: (language) => language.get('EXAMPLE_SINFO'),
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var the_server;

        if(!args[0]) the_server = message.guild;

        if(args[0]){
            the_server = bot.guilds.cache.get(args[0]);
            if(!the_server) the_server = message.guild;
        }


        var nom = the_server.name;
        var afk_channel = (the_server.afkChannel) ? the_server.afkChannel.name : message.language.get('SI_NOAFK');
        var nb_membres = the_server.memberCount;

        var verification_level = the_server.verificationLevel;
        var region = the_server.region;
        var proprio = the_server.owner;
        var avatar = the_server.iconURL({ format: 'png', dynamic: true, size: 1024 });
        var id = the_server.id;
        var nb_channels = the_server.channels.cache.size;
        var embed_value = the_server.embedEnabled;
        var created_date = this.functions.printDate(the_server.createdAt);
        var botCount = 0;
        var online = 0;
        var streamer = 0;
        var dnd = 0;
        var offline = 0;
        var afk = 0;
        var pjeu = 0;
        var bot_number = 0;
        var human_number = 0;
        the_server.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
            if(member.presence.status === "dnd") dnd++;
            if(member.presence.status === "idle") afk++;
            if(member.presence.status === "offline") offline++;
            if(member.presence.status === "streamer") streamer++;
            if(member.presence.status === "online") online++;
            if(member.presence.game) pjeu++
            if(member.user.bot === true) bot_number++;
            if(member.user.bot === false) human_number++;
        });
        if(the_server.roles.cache.map(na => na.name).length - 15 <= 0) {
            if(the_server.roles.cache.map(e => e.name).length === 0) {
                var MessageRole = "Aucun rôle"
            } else {
                var MessageRole = the_server.roles.cache.map(na => na).sort((roleA, roleB) => roleB.calculatedPosition - roleA.calculatedPosition).slice(0, 15).join(" ❱ ")
            }
        } else {
            var MessageRole = the_server.roles.cache.map(na => na).sort((roleA, roleB) => roleB.calculatedPosition - roleA.calculatedPosition).slice(0, 7).join(" ❱ ") + " ❱ et " + (the_server.roles.cache.map(na => na.name).length - 15) + " autres rôles..."
        }
        if(the_server.emojis.cache.map(na => na.name).length - 10 <= 0) {
            if(the_server.emojis.cache.map(e => e.name).length === 0) {
                var Message = "Aucun émoji"
            } else {
                var Message = the_server.emojis.cache.map(na => this.client.emojis.cache.get(na.id).toString()).slice(0, 10).join(" [●](https://discordapp.com/) ")
            }
        }
        else {
            var Message = the_server.emojis.cache.map(na => this.client.emojis.cache.get(na.id).toString()).slice(0, 10).join(" [●](https://discordapp.com/) ") + " [●](https://discordapp.com/) et " + (the_server.emojis.cache.map(na => na.name).length - 10) + " autres émojis..."
        }


        if(region === "eu-central"){
            region = message.language.get('SI_REGION')[0];
        }
        if(region === "eu-west"){
            region = message.language.get('SI_REGION')[1];
        }
        if(region === "brazil"){
            region = message.language.get('SI_REGION')[2];
        }
        if(region === "hongkong"){
            region = message.language.get('SI_REGION')[3];
        }
        if(region === "japan"){
            region = message.language.get('SI_REGION')[4];
        }
        if(region === "russia"){
            region = message.language.get('SI_REGION')[5];
        }
        if(region === "singapore"){
            region = message.language.get('SI_REGION')[6];
        }
        if(region === "southafrica"){
            region = message.language.get('SI_REGION')[7];
        }
        if(region === "sydney"){
            region = message.language.get('SI_REGION')[8];
        }
        if(region === "us-east"){
            region =message.language.get('SI_REGION')[9];
        }
        if(region === "us-south"){
            region = message.language.get('SI_REGION')[10];
        }
        if(region === "us-central"){
            region = message.language.get('SI_REGION')[11];
        }
        if(region === "us-west"){
            region = message.language.get('SI_REGION')[12];
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor('Informations sur ' + nom)
            .setThumbnail(avatar)
            .setColor(data.embed.color)
            .addField(message.language.get("SI_FIELDS")[0], id)
            .addField(message.language.get("SI_FIELDS")[1], verification_level)
            .addField(message.language.get("SI_FIELDS")[2], afk_channel)
            .addField(message.language.get("SI_FIELDS")[3], created_date)
            .addField(message.language.get("SI_FIELDS")[4], region)
            .addField(message.language.get("SI_FIELDS")[5], proprio)
            .addField(message.language.get("SI_FIELDS")[6],message.language.get("SI_STATUS", human_number, bot_number, online, dnd, afk, offline, streamer,pjeu))
            .addField(message.language.get("SI_FIELDS")[7], Message )
            .addField(`${message.language.get("SI_FIELDS")[8]} (${the_server.roles.cache.map(r => r.name).length})`, MessageRole )
            .addField(message.language.get("SI_FIELDS")[9], nb_channels)
            .setFooter(data.embed.footer)

        message.channel.send(embed);


    }

}

module.exports = Sinfo;

