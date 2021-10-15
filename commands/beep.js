const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beep')
        .setDescription('Replies back with a Beep!'),
    async execute (interaction) {
        await interaction.reply('Beep!');
    }
};