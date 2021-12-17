const { Message, Client, MessageEmbed } = require('discord.js');
let args = [];

module.exports  = {
    name: 'erase',
    /**
     * @param  {Client} beyond
     * @param {Message} message
     */
    description: "Clear messages!",
    async  execute(message, args, beyond) {
       try {
           let erase = args[0];
           if(isNaN(erase) || parseInt(erase <= 0)) return message.reply("Cannot erase something that does not exist!");

           if(parseInt(erase) > 100) return message.reply("I refuse to erase history, I find enjoyment in the observation.");

           await message.channel.bulkDelete(parseInt(erase) + 1, true);

           await message.channel.send('Erased').then(msg => {
               setTimeout(() => {
                   msg.delete()
               }, 5000) // 5 seconds
               })
            } catch (e) {
            console.log(e)
         }
    }
}