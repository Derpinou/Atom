let
warn = "<:warn:679789824277741706>",
error = "<:no:697047212429017098>",
success = "<:yes:697047113049047110>",
desactivate = "<:desactiv:718352142930411581>",
activate = "<:activ:718352042778689547>",
load = "<a:load2:679789707562975281>"

let owner = "`Derp#5777`",
yes = 'oui',
no = 'non',
botname = 'Atom'

// This class is used to store languages strings

module.exports = class {
constructor(...args) {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `le préfixe sur ce serveur est \`${prefix}\``,
			YES: 'Oui',
			NO : 'Non',
			NOTHING:'Aucun(e)',
			NEVER: "Jamais",
			SECONDS:"seconde(s)",
			HOURS:"heure(s)",
			MINUTES:"minute(s)",
			DAY:"jour(s)",
			WEEK:"semaine(s)",
			MONTH:"mois(s)",
			YEAR:"année(s)",
			MEMBERS:"Membres",
			SERVERS:"Serveurs",
			CHANNELS:"Salons",
			MONTHS: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
			WARN: warn,
			ERROR: error,
			SUCCESS: success,


			// ERROR MESSAGE
			ERROR_SYNTAX: `${warn} | Veuillez respecter le plan de la commande`,
			INHIBITOR_MISSING_BOT_PERMS: (perms) => `${error} | J'ai besoin des permissions suivantes pour effectuer cette commande : ${perms}`,
			INHIBITOR_NSFW: `${error} | Vous devez vous rendre dans un salon qui autorise le NSFW pour taper cette commande !`,
			INHIBITOR_PERMISSIONS:(perm) => `${error} | Vous n'avez pas les permissions nécessaires pour effectuer cette commande (\`${perm}\`)`,
			COMMAND_DISABLED: `${error} | Cette commande est actuellement désactivée !`,
			OWNER_ONLY: `${error} | Seul ${owner} peut effectuer ces commandes !`,
			MENTION_CHANNEL: `${error} | Veuillez mentionner un salon valide !`,
			MENTION_ROLE: `${error} | Veuillez mentionner un rôle valide !`,
			CHANNEL_IGNORED: (channel) => `${error} | Les commandes sont interdites dans ${channel} !`,
			BAD_PARAMETERS: (cmd, prefix) => `${error} | Veuillez vérifier les paramètres de la commande. Regardez les exemples en tapant \`${prefix}help ${cmd.help.name}\` !`,
			ROLE_NOT_FOUND: (role) => `${error} | Aucun rôle trouvé avec \`${role}\` !`,
			YES_OR_NO: `${error} | Vous devez répondre par "oui" ou par "non" !`,
			INVALID_TIME: `${error} | Vous devez entrer un temps valide ! Unités valides : \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			MENTION_EVERYONE: `${error} | Vous n'avez pas l'autorisation de mentionner everyone ou here dans les commandes.`,

			// PING COMMAND
			PING_DESCRIPTION: 'Affiche la latence du bot',
			PING: (ms) => `${success} | Pong ! Ma latence est de \`${ms}\` ms !`,
			PING_MESSAGE: `Ping du message`,
			PING_API: 'Ping de l\'API',

			// HELP COMMAND
			HELP_DESCRIPTION: `Affiche l'aide des commandes ou l'aide d'une commande en particulier`,
			HELP_COMMAND_NOT_FOUND: (cmd) => `${error} | Commande ${cmd} introuvable !`,
			HELP_DISABLED: `Cette commande est actuellement désactivée`,
			HELP_OWNER_ONLY: `Seul ${owner} peut effectuer cette commande !`,
			HELP_REMINDER: (prefix) => `Pour avoir de l\'aide sur une commande tapez \`${prefix}help <commande>\` !`,
			HELP_HEADING_2:(nb) => `Liste des commandes - (${nb})`,
			HELP_HEADING: `Aide :`,
			HELP_USAGE: `Utilisation :`,
			HELP_EXAMPLES: `Exemples :`,
			HELP_GROUP: `Groupe :`,
			HELP_DESC: `Description :`,
			HELP_PERMISSIONS: `Permissions :`,
			HELP_CUSTOMIZED: (cmd) => `${error} | La commande ${cmd} ne dispose pas d'aide car elle est personnalisée.`,
			HELP_NO_ALIASES:'Pas d\'allias',
			HELP_OWNER:'Vous n\'avez pas accés aux commandes développeur',



			//Autorole command
			AUTOROLE_DISABLED: `${success} Autorole désactivé avec succés`,
			AUTOROLE_ENABLED: `${success} Autorole activé avec succés`,

			// Welcome cmd
			WELCOME_DESCRIPTION: `Envoie un message de bienvenue dans un salon défini au préalable !`,
			WELCOME_DISABLED: (prefix) => `${success} | Les messages de bienvenue viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			WELCOME_TEST: `${success} | Test effectué !`,
			WELCOME1: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message de bienvenue ? (mentionnez un salon)`,
			WELCOME2: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message de bienvenue ci-dessous : \n\nInfos:\`\`\`\nMention : {membre}\nMembres : {membercount}\nServeur : {serveur}\`\`\`Par exemple, "Bienvenue {membre} sur {serveur} ! Grâce à toi, nous sommes {membercount} !" donnera "Bienvenue ${msg.author} sur ${msg.guild.name} ! Grâce à toi, nous sommes ${msg.guild.memberCount} !".`,
			WELCOME_SUCCESS: (channel, prefix) => `${success} | Messages de bienvenue activés dans <#${channel}> ! Tapez \`${prefix}welcome test\` pour tester le message de bienvenue !`,
			WELCOME_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			WELCOME_CARACT: `${error} | Votre message ne doit pas excéder les 1500 caractères !`,

			// Ignore command
			IGNORE_DESCRIPTION: 'Désactive ou active les commandes dans le salon mentionné',
			UNIGNORE_SUCESS: (channel) => `${success} | Les commandes sont maintenant autorisées dans ${channel} !`,
			IGNORE_SUCESS: (channel) => `${warn} | Les commandes sont maintenant interdites dans ${channel} !`,

			// Leave cmd
			LEAVE_DESCRIPTION: `Envoie un message d'au revoir dans un salon défini au préalable !`,
			LEAVE_DISABLED: (prefix) => `${success} | Les messages d'au revoir viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			LEAVE_TEST: `${success} | Test effectué !`,
			LEAVE1: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message d'au revoir ? (mentionnez un salon)`,
			LEAVE2: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message d'au revoir ci-dessous : \n\nInfos:\`\`\`\nMention : {membre}\nMembres : {membercount}\nServeur : {serveur}\`\`\`Par exemple, "Au revoir {membre} ! C'est triste, sans toi nous ne sommes que {membercount} sur {serveur} !" donnera "Au revoir ${msg.author.username}#${msg.author.discriminator} ! C'est triste, sans toi nous ne sommes que ${msg.guild.memberCount} sur ${msg.guild.name} !".`,
			LEAVE3: `Ça marche ! Voulez-vous qu'une superbe image d'au revoir soit envoyée en même temps ? Répondez par "${yes}" ou par "${no}" !`,
			LEAVE_SUCCESS: (channel, prefix) => `${success} | Messages d'au revoir activés dans <#${channel}> ! Tapez \`${prefix}leave test\` pour tester le message d'au revoir !`,
			LEAVE_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			LEAVE_CARACT: `${error} | Votre message ne doit pas excéder les 1500 caractères !`,
			LEAVE_IMG: (name) => `Départ de ${name}`,

			// Slowmode
			SLOWMODE_DESCRIPTION: `Définissez un cooldown dans un salon`,
			SLOWMODE_DISABLED: (channel) => `${success} | Le slowmode a été désactivé dans le salon <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${success} | Slowmode activé dans <#${channel}> avec un temps de ${time} !`,
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${error} | Le salon ${channel} est en slowmode ! Veuillez attendre ${time} pour pouvoir poster un nouveau message !`,
			// Set prefix
			SETPREFIX_DESCRIPTION: 'Change le préfixe du serveur',
			VALID_PREFIX: `${error} | Veuillez entrer un préfixe valide !`,
			PREFIX_CHARACTERS: `${error} | Le préfixe ne doit pas excéder les 5 caractères !`,
			PREFIX_SUCCESS: (prefix) => `${success} | Le préfixe a bien été modifié ! Tapez \`${prefix}help\` pour voir la liste des commandes !`,
			// Conf command
			CONFIGURATION_DESCRIPTION:'Affiche la configuration du serveur',
			PREFIX: "Préfixe",
			IGNORED_CHANNELS: "Salons ignorés",
			NO_IGNORED_CHANNELS: "Aucun salon ignoré",
			AUTOROLE: 'Autôrole',
			WELCOME: 'Bienvenue',
			CONFIGURATION_AUTOROLE_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nRôle : \`${guild_data.role.name}\``,
			DISABLED_PLUGIN: `Statut : ${desactivate} **Désactivé**`,
			CONFIGURATION_WELCOME_ENABLED: (guild_data) => `Statut : **Activé**\nSalon : <#${guild_data.channel}>`,
			LEAVE: 'Message d\'au revoir',
			CONFIGURATION_LEAVE_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			ANNONCE: 'Salon d\'annonces',
			CONFIGURATION_ANNONCE_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			SETLOGS: 'Salon des logs',
			CONFIGURATION_SETLOGS_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			SETREPORT: 'Salon des reports',
			CONFIGURATION_SETREPORT_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			SETSONDAGES: 'Salon des sondages',
			CONFIGURATION_SETSONDAGES_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			SETSUGGESTIONs: 'Salon des suggestions',
			CONFIGURATION_SETSUGGESTIONS_ENABLED: (guild_data) => `Statut : ${activate} **Activé**\nSalon : <#${guild_data.channel}>`,
			SLOWMODE: 'Slowmode',
			NO_SLOWMODE: `Aucun salon avec slowmode`,

			// Botinfo Command
			INFO: (client) => `Informations sur ${client.user.username}`,
			NAME: "Nom:",
			DISCRIMINATOR: "Discriminant",
			DEVELOPPER: "Developpeur:",
			OS: "Systeme d'exploitation:",
			PROCESSOR: "Processeur:",
			RAM: "Ressources utilisées:",
			BOTINFO_DESCRIPTION: 'Donne des informations sur le bot',

			// Calc Command
			CALC_ERROR: `${warn} | Quelque chose s'est mal passé... Vérifiez votre opération et réessayez !`,
			CALC_AUTHOR:"Calculatrice Atomique",
			CALC_RESULT:`Résultat`,
			CALC_CALC: `Calcul à la Base`,
			CALC_LENGHT: `${warn} Votre calcul ne doit pas dépasser 800 caractères`,

			//Add-time command
			ADDTIME_DESCRIPTION: `Vous donne la date et l'heure qu'il sera dans ...`,
			ADDTIME_NOW: `Date actuelle:`,
			ADDTIME_TOADD: `Temps Ajouté:`,
			ADDTIME_RESULT: `Résultat:`,

			//CInfo Command
			CINFO_DESCRIPTION:"Donne des informations sur un salon",
			CINFO_NAME:'Nom',
			CINFO_ID:'ID',
			CINFO_BITRATE:'Bitrate',
			CINFO_POS:'Position',
			CINFO_USERS:'Utilisateur(s)',
			CINFO_CAT:'Catégorie',
			CINFO_NBMAX:'Nombre de slots',
			CINFO_NSFW:'NSFW',
			CINFO_DESC:'Description',
			CINFO_ERROR: channel => `${warn} | Le type de salon ${channel.type} n'est pas pris en charge par cette commande.`,

			//QRcode Command
			QR_DESCRIPTION:"Créer une QRcode avec le contenu de votre message",
			QR_ERROR:"Veuillez Préciser un texte",
			QR_LENGHT:"Votre message ne doit pas dépasser les 800 caracteres",
			QR_CONTENT:"Contenu:",
			QR_MSG: texte =>`Génération de votre Qrcode pour \`${texte}\` en cours...`,

			//HasteBin Command
			HASTE_ERROR:"Veuillez préciser un texte",
			HASTE_LENGHT:"Votre message ne doit pas dépasser les 800 caracteres",
			HASTE_CONTENT:"Contenu:",
			HASTE_LINK:"Lien Hastebin",
			HASTE_DESCRIPTION:"Créer et rempli un lien Hastebin avec le contenu de votre choix",
			HASTE_MSG: texte =>`Génération de votre lien Hastebin pour \`${texte}\` en cours...`,

			//Invitations Command
			INVITS_DESCRIPTION: "Donne votre nombre d'invitation sur le serveur où est effectuée la commande",
			INVITS_NOINVIT: `${error} |  Actuellement aucune invitation sur le serveur`,
			INVITS_UTILS: `Utilisations) |`,
			INVITS_INFO: (membre, message) => `Informations sur les invitations de ${membre.user.username} sur ${message.guild.name}`,
			INVITS_USERCOUNT: `👥 Personnes Invitées`,
			INVITS_CODE: `🔑 Codes,`,

			//MemberCount Command
			MC_STATS: message => `MemberCount de ${message.guild.name}`,
			MC_DESCRIPTION: `Donne le nombre de membres sur le serveur et leurs status`,
			MC_MEMBERS:`Membres`,
			MC_STATUS: (human_number, bot_number, online, dnd, afk, offline, streamer,pjeu) => `👥 Total : **${human_number}**\n
        <:bot:705137657520586763> Bots : **${bot_number}**\n
        <:online:679787448196530236> En ligne : **${online}**\n
        <:dnd:696794103257628784> Ne pas déranger : **${dnd}**\n
        <:idle:696794240818217071> Inactifs : **${afk}**\n
        <:offline:679787545185484813> Hors-Ligne : **${offline}**\n
        <:stream:705136860737044490> Streamers : **${streamer}**\n
        🎮 En jeu : ** ${pjeu}**`,

			//Invite Command
			INVIT_DESCRIPTION:`Donne le lien d'invitation du bot ainsi que celui du serveur support`,
			INVIT_INVIT:'Invitations' ,
			INVIT_1:'Invitez le bot sur votre propre serveur !',
			INVIT_GEN:'Génération...',
			INVIT_SUPP:'Serveur Support',
			INVIT_CLICK:"[Cliquez-ici]",

			//Setcolor command
			COLOR_DESCRIPTION: 'Définis une couleur pour les Embeds',
			COLOR_ERROR: `${warn} | Couleur Invalide !`,
			COLOR_SUCCESS: hexa => `${success} | Couleur d'embed définie en: ${hexa} !\``,

			//Report Commmand
			REPORT_DESCRIPTION : `Besoin de signaler un membre ? Utilisez cette commande !`,
			REPORT_NOCHAN: `${error} | Aucun salon de report défini !`,
			REPORT_EMBEDAUTH: member => `Membre ${member.user.username} signalé`,
			REPORT_AUTHOR:`Autheur`,
			REPORT_MEMBER: `Membre`,
			REPORT_DATE: 'Date',
			RPEORT_REASON: 'Raison',
			REPORT_MSG: `${success} | Votre report a été envoyé à l'administration !`,

			//Sinfo Command
			SI_STATS: `Information serveur de`,
			SI_DESCRIPTION: `Donne toutes les informations du serveur`,
			SI_STATUS: (human_number, bot_number, online, dnd, afk, offline, streamer,pjeu) => `👥 Total : **${human_number}**\n
        <:bot:705137657520586763> Bots : **${bot_number}**\n
        <:online:679787448196530236> En ligne : **${online}**\n
        <:dnd:696794103257628784> Ne pas déranger : **${dnd}**\n
        <:idle:696794240818217071> Inactifs : **${afk}**\n
        <:offline:679787545185484813> Hors-Ligne : **${offline}**\n
        <:stream:705136860737044490> Streamers : **${streamer}**\n
        🎮 En jeu : ** ${pjeu}**`,

			SI_REGION: [
				"Europe Centrale",
				"Europe de l'Ouest",
				"Brésil",
				"HongKong",
				"Japon",
				"Russie",
				"Singapour",
				"Sud de l'afrique",
				"Sydney",
				"Amérique de l'Est",
				"Amérique du Sud",
				"Amérique Cnetrale",
				"Amérique de l'Ouest"
			],
			SI_FIELDS: [
				`ID`,
				`Niveau de sécurité`,
				'Channel AFK',
				'Crée le',
				'Région',
				'Propriétaire',
				'Membres',
				'__**Emojis**__',
				'__**Rôles**__',
				'Salons'
			],
			SI_NOAFK: `Pas de salon AFK`,


			//SUggestion Command
			SUGGEST_DESCRIPTION: "Envoyez votre suggestion dans le salon dédié !",
			SUGGEST_SUCCESS: sugg_channel => `${success} | Votre suggestion est en cours de vote dans <#${sugg_channel.id}> !`,
			SUGGEST_FIELDS: [
				"Suggestion - ",
				"Auteur",
				"Date",
				"Contenu"
			],
			SUGGEST_NOCHAN: `${error} | Aucun salon de suggestions défini !`,

			//setsuggest Command
			SETSUGGEST_DESCRIPTION: `Défini le salon en tant que salon des suggestions !`,
			SETSUGGEST_SUCCESS: (the_channel, guild_data) => `${success} | Les suggestions s'enverront désormais dans ${the_channel.toString()} ! Tape \`${guild_data.prefix}configuration\` pour voir la nouvelle configuration !`,

			//Date Command
			DATE_MSG: 'Nous sommes le',
			DATE_DESCRIPTION: 'Donne le date actuelle',

			//Userinfo command
			UI_FIELDS: [
				"Cet utilisateur est un bot, impossible d'accéder aux stats de celui - ci.",
				"Connecté dans ",
				"Non connecté",
				"Pas de surnom",
				/*"Ne pas Déranger",
				"Inactif - AFK ",
				"En ligne",
				"Déconnecté",
				 */
				"Informations sur ",
				"Pseudo",
				"Tag",
				"Surnom",
				"ID",
				"Date d\'arrivée sur "
			],
			UI_DESCRIPTION: "Obtiens des informations sur un utilisateur !",

			//Giveaway
			GIVEAWAY_ERROR: messageID => `Pas de Giveaway trouver sur l'id ${messageID}, veuillez vérifier et réessayer`,
			GIVEAWAY_DESCRIPTION: 'Commande pour créer / supprimer / tirer au sort un nouveau gagnant',
			//Giveaway create
			GIVEAWAY_FIELDS: [
				'\n\n🎉🎉 **GIVEAWAY Fini** 🎉🎉',
				"Temps Restant **{duration}**!",
				"Réagis avec 🎉 pour participer!",
				"Bravo, {winners}! tu gagne **{prize}**!",
				"Giveaway annulé, pas de participants valides",
				"Fait par: {user}",
				"Gagnant(s)",
				"Finis dans",
				"secondes",
				"minutes",
				"heures",
				"jours",
			],
			//Giveaway Reroll
			GIVEAWAY_REROLL_SUCCESS: 'Nouveau Gagnant tiré au sort avec succés',
			//Giveaway Delete
			GIVEAWAY_DELETE_SUCCESS: 'Giveaway supprimé avec succés',
			//END GIVEAWAY

			//ReactRole command
			REACTROLE_ERROR: '${warn} | Je n\'arrive pas a trouver le message, veuillez réssayer',
			REACTIONROLE_SUCCESS1: guild_data => `${success} | Reaction-Role Activé ! Tapez  ${guild_data.prefix} react-role delete Pour le supprimer !`,
			REACTROLE_SUCCESS2: `${success} | Raction-role Désactivé !`,
			REACTROLE_NOEMOTE: `Veuillez donner un émoji standard valide, les émojis personnalisés ne marchent pas !!`,
			REACTION_DESCRIPTION: `Donnez un role lorsqu'un membre clique sur une réaction`,



			//Number Command
			NUMBER_TIME: [
				"heures | ",
				"minutes | ",
				"secondes | "
			],
			NUMBER_DESCRIPTION: 'Je choisis un nombre entre 0 et 5000, a vous de le trouver',
			NUMBER_INIT: `${success} | Nombre déterminé ! Vous pouvez commencer !`,
			NUMBER_NOFIND: the_number => `${error} | Personne n'a trouvé le nombre ! C'était ${the_number}`,
			NUMBER_SUP: contenu => `Le nombre que j'ai choisis est plus grand que ${contenu} !`,
			NUMBER_INF: contenu => `Le nombre que j'ai choisis est plus ptit que ${contenu} !`,
			NUMBER_FINISH: (message, the_number, convertMS, time, number_participants, essais, displayMembers) => `':tada: |  ${message.author} a trouvé le nombre ! C'était __** ${the_number}**__ !\n\n**Stats de la partie :**\n__**Temps**__: ${convertMS(time)} \n__**Nombre de participants**__ : ${number_participants} \n__**Nombre d\'essais**__ : ${essais} \n__**Participants**__ : \n ${displayMembers(message)} `,
			NUMBER_BUG: `Suite a des bugs, le number est limité qu'a une seule partie par serveur, finissez celle en cours pour en relancer une`,
			NUMBER_HELLO: 'Bonjour ',
			NUMBER_ERROR: `${warn} | Une partie est déja en cours sur ce serveur`,

			//Set Annonce
			SETANNONCES_SUCCESS: (the_channel, guild_data) => `${success} | Les annonces s'enverront dans **${the_channel.toString()}** ! Tape \`${guild_data.prefix}configuration\` pour voir la nouvelle configuration !`,
			SETANNONCES_DESCRIPTION: "Définis le salon ou les annonces seront effectuées avec la commande \`annonce\`",
			//Annonce Command
			ANNONCE_NOCHAN: guild_data => `${warn} | Veuillez définir un salon d'annonces avec \`${guild_data.prefix}setannonces\` !`,
			ANNONCE_ERROR:  ` ${warn} | Votre annonce ne doit pas dépasser 800 caractères`,
			ANNONCE_DESCRIPTION: 'Faites un annonce dans le salon définis avec la commande \`setannonce\`',
			ANNONCE_MENTION: 'Souhaitez vous que je mentionne ? [oui/non]',
			ANNONCE_MENTION2: 'Tape une des réponses suivantes : [here/every]',
			ANNONCE_NOTIME: ` ${warn} | Temps écoulé. Veuillez retaper la commande.`,
			ANNONCE_FIELDS: [
				"⚡ Annonce :",
				"Publiée : "
			],

			//Addrole Command
			ADDROLE_ERROR: 'Ce role n\'existe pas !',
			ADDROLE_ERROR2: 'La personne a déja ce role',
			ADDROLE_SUCCESS: (member, role) => `${member.user.tag} a désormais le role \`${role.name}\``,
			ADDROLE_DESCRIPTION: 'Donne un role a la personne mentionnée',

			//Delrole command
			//Addrole Command
			DELROLE_ERROR: 'Ce role n\'existe pas !',
			DELROLE_ERROR2: 'La personne n\as pas ce role',
			DELROLE_SUCCESS: (member, role) => `${member.user.tag} n\'as plus le role \`${role.name}\``,
			DELROLE_DESCRIPTION: 'Enleve un role a la personne mentionnée',

			//Ban command
			BAN_ERROR1: the_member => `${warn} | Une erreur est survenue, il faut que j'ai un role au dessus de ${the_member.user.name}!`,
			BAN_NOREASON: `Pas de raison`,
			BAN_BY: message => `| Banni par ${message.author.username}`,
			BAN_SUCCESS: the_member => `${success} | ${the_member.user.username} à bien été banni du serveur !`,
			BAN_LOG: (the_member, message) => `**${the_member.user.username}#${the_member.user.discriminator}** banni par **${message.author.username}#${message.author.discriminator}**`,
			BAN_DESCRIPTION: 'Bannis la personne mentionnée',

			//Banlist Command
			BANLIST_FIELDS: [
				"Trop de membres bannis",
				"Aucun utilisateur banni",
				"utilisateur(s) banni"
			],
			BANLIST_DESCRIPTION: 'Affiche la liste des membres bannis',

			//Clear Command
			CLEAR_DESCRIPTION: `Supprime le nombre de messages donné instantanément`,
			CLEAR_LOG: (args, message) => `**${message.author.username}#${message.author.discriminator}** a supprimé **${args[0]}** messages dans **${message.channel.name}** `,
			CLEAR_SUCCESS: args => `${success} | ${args[0]} messages supprimés`,
			CLEAR_0ERROR: `${warn} | Impossible de supprimer 0 message.`,
			CLEAR_INVALIDNB: `${warn} | Nombre invalide.`,

			//Kick command
			KICK_ERROR1: the_member => `${warn} | Une erreur est survenue, il faut que j'ai un role au dessus de ${the_member.user.name}!`,
			KICK_NOREASON: `Pas de raison`,
			KICK_BY: message => `| Exclu par ${message.author.username}`,
			KICK_SUCCESS: the_member => `${success} | ${the_member.user.username} à bien été Exclu du serveur !`,
			KICK_LOG: (the_member, message) => `**${the_member.user.username}#${the_member.user.discriminator}** exclu par **${message.author.username}#${message.author.discriminator}**`,
			KICK_DESCRIPTION: 'Exclus la personne mentionnée',

			//PErmissions Command
			PERMS_THEMSG: membre => `\n\nPermissions de ${membre.user.username}\n\n`,
			PERMS_MSG: (the_message, allowed, denied) => `${the_message} \n ${allowed} autorisées \n ${denied} interdites`,
			PERMS_DESCRIPTION: 'Affiche vos permissions ou les permissions d\'un membre !',

			//setsondage Command
			SETSOND_DESCRIPTION: `Défini le salon en tant que salon des sondages !`,
			SETSOND_SUCCESS: (the_channel, guild_data) => `${success} | Les sondages s'enverront désormais dans ${the_channel.toString()} ! Tape \`${guild_data.prefix}configuration\` pour voir la nouvelle configuration !`,

			//Sondage Command
			SOND_DESCRIPTION: `Envoyez votre sondage dans le salon dédié !`,
			SOND_MENTION: 'Souhaitez vous que je mentionne ? [oui/non]',
			SOND_MSG: 'Tape une des réponses suivantes : [here/every]',
			SOND_ERROR: `${warn} | Je ne peux pas écrire dans le salon sondage...`,
			SOND_FIELDS: [
				"📊 Sondage :",
				"Réagissez avec ",
				"ou"
			],
			SOND_NOCHAN: `${warn} | Aucun salon de suggestions défini !`,
			SOND_TIMEOUT: `${warn} Temps écoulé. Veuillez retaper la commande.`,

			//Everyrole Command
			EVERYROLE_DESCRIPTION: 'Donne un role a tous les membres du serveur',
			EVERYROLE_NOROLE: role => `${warn} | Aucun rôle trouvé pour ${role.toString()}`,
			EVERYROLE_FIELDS:`${success} | Ajout des rôles en cours...`,
			EVERYROLE_SPAM:'Pour éviter le spam de l\'API, l\'everyrole est limitée aux serveurs de moins de  100 membres',

			//8ball Command
			BALL_DESCRIPTION: 'Tire une réponse aléatoire pour répondre à vos questions !',
			BALL_REPLIES: [
				"Ca, c'est sur",
				"Mais c'était sur enfaite",
				"sans aucun doute.",
				"oui, j'en suis sur et certain !",
				"peut-être",
				"oui !",
				"non !",
				"des signes me font dire oui...",
				"demandez à nouveau plus tard :\\",
				"mieux vaut ne pas te le dire maintenant...",
				"je ne peux pas prédire maintenant.",
				"concentre toi et demandez à nouveau !",
				"ne compte pas la dessus.",
				"ma réponse est non.",
				"mes sources disent que non...",
				"oh... J'en doute !",
				"La réponse D"
			],

			//Ascii Command
			ASCII_DESCRIPTION: `Transforme votre texte en art ASCII`,
			ASCII_ERROR: `${warn} | Vous ne pouvez pas mettre d'émojis ou un nombre tout seul dans un ascii`,
			ASCII_CARACT: `${warn} | trop de caractères....`,
			ASCII_BUG: `${warn} | une erreur est survenue pendant la conversion...`,

			//Reset-config Command
			RCONFIG_DESCRIPTION: 'Reinitialise la configuration et les données de votre serveur !',
			RCONFIG_VERIF: `${warn} |  Êtes-vous sur de vouloir réinitaliser les données Atom du serveur ? Entrez "oui" ou "non". Toute la configuration et les données seront effacées`,
			RCONFIG_RESPONSE: `${warn} |  Répondez oui ou non !`,
			RCONFIG_SUCCESS: guild_data => `${success} | Configuration réinitialisée ! Tapez \`${guild_data.prefix}configuration\` pour voir la nouvelle configuration`,
			RCONFIG_CANCELED: `${success} | Action correctement annulée!`,
			RCONFIG_TIMEOUT: `${error} | Le temps est écoulé, veuillez recommencer !`,


			//Setlogs Command
			SETLOG_SUCCESS1: guild_data =>  `${success} | Logs activé ! Tapez \`${guild_data.prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETLOGS_DESCRIPTION: 'Définis le salon ou seront envoyés les logs',
			SETLOG_SUCCESS2: guild_data =>  `${success} | Logs désactivés ! Tapez \`${guild_data.prefix}configuration\` pour voir votre nouvelle configuration !`,
			//setreport Command
			SETREPORT_SUCCESS: (channel, prefix) =>  ` | Les signalements s'enverront désormais dans ${channel.toString()} ! Tape ${prefix}configuration pour voir la nouvelle configuration !`,

			//tickets command
			TICKETS_DESCRIPTION: 'Active ou désactive les tickets sur le serveur',
			TICKETS_ACTIV: guild_data => `${activate} les tickets son activés, tapez \`${guild_data.prefix}\`configuration pour voir la nouvelle configuration`,
			TICKETS_DESAC: guild_data => `${desactivate} les tickets son desactivés, tapez \`${guild_data.prefix}\`configuration pour voir la nouvelle configuration`,
			TICKETS_PLS: 'Oops, les tickets étaient introuvables sur ce serveur, veuillez refaire la commnde pour activer les tickets',
			//tweet command
			TWEET_CARACT: `${warn} votre tweet ne doit pas exeder 140 caracteres`,
			TWEET_DESCRIPTION: 'Créez un tweet en précisant le nom d\'utilisateur twitter et tweetez',

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "Je traduis votre texte !",
			TRANSLATE_USAGE: "translate [langues] [message]",
			TRANSLATE_EXAMPLES: "$translate fr-en Comment allez-vous ?",
			// Content
			TRANSLATE_LANGS: `${success} | La liste des langues vient de vous être envoyé par messages privés !`,
			// Errors
			TRANSLATE_ERR_LANG: (prefix) => `${error} | Veuillez entrer une langue ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_LANG1: (prefix, lang) => `${error} | La langue \`${lang}\` n'existe pas ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_ERR_MSG: `${error} | Veuillez entrer un texte à traduire !`,
			UTILS: {
				PLEASE_WAIT: `${load} | Veuillez patienter...`,
			},

			CREDITS_DESCRITPION: 'Page de remerciement',

			//Command Fields
			//Admin usage
			USAGE_AUTOROLE:"autorole [on/off] [roleMention/RoleName]",
			USAGE_CONFIGURATION:"configuration",
			USAGE_EVERYROLE:"everyrole [roleMention/RoleName]",
			USAGE_IGNORE:"ignore [ChannelMention]",
			USAGE_LEAVE:"leave",
			USAGE_RCONFIG:"reset-config",
			USAGE_SETANNONCES:"setannonces [ChannelMention]",
			USAGE_SETLOGS:"setlogs [ChannelMention]",
			USAGE_SETPREFIX:"setprefix [prefix]",
			USAGE_SETREPORT:"setreport [ChannelMention]",
			USAGE_SETSONDAGES:"setsondages [ChannelMention]",
			USAGE_SETSUGGESTION:"setsuggestions [ChannelMention]",
			USAGE_WELCOME:"welcome",
			USAGE_TICKETS: 'tickets',
			//Admin Exemple
			EXAMPLE_AUTOROLE:"$autorole on Communauté\n$autorole off",
			EXAMPLE_CONFIGURATION:"$configuration",
			EXAMPLE_EVERYROLE:"$everyrole @Membres\n$everyrole Membres",
			EXAMPLE_IGNORE:"$ignore #discution",
			EXAMPLE_LEAVE:"$leave",
			EXAMPLE_RCONFIG:"$reset-config",
			EXAMPLE_SETANNONCES:"$setannonces #annonces",
			EXAMPLE_SETLOGS:"$setlogs #bot-logs",
			EXAMPLE_SETPREFIX:"$setprefix a/",
			EXAMPLE_SETREPORT:"$setreport #staff",
			EXAMPLE_SETSONDAGES:"$setsondages #sondages",
			EXAMPLE_SETSUGGESTION:"$setsuggestions #suggestion",
			EXAMPLE_WELCOME:"$welcome",
			EXAMPLE_TICKETS: '$tickets',
			//FUn usage
			USAGE_8BALL:'8ball [Question]',
			USAGE_ASCII:'ascii [text]',
			USAGE_NUMBER: 'number',
			USAGE_TWEET:'',
			//fun Example
			EXAMPLE_8BALL:'$8ball baptiste a mis le feu ?',
			EXAMPLE_ASCII:'$ascii Bienvenue',
			EXAMPLE_NUMBER: '$number',
			EXAMPLE_TWEET: '$tweet Derp Je suis un chat',
			//general usage
			USAGE_ADDTIME: 'addtime [temps]',
			USAGE_BOTINFO: 'botinfo',
			USAGE_CALC: 'calc [opération]',
			USAGE_CINFO: 'cinfo [channelID]\n cinfo [channelMention]',
			USAGE_CREDITS: 'credits',
			USAGE_DATE: 'date',
			USAGE_HASTEBIN: 'hastebin [texte]',
			USAGE_HELP: 'help \n help [commande]',
			USAGE_INVITATIONS: 'invitations \ninvitations [@mention]',
			USAGE_INVITE: 'invite',
			USAGE_MC: 'membercount',
			USAGE_PING: 'ping',
			USAGE_QRCODE: 'qrcode [texte]',
			USAGE_REPORT:'report [@member] [raison]',
			USAGE_SETCOLOR: 'setcolor [colorName]',
			USAGE_SINFO: 'sinfo',
			USAGE_SUGGESTION: 'suggestion [texte]',
			USAGE_USERINFO: 'userinfo \nuserinfo [Mention] \nuserinfo [MembreId]',
			//General Example
			EXAMPLE_ADDTIME: '$addtime 2h\n addtime 2d',
			EXAMPLE_BOTINFO: '$botinfo',
			EXAMPLE_CALC: '$calc 2+2\n $calc 3x3',
			EXAMPLE_CINFO: '$cinfo 667035608262115338\n cinfo #general',
			EXAMPLE_CREDITS: '$credits',
			EXAMPLE_DATE: '$date',
			EXAMPLE_HASTEBIN: '$hastebin Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			EXAMPLE_HELP: '$help \n $help botinfo\n $help bi',
			EXAMPLE_INVITATIONS: '$invitations \ninvitations @Derp',
			EXAMPLE_INVITE: '$invite',
			EXAMPLE_MC: '$membercount',
			EXAMPLE_PING: '$ping',
			EXAMPLE_QRCODE: '$qrcode Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			EXAMPLE_REPORT:'$report @Derp Spma pub mp',
			EXAMPLE_SETCOLOR: '$setcolor blue\n$setcolor default',
			EXAMPLE_SINFO: '$sinfo',
			EXAMPLE_SUGGESTION: '$suggestion utiliser l\'autorole',
			EXAMPLE_USERINFO: '$userinfo \nuserinfo @Derp \nuserinfo 555429540613062656',
			//Usage Mod
			USAGE_ADDROLE: 'addrole [mention] [roleName]\naddrole [mention] [RoleId]',
			USAGE_ANNONCE: 'annonce [texte]',
			USAGE_BAN: 'ban [@mention] [reason]',
			USAGE_BANLIST: 'banlist',
			USAGE_CLEAR: 'clear [nombre]',
			USAGE_DELROLE: 'delrole [mention] [role]',
			USAGE_KICK: 'kick [@mention] [reason]',
			USAGE_PERMISSION: 'permissions [@member]',
			USAGE_SONDAGE:'sondage [text]',
			//Examples Mod
			EXAMPLE_ADDROLE: '$addrole @Derp Membre\n$addrole @Derp 613426529623605268',
			EXAMPLE_ANNONCE: '$annonce Nouveau Reglement',
			EXAMPLE_BAN: '$ban @Derp PubMp',
			EXAMPLE_BANLIST: '$banlist',
			EXAMPLE_CLEAR: '$clear 58',
			EXAMPLE_DELROLE: '$delrole @Derp Membre\n$delrole @Derp 613426529623605268',
			EXAMPLE_KICK: '$kick @Derp Insultes',
			EXAMPLE_PERMISSION: '$permissions @derp',
			EXAMPLE_SONDAGE:'sondage Une vidéo ce soir ?',
			//Usage utils
			USAGE_GIVEAWAY: 'giveaway create [temps] [nombre de gagnants] [prix] \n giveaway delete [MessageGiveawayId]\ngiveaway reroll [MessageGiveawayId]\ngiveaway end [MessageGiveawayId]',
			USAGE_REACTIONROLE: 'reactrole create [MessageID] [channel] [role] [emoji] \n reactrole delete [MessageID] [emoji]',
			//Examples Utils
			EXAMPLE_GIVEAWAY: 'giveaway create 1d 1w Nitro \n giveaway delete 719221638469517312\ngiveaway reroll 719221638469517312\ngiveaway end 719221638469517312',
			EXAMPLE_REACTIONROLE: 'reactrole create 719221640785035274 #roles notif 🔔 \n reactrole delete 719221640785035274 🔔',
		}
}

/**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		//if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case 'function': return value(...args);
			default: return value;
		}
	}

	convertMs(ms){
		var d, h, m, s;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return h + ' heure(s) ' + m + ' minute(s) ' + s + ' seconde(s)';
	}

}