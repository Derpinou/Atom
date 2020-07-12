const ms = require('ms')
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {

        // Fetch discord app
        this.client.appInfo = await this.client.fetchApplication();
        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);

        // Logs some informations using the logger file
        this.client.logger.log(`Loading a total of ${this.client.commands.size} command(s).`, 'log');
        this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.cache.size} users in ${this.client.guilds.cache.size} servers.`, "ready");

/*
        setInterval(setGame, ms('60s'));

        function setGame() {
            this.client.user.setActivity(this.client.config.prefix + 'help sur ' + this.client.guilds.cache.size + ' serveurs');
            setTimeout(function () {
                this.client.user.setActivity('a!help');
            }, ms('16s'));
            setTimeout(function () {
                this.client.user.setActivity('a!invite');
            }, ms('32s'));
            setTimeout(function () {
                var nombreSalons = this.client.channels.cache.size;
                var nombreMembres = this.client.users.cache.size;
                var nombreServeurs = this.client.guilds.cache.size;
                this.client.user.setActivity(nombreServeurs + ' servers | ' + nombreMembres + ' members | ' + nombreSalons + ' salons');
            }, ms('48s'));
        }

 */


        // Update the game every 20s
        var games = [
            `${this.client.config.prefix}help on ${this.client.guilds.cache.size} guilds`,
            `Add me with ${this.client.config.prefix}invite!`
        ];
        var client = this.client;
        var i = 0;
        setInterval(function () {
            client.user.setActivity(games[i]);
            if (games[parseInt(i + 1)]) i++;
            else i = 0;
        }, 20000);


    }
}  