const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

// Config stuff
const CONFIG = require('./config.json');
const OWNER = CONFIG['owner_id'];
const TOKEN = CONFIG['token'];
const PREFIX = CONFIG['command_prefix'];

// Markov messages
let MARKOV = require('./markov.json')

client.on('ready', () => {
    // Start up procedures
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', (message) => {
    // Do nothing if bot and save message if it is not a command
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) {
        markov(message); 
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

const markov = (message) => {
    // Pushes message to markov.json
    user = message.author.id;
    if (user in MARKOV) {
        MARKOV[user].push(message.content);
    } else {
        MARKOV[user] = [message.content];
    }

    let json = JSON.stringify(MARKOV); // Convert to json
    fs.writeFile('markov.json', json, 'utf8');
    console.log(`Saved ${user}\'s message:\n${message.content}`);
};

client.login(TOKEN);
