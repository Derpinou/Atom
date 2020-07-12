// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const Discord = require('discord.js')
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {

        var ms = require('ms');

        // If the messagr author is a bot
        if (message.author.bot) return;

        // gets the data of the users
        var membersdata = this.client.functions.getUsersData(this.client, message);


        var membre_data;
        membre_data = this.client.databases[0].get(message.author.id);
        if (!membre_data) {
            functions.createUser(message.author);
            membre_data = this.client.databases[0].get(message.author.id);
        }

        // Inits new object to more easily access certain data
        var data;
        if (membre_data.color) {
            data = {
                embed: {
                    color: membre_data.color,
                    footer: this.client.config.embed.footer
                }
            };

        } else {
            data = {
                embed: {
                    color: this.client.config.embed.color,
                    footer: this.client.config.embed.footer
                }
            };
        }
        // If the command is run is DM
        if (message.channel.type === 'dm') {
            const args = message.content.trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) return;
            if (cmd && cmd.conf.guildOnly) return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
            message.language = new (require('../languages/' + this.client.config.default_language + '.js'))
            // If the command exists, run it
            this.client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name} in DM`, "cmd");
            return cmd.run(message, args, membersdata, {prefix: ''}, data);
        }

        // Gets guild data or inits with default config
        var guild_data = this.client.databases[1].get(message.guild.id) || this.client.functions.createGuild(this.client, message.guild);
        module.exports = guild_data;
        // gets the language of the guild
        message.language = new (require('../languages/' + guild_data.lang + '.js'));

        /* SLOWMODE */
        // Checks if the bot was mentioned, with no message after it, returns the prefix.
        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(message.language.get('PREFIX_INFO', guild_data.prefix));
        }

        // If the message doesn't starts with the prefix
        if (message.content.indexOf(guild_data.prefix) !== 0) return;

        // If the message content is "/pay @Androz 10", the args will be : [ "pay", "@Androz", "10" ]
        const args = message.content.slice(guild_data.prefix.length).trim().split(/ +/g);
        // The command will be : "pay" and the args : [ "@Androz", "10" ]
        const command = args.shift().toLowerCase();

        // If the member on a guild is invisible or not cached, fetch them.
        if (message.guild && !message.member) await message.guild.fetchMember(message.author);

        // Gets the command
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (guild_data.commands[command]) {
            return message.channel.send(guild_data.commands[command]);
        }

        // If no command found, return;
        if (!cmd) return;

        // Fix everyone mention
        if (!message.member.hasPermission('MENTION_EVERYONE') && message.mentions.everyone) return message.channel.send(message.language.get('MENTION_EVERYONE'));

        // Check bot permissions :
        var neededPermission = [];
        var botmember = await message.guild.members.fetch(this.client.user);
        cmd.conf.botpermissions.forEach(perm => {
            if (!botmember.hasPermission(perm)) neededPermission.push(perm);
        });
        if (neededPermission.length > 0) return message.channel.send(message.language.get('INHIBITOR_MISSING_BOT_PERMS', neededPermission.map(p => p).join(', ')));

        // checks if the command can be launched
        if (guild_data.ignored_channels.includes(message.channel.id)) return (message.delete()) && (message.author.send(message.language.get('CHANNEL_IGNORED', (message.channel))));
        if (cmd.conf.nsfw && !message.channel.nsfw) return message.channel.send(message.language.get('INHIBITOR_NSFW'))
        if (cmd.conf.permission) {
            if (!message.member.hasPermission(cmd.conf.permission)) return message.channel.send(message.language.get('INHIBITOR_PERMISSIONS', cmd.conf.permission));
        }
        if (!cmd.conf.enabled) return message.channel.send(message.language.get('COMMAND_DISABLED'));
        if (cmd.conf.owner && message.author.id !== this.client.config.owner) return message.channel.send(message.language.get('OWNER_ONLY'));

        data.cmd = cmd;

        // If the command exists, **AND** the user has permission, run it.
        this.client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
        cmd.run(message, args, membersdata, guild_data, data, membre_data);
        var logembed = new Discord.MessageEmbed()
            .addField('Serveur', message.guild.name, true)
            .addField('ID Serveur', '`'+message.guild.id+'`', true)
            .addField('Commande', command, true)
            .addField('Salon', '#'+message.channel.name, true)
            .addField('ID Salon', '`'+message.channel.id+'`', true)
            .addField('Auteur', `${message.author.username}#${message.author.discriminator}`, true)
            .addField('ID Auteur', '`'+message.author.id+'`', true)
            .addField('Contenu du message', '```'+message.content+'```')
            .setFooter(this.client.config.embed.footer)
            .setColor(this.client.config.embed.color)
        this.client.channels.cache.get(this.client.config.support.logs).send(logembed);
    }
};
