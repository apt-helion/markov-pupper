const SOUNDS = require('./sounds/sounds.json');

exports.run = (client, message, args) => {
    // Soundboard
    sound = args.join(" ");
    if (!(sound in SOUNDS)) {
        message.channel.send(`Sound: ${sound} not avaliable.`);
        return;
    }

    let voiceChannel = message.member.voiceChannel;
    voiceChannel.join().then(connection => {
        connection.playFile(SOUNDS[sound]);
    }).catch(err => console.log(err));
    
};