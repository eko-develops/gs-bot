const Client = require('./classes/Client');	//helper class

const client = new Client(process.env.MONGODB_SRV);	//create a client instance with a unique mongosrv

client.botStart();	//starts client connection from Client class
client.dbStart(); //starts the database connection from Database class that is accessable through the client class

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
