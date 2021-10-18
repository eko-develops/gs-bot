//Get the required classes
const { Client, Intents, Collection } = require('discord.js');

//Create a client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

require('dotenv').config(); //enviroment variables

const fs = require('fs');	//used to read commands folder

// eslint-disable-next-line no-undef
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js')); //read the commands folder and filter out files that dont have js extenstion

//Set commands to the client.commands collection
for (const file of commandFiles) {

	const command = require(`./commands/${file}`);

	client.commands.set(command.data.name, command);
}

const connectDb = require('./mongodb.js');

connectDb();

//When client is ready and connected
client.once('ready', () => {
	console.log('GSBOT is logged in..');
});

//The clients listens on the event that a message is sent from any channel
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Logs the client in, establishing a websocket connection to Discord
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login
client.login(process.env.TEST_BOT_TOKEN);