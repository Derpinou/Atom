const express = require('express');
const passport = require("passport");
const session = require("express-session");
const {Strategy} = require("passport-discord");
const app = express();
const bodyparser = require("body-parser");
const client = require('../atom');
const path = require('path');

module.exports.load = async (client) => {

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

var scopes = ['identify', 'guilds'];

passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: client.config.CLIENT_SECRET,
    callbackURL: `${client.config.WEBSITE_URL}/login`,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
      return done(null, profile);
  });
}));

app
.use(bodyparser.json())
.use(bodyparser.urlencoded({ extended: true }))
.engine("html", require("ejs").renderFile)
.use(express.static(path.join(__dirname, '/public')))
.set("view engine", "ejs")
.use(session({
  secret: 'dashboard.io demo',
  resave: false,
  saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())

app
.get('/login',

  passport.authenticate('discord', { failureRedirect: '/' }), 

  function(req, res) { res.redirect('/profile') 

})

.get('/logout', function(req, res) {

  req.logout();

  res.redirect('/');

})

.get('/', function(req, res) {
    
  res.render(__dirname+'/views/index.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
      client: client.user,
      user: req.user,
      login: (req.isAuthenticated() ? "oui" : 'non'),
      invite: `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1`
});
})

.get('/profile', CheckAuth, function(req, res) {
    
  res.render(__dirname+'/views/profile.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
      client: client.user,
      user: req.user,
      guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
  });
})

.get('/serveurs/:guildID', CheckAuth, (req, res) => {

    const serv = client.guilds.cache.get(req.params.guildID);

    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    
    if(!client.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect('/dashboard');


    res.render(__dirname+'/views/guild.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Se connecter"),
      client: client.user,
      user: req.user,
      guild_data: client.databases[1].get(serv.id),
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
      guild: serv,
    });

})

.post('/serveurs/:guildID', function(req, res) {

    const guild = client.guilds.cache.get(req.params.guildID)

if (req.body.Prefix) {
    client.databases[1].set(`${guild.id}.prefix`, req.body.Prefix)

}
if (req.body.Lang === "FR") {
    client.databases[1].set(`${guild.id}.lang`, 'fr')
}

/*    if (req.body.Lang === "EN") {
       // client.databases[1].set(`${guild.id}.lang`, 'en')
        res.send('Le mode Anglais n\'est pas disponnible pour le moment')
    }

  */
    if (req.body.ROLE_STATUS === "ON") {
        if(req.body.ROLE) {
            let id = req.body.ROLE
            guild.roles.cache.find(r => role.id === id)
            if (!id) return res.send('Je n\' arrvie pas à trouver le role choisis')
            client.databases[1].set(guild.id+'.autorole_plugin.status', 'on');
            client.databases[1].set(guild.id+'.autorole_plugin.role', id);
        }
    } else if (req.body.ROLE_STATUS === "OFF") {
        client.databases[1].set(guild.id+'.autorole.status', 'disabled');
        client.databases[1].set(guild.id+'.autorole.role', 'unknow');
            }
    if (req.body.EVERYROLE) {
        let id = req.body.EVERYROLE
        let role = guild.roles.cache.find(r => role.id === id)
        if (!role) return res.send('Test')
            guild.members.cache.forEach(element => {
            element.roles.add(role);

        })
    }
  res.redirect(`/serveurs/${req.params.guildID}`);

})

.get('*', function(req, res) {

  res.redirect("/");

});

function CheckAuth(req, res, next) {

  if (req.isAuthenticated()) {

    return next();

    }else{

    return res.redirect("/login");

  }
}


app.listen(80, function (err) {

  if (err) return console.log(err)

  console.log('DASHBOARD démarré !')

  });
};

