//Get the required classes
const Client = require('./classes/Client');
const Database = require('./classes/Database.js');

//Create a client instance
const client = new Client();
//Create a db instance with our mongoSRV
const db = new Database(process.env.MONGODB_SRV);	//create a database instance

client.start();	//starts client connection from Client class
db.start(); //starts the database connection from Database class

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
