const {Client} = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
  /**@param {Client} beyond Client from index.js */
	execute(beyond) {
		console.log(`I come from The Beyond.`);
	},
};
