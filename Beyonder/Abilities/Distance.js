
module.exports = ({
	name: "distance",
	description: "Shows the ping of the bot!",
	permission: "SEND_MESSAGES",
	async execute( message, arg, beyond) {
		const msg = await message.reply(`Ping: ${beyond.ws.ping} ms.`);
	}
});
