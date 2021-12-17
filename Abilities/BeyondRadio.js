const {
  Message,
  GuildMember
} = require('discord.js');
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const ytsr = require('yt-search');

// Options for the music player
const radioOptions = [
  'play', //0
  'stop', //1
  'resume', //2
  'queue', //3
  'join', //4
  'leave', //5
  'clearqueue' //6
];
const { generateDependencyReport } = require('@discordjs/voice');

console.log(generateDependencyReport());

module.exports = {
  name: 'beyonder',
  /**
   * @param {Message} _msg passes functions to _msg
   * @param {Array} args Array of arguments excluding the command
   */

  async execute(_msg, args) {
    const beyond = _msg.client; // Client
    const cmdSender = _msg.member; // GuildMember that sent the command
    const cl_Option = args[0]; // Command they want to execute
    const nameOfSong = allIn(args); // Name of the Song desired
    const song = await searchForSong(nameOfSong);

    // Get the first element of args and check to see if it is
    // any of the radio options
    switch (cl_Option) {
      case radioOptions[0]: // Play
        console.log('This is the play function');
        play(cmdSender, song);
        break;
      case radioOptions[1]: // Stop
        break;

      case radioOptions[2]: // resume
        break;
        
      case radioOptions[3]: // Queue
        break;

      case radioOptions[4]: // Join
        break;

      case radioOptions[5]: // Leave
        break;

      case radioOptions[6]: // Clear Queue
        break;

      default:
        console.log('I couldn\'t understand what you were asking');
        break;
    }
    
  }
}

/**
 * @param {Array} array Array of items that will become a single string 
 * @returns {String} A string of the elements in the array
*/
function allIn(array) {
  let stringed = array[0];
  for (let i = 1; i < array.length; i++) {
    stringed += ` ${array[i]}`;
  }
  return stringed;
}

/**@param {GuildMember} sender The person who called this command*/
function play(sender, song){
  if(!sender.voice.channel) return console.log('The sender is not in a voice channel');
  
  const connection = joinVoiceChannel({
    channelId: sender.voice.channelId,
    guildId: sender.guild.id,
    adapterCreator: sender.guild.voiceAdapterCreator,
  });

  const stream = ytdl(song.videoURL, { filter: 'audioonly' });
  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
  const player = createAudioPlayer();

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => connection.destroy());
}

async function searchForSong(nameOfSong){
  const results = await ytsr(nameOfSong);
  const video = results.videos.shift();

  return {videoURL:video.url, videoTitle: video.title}
}