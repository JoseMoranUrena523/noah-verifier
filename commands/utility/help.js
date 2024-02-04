const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gives you a tutorial on how to setup NOAH Verifier.'),
	async execute(interaction) {
		await interaction.reply('**Instructions:**\n\n1. Have a user with the "Manage Roles" permission use the command /setrole to set a role given to users when their gamertag is verified.\n2. Have the user do /verify and they will receive your set role once their lightning address has been verified!\n\nVery simple, right? This bot will be updated regularly for API changes and Discord.js changes, and to give you an extra feature!\n***By: @coffeel.arkoburger***');
	},
};