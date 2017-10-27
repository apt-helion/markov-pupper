const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const CONFIG = require('../config.json');

exports.run = (client, message, args) => {
    // Google search
    if (args.length === 0) {
        message.reply(`Usage: ${CONFIG.command_prefix}google 'search terms'`); 
        return;
    }

    let search = args.join(" ");
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(search)}`;

    snekfetch.get(searchUrl).then(result => {
        // Cheerio lets us parse the HTML on our google result to grab the URL.
        let $ = cheerio.load(result.text);

        // This is allowing us to grab the URL from within the instance of the page (HTML)
        let googleData = $('.r').first().find('a').first().attr('href');

        // Now that we have our data from Google, we can send it to the channel.
        googleData = querystring.parse(googleData.replace('/url?', ''));
        message.channel.send(`Result found!\n${googleData.q}`);

    }).catch((err) => {
        message.channel.send('No results found!');
    });

};