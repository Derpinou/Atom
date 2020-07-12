const { MessageEmbed } = require('discord.js')
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(message) {

        if (!message.partial) {
            const channel = this.client.channels.cache.get('718074238052859924');
            if (channel) {
                const embed = new MessageEmbed()
                    .setTitle('Message Supprimé')
                    .addField('Auteur', `${message.author.tag} (${message.author.id})`, true)
                    .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                    .setDescription(message.content)
                    .setTimestamp();
                channel.send(embed);
            }
        }

    }
}