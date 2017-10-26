const fs = require("fs");

exports.run = (client, message, args) => {
    // Removes everything in markov.json to start again
    newMarkov = {}
    let json = JSON.stringify(newMarkov); // Convert to json
    fs.writeFile('markov.json', json, 'utf8');
    console.log("Reloaded markov.json");  
};