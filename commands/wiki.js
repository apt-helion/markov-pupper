const wiki = require("wikijs");
const CONFIG = require('../config.json');

exports.run = (client, message, args) => {
    // Querys wikipedia for arg
    if (args.length === 0) {
        message.reply(`Usage: ${CONFIG.command_prefix}wiki 'search terms'`); 
        return;
    }

    let query = args.join(" ");
    // Sends first paragraph of summary
    new wiki().search(query).then(data => {
        new wiki().page(data.results[0]).then(page => {
            page.summary().then(summary => {
                let sumText = summary.toString().split('\n');
                let continuation = () => {
                    let paragraph = sumText.shift();
                    if (paragraph) {
                        message.channel.send(paragraph);
                    }
                };
                continuation();
            });
        })
    }).catch(err => console.log(err));

};