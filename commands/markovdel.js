const fs = require("fs");
let MARKOV = require('../markov.json')

exports.run = (client, message, args) => {
    // Removes the user from markov to start again.
    user = message.author.id;

    delete MARKOV[user];
    let json = JSON.stringify(MARKOV); // Convert to json
    fs.writeFile('markov.json', json, 'utf8');
    message.reply(`Your messages have been deleted.`);
};