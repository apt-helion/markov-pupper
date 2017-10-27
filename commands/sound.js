const SOUNDS = require('./sounds/sounds.json');

exports.run = (client, message, args) => {
    // Soundboard
    sound = args.join(" ");
    if (!(sound in SOUNDS)) {
        message.channel.send(`Sound: ${sound} not avaliable.`);
        return;
    }

    voiceChannel = message.member.voiceChannel;
    voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile(SOUNDS[sound]);
    }).catch(err => console.log(err));
    
};