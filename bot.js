//Get the required classes
const { Client, Intents, Collection } = require('discord.js');

//Create a client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

require('dotenv').config(); //enviroment variables

const fs = require('fs');	//used to read commands folder

// eslint-disable-next-line no-undef
client.commands = new Collection();

fs.readdirSync('./commands').filter( file => file.endsWith('.js')).forEach( file => {
	const command = require(`./commands/${file}`);

	console.log(`Command ${command} loaded`);
	client.commands.set(command.data.name, command);
}); //read the commands folder, filter any files that dont end with js, 

fs.readdirSync('./events').filter( file => file.endsWith('.js')).forEach( file => {
	const event = require(`./events/${file}`);

	console.log(`Event ${event} loaded`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}); //read the events folder, filter out files that dont have js extenstion, depending on the event type, fire it


const connectDb = require('./mongodb.js');

connectDb();

//When client is ready and connected
// client.once('ready', () => {
// 	console.log('GSBOT is logged in..');
// });

//The clients listens on the event that a message is sent from any channel
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);	//fetch the command in the collection

	if (!command) return;	//if the command doesnt exist, exit

	try {
		await command.execute(interaction);	//if the command does exist, call the commands execute method and pass in the interaction
	} catch (error) {	//catch any errors and reply back with an error
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Logs the client in, establishing a websocket connection to Discord
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login
client.login(process.env.TEST_BOT_TOKEN);