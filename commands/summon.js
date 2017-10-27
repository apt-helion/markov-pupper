const CONFIG = require('../config.json');
const OWNER = CONFIG['owner_id'];

exports.run = (client, message, args) => {
    // Joins the voicechannel - owner only
    if (message.author.id === OWNER) {
        voiceChannel = message.member.voiceChannel;
        voiceChannel.join(err => console.log(err));
    } else {
        return;
    }
};