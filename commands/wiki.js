const wiki = require("wikijs").default;
const CONFIG = require('../config.json');

exports.run = (client, message, args) => {
    // Querys wikipedia for arg
    if (args.length === 0) {
        message.reply(`Usage: ${CONFIG.command_prefix}wiki 'search terms'`); 
        return;
    }

    let query = args.join(" ");
    // Sends first paragraph of summary
    wiki().page(query).then(page => {
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
    });
    
};