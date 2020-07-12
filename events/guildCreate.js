module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');
        var functions = require('../utils/functions')
        
        // Inits guild data 
        this.client.functions.createGuild(this.client, guild);

        // Fetch the guild owner
        this.client.users.fetch(guild.ownerID).then(owner => {

            // Send a dm to the guild founder 
            var embed = new Discord.MessageEmbed()
                .setAuthor('Thank you for adding me to your guild !')
                .setDescription('To configure me, type `'+this.client.config.prefix+'help` and look at the administration commands!\nTo change the language, type `'+this.client.config.prefix+'setlang [language]`.')
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer)
                .setTimestamp();
       //     owner.send(embed).catch(err => this.client.logger.log(`I can't send message of thanks to the founder of ${guild.id}`, 'error'))
            // Sends log embed in the logs channel
            var log_embed = new Discord.MessageEmbed()
                .setAuthor(guild.name)
                .setThumbnail(guild.iconURL())
                .setDescription('Merci au serveur `'+guild.name+'` de m\'avoir ajouté, je suis maintenant sur '+ this.client.guilds.cache.size + ' serveurs')
                .addField('ID', guild.id, true)
                .addField('Membres', `${parseInt(guild.memberCount - guild.members.cache.filter(m => m.user.bot).size)} membres | ${guild.members.cache.filter(m => m.user.bot).size} bots`)
                .addField('Salons', `${guild.channels.cache.filter(ch => ch.type === 'text').size} textuels | ${guild.channels.cache.filter(ch => ch.type === 'voice').size} ${(guild.channels.cache.filter(ch => ch.type === 'voice').size > 1) ? 'vocaux' : 'vocal'} | ${guild.channels.cache.filter(ch => ch.type === 'category').size} catégories`)
                .addField('Date de création', functions.printDateonts(guild.createdTimestamp), true)
                .addField('Fondateur', `${owner.username}#${owner.discriminator}`)
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer)
            this.client.channels.cache.get(this.client.config.support.serverlogs).send(log_embed);


            var the_channel = guild.channels.cache.filter(channel => channel.type === "text");

            the_channel.first().createInvite({
                maxAge: '0',
                reason: "getinvite"
            }).then(i => {
                var guildOwner = new Discord.MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL())
                    .setDescription('Serveur ' + guild.name + ' rejoint !')
                    .addField('Nombre de membres', guild.memberCount, true)
                    .addField('ID', guild.id, true)
                    .addField('Propriétaire', guild.owner.user.username + '#' + guild.owner.user.discriminator, true)
                    .addField('Date de création', functions.printDateonts(guild.createdTimestamp), true)
                    .addField('Salons', `${guild.channels.cache.filter(ch => ch.type === 'text').size} textuels | ${guild.channels.cache.filter(ch => ch.type === 'voice').size} ${(guild.channels.cache.filter(ch => ch.type === 'voice').size > 1) ? 'vocaux' : 'vocal'} | ${guild.channels.cache.filter(ch => ch.type === 'category').size} catégories`)
                    .addField('Invitation', '**' + i.url + '**')
                    .setThumbnail(guild.iconURL)
                    .setColor(this.client.config.embed.color)
                    .setFooter(this.client.config.embed.footer)
                    .setTimestamp();

            this.client.users.cache.get(this.client.config.owner).send('Nouveau serveur rejoint : ' + guild.name, guildOwner);
            functions.setGame(this.client)

            })


        });
    }
}  