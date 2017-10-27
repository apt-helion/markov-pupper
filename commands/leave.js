const CONFIG = require('../config.json');
const OWNER = CONFIG['owner_id'];

exports.run = (client, message, args) => {
    // leave the voicechannel - owner only
    if (message.author.id === OWNER) {
        voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            connection.disconnect();
        });
    } else {
        return;
    }
};