// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {

        // Gets the guild data
        var guild_data = this.client.databases[1].get(member.guild.id) || this.client.functions.createGuild(member.guild);

        // Check if the autorole is enabled
        if (guild_data.autorole_plugin.status == 'on') {
            var role = member.guild.roles.cache.get(guild_data.autorole_plugin.role);
            if (role) member.roles.add(role).catch(err => this.client.logger.log(`I can't add the role to the member in ${member.guild.id}`, 'error'));
        }

        // Check if welcome message is enabled
        if (guild_data.welcome_plugin.status === 'on') {
            var channel = member.guild.channels.cache.get(guild_data.welcome_plugin.channel);
            if (channel) {
                // Gets and edits the message
                var message = guild_data.welcome_plugin.message
                    .replace(/{membre}/g, member)
                    .replace(/{serveur}/g, member.guild.name)
                    .replace(/{membercount}/g, member.guild.memberCount)
                channel.send(message);
            }
        }


    }
};
  