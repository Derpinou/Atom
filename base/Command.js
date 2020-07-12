class Command {
    constructor(client, {
      name = null,
      description = false,
      dirname = false,
      usage = false,
      enabled = true,
      guildOnly = false,
      aliases = new Array(),
      permission = new Array(),
      botpermissions = new Array(),
      nsfw = false,
      examples = false,
      owner = false
    }) {
      var category = 'Other';
      if(dirname){
        var folders = dirname.split(/\//g)[dirname.split(/\//g).length-1]
        category = folders;
      }      //Linux __dirname.split(/\//g)[__dirname.split(/\//g).length-1]
      //Windows a!eval __dirname.split(/\\/g)[__dirname.split(/\\/g).length-1]
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, permission, botpermissions, nsfw, owner};
      this.help = { name, description, category, usage, examples };
      this.functions = require('../utils/functions')
    }
  }
  module.exports = Command;
  