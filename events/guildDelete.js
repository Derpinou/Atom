module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');

        // Fetch the guild owner
        this.client.users.fetch(guild.ownerID).then(owner => {

            // Sends log embed in the logs channel
            var log_embed = new Discord.MessageEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription('Le serveur `'+guild.name+'` vient de nous quitter, je suis maintenant sur '+ this.client.guilds.cache.size + ' serveurs')
                .addField('ID', guild.id, true)
                .addField('Membres', `${parseInt(guild.memberCount - guild.members.cache.filter(m => m.user.bot).size)} membres | ${guild.members.cache.filter(m => m.user.bot).size} bots`)
                .addField('Salons', `${guild.channels.cache.filter(ch => ch.type === 'text').size} textuels | ${guild.channels.cache.filter(ch => ch.type === 'voice').size} ${(guild.channels.cache.filter(ch => ch.type === 'voice').size > 1) ? 'vocaux' : 'vocal'} | ${guild.channels.cache.filter(ch => ch.type === 'category').size} catégories`)
                .addField('Fondateur', `${owner.username}#${owner.discriminator}`)
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer)
            this.client.channels.cache.get(this.client.config.support.serverlogs).send(log_embed);
          //  this.client.functions.setGame(this.client)
        });

    }
}  