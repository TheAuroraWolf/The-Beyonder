const { Message } = require('discord.js');

module.exports = {
	name: 'beyonderinfo',

	/**
	 *
	 * @param {Message} message Message Object from the textChannel it was sent from
	 *
	 */
	execute(message) {
		const msgSender = message.author;
		message.channel.send(` ${msgSender}, I am from beyond. I come from beyond to your small planet to comprehend your species' strange needs and desires.`);
	}
};
