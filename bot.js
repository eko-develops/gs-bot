//Get the required classes
const { Client, Intents } = require('discord.js');

//Create a client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

require('dotenv').config();
// const fs = require('fs');	//used to read commands folder

const connectDb = require('./mongodb.js');

connectDb();

//When client is ready and connected
client.once('ready', () => {
	console.log('GSBOT is logged in..');
});

//The clients listens on the event that a message is sent from any channel
client.on('interactionCreate', async interaction => {

	if( !interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

//Logs the client in, establishing a websocket connection to Discord
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login
client.login(process.env.TEST_BOT_TOKEN);