const { SlashCommandBuilder } = require('discord.js');
const { zbd }  = require("@zbd/node");

const ZBD_API_KEY = '4DoIrzVXOiFrK8YSytRyvgPkbSOFr4kC';
const ZBD = new zbd(ZBD_API_KEY);

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies NOAH lightning address and Discord account.')
		.addStringOption(option =>
			option.setName('gamertag')
				.setDescription('The NOAH lightning address to verify (without @noah.me).')
				.setRequired(true)),
	async execute(interaction) {
		const gamertag = interaction.options.getString('gamertag').replace(/\s+/g, '');
		const data = await ZBD.validateLightningAddress(gamertag + "@noah.me");
		const role = await db.get(interaction.guildId + "_role");
		const member = interaction.member;

		if (!role) {
			await interaction.reply("An administrator hasn't configured a role to set when verified.");
			return;
		}
		
		if (member.roles.cache.some(roleCheck => roleCheck.name === role.name)) {
			await interaction.reply("You are already verified.")
			return;
		}

		await interaction.reply('Verifying lightning address...');

		if (!data.data.valid) {
			await interaction.editReply("The lightning address is invalid. Please try again.");
			return;
		}

		await member.roles.add(role.id);
		await interaction.editReply('Your lightning address verified! Role has been added.');
	},
};
