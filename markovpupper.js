const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

// Config stuff
const CONFIG = require('./config.json');
const TOKEN = CONFIG['token'];
const PREFIX = CONFIG['command_prefix'];

client.on('ready', () => {
    // Start up procedures
    let user = client.user;
    user.setGame(CONFIG['game']);

    console.log(`
    Connected!  markov-pupper v0.2.2
    Bot: <@${user.id}>${user.username}#${user.discriminator}

    Options: 
        Command prefix: ${PREFIX}
        Game: ${CONFIG['game']}
    `);
});

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) {
        swearDetect(message);
        return;
    }

    // Get command and arguments
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

const swearDetect = message => {
    // Don't swear if you wanna not go to fucking jail kids
    const swears = ['heck', 'frick', 'darn'];
    const replies = [
        'please do not hecking swear',
        'hey! Don\'t say s-swears'
    ];
    if (swears.some(word => message.content.includes(word))) {
        message.reply(replies[Math.floor(Math.random()*replies.length)]);
    }
};

client.login(TOKEN);
