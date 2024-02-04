const { SlashCommandBuilder } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unverify')
		.setDescription('Unlinks the NOAH lightning address set to your Discord.'),
	async execute(interaction) {
    const member = interaction.member;
    const role = await db.get(interaction.guildId + "_role");

    if (member.roles.cache.some(checkRole => checkRole.name === role.name)) {
      await member.roles.remove(role.id)
		  await interaction.reply('NOAH lightning address has been removed!');
      return;
    }

    await interaction.reply('You are not verified.');
	},
};
