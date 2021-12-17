const {
	prefix
} = require('../config.json')

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(message) {
		const beyond = message.client;
		if (message.author.bot || !message.guild) return
		
		const [cmd, ...args] = message.content
			.slice(prefix.length)
			.trim()
			.split(" ");

		const command = beyond.commands.get(cmd)

		if (!command) return;

		try{
			await command.execute(message, args, beyond)
		} catch (err){
			console.log(err);
		}

	}
}