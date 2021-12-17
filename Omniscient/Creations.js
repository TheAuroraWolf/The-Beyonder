const { GuildMember, MessageEmbed } = require('discord.js');
const channelID = '811379137766883339';

module.exports = {
	name: 'guildMemberAdd',
	/** @param {GuildMember} guildMember GuildMember that recently joined the guild */
	execute(guildMember) {
		let thisEmbed = createEmbed(guildMember);

		const channel = guildMember.client.channels.cache.get(channelID);
		channel.send({ embeds: [thisEmbed] });
	}
};

/** @param {GuildMember} guildMember GuildMember that recently joined the guild */
function createEmbed(guildMember) {
	const myEmbed = new MessageEmbed()
		.setTitle(`Welcome To ${guildMember.guild.name}`)
		.setThumbnail(
			guildMember.user.displayAvatarURL({ dynamic: true, size: 512 })
		)
		.setDescription(
			`<@${guildMember.user.id}>, I am the Beyonder, **${guildMember.guild.name}** spawned from the imagination of The Beyonder and the power of the Beyond Realm `
		)
		// You Can Add More Fields If You Want
		.setFooter(
			`Welcome ${guildMember.user.username}#${guildMember.user.discriminator}`,
			guildMember.user.displayAvatarURL({ dynamic: true, size: 512 })
		)
		.setColor('RANDOM');
	return myEmbed;
}
