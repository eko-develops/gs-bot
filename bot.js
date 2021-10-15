//Get discord.js 
const Discord = require('discord.js');
//Create a client object from the Discord object
const client = new Discord.Client();
//Makes all .env variables enviroment variables that can be used with process
// https://nodejs.org/api/process.html
require('dotenv').config();
const fs = require('fs');

const connectDb = require('./mongodb.js');

connectDb();

//Read commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


//For the prefix. Future-proofing
const pf = '~';



//When client is ready and connected
client.on('ready', () => {
	console.log('GSBOT is logged in..');
});


//The clients listens on the event that a message is sent from any channel
client.on('message', (message) => {

	/* Guard clauses
		*/
	// //If the message does not start with the prefix do nothing
	// if (!message.content.startsWith(pf)) return;
	// //If the message comes from a bot do nothing
	// if (message.author.bot) return;
	if(!message.content.startsWith(pf) || message.author.bot) {
		return;
	}


	/* Command Parser
			?ping pong pang   =>   command = ping    args = [pong, pang];
	*/
	//Slice the prefix off the message
	const commandBody = message.content.slice(pf.length);
	//Split the message into sub-strings. Makes a split wherever there is a space
	const args = commandBody.split(' ');
	//Get the first element in the sub-string array as the command and lowercase it
	const command = args.shift().toLowerCase();

	//When a user sends a message through DMs to the bot
	//If the message was sent through DMs
	if( message.channel.type == 'dm' ) {
		//Status Command
		if( command === `check` ){
				message.reply('hi');
		}

		if( command === `commands` ){
				if( args.length > 0 ) {

						return message.author.send(`Hey ${message.author}, this command doesn't take any arguments! Try ${pf}commands`);
		
					} else if( args.length == 0 ) {
		
							const commandsEmbed = {
								title: 'Here are a list of commands you can use: ',
								description: '**!status [order number] [Unique ID]** \n  Check your order status. Example: !status 123456 GS-aaa1231 \n \n **!status help**  \n How to find your UNIQUE ID.',
		
							};
							message.author.send({
								embed: commandsEmbed
							});
				}
			} ////end commands


			if( command === 'status' ){
				
				//If there are no arguments
				if(!args.length){

						return message.author.send(`Hey ${message.author}, you didn't provide any arguments! Need help? type ${pf}status help`);

						//~status help
			} else if( args.length == 1 ){

						if(args[0] === 'help'){

								const commandEmbed = {
										title: `How to use the ${pf}status command`,
										description: `2 arguments are needed to give you the current status of your order \n \n Please use the following format when using the command \n **${pf}status [Order Number] [Unique ID]** \n\n Example: ~status 123456 GS-aaa1231`,
									};
				
									message.author.send({
										embed: commandEmbed
									});
				
				
									const orderNumberEmbed = {
										title: '[Order Number]',
										description: `Obtain your order number in the receipt that was emailed after placing your order. If you didn\'t receieve the email, please check your spam folder or email us at ${process.env.SUPPORT_EMAIL}`,
									};
				
									message.author.send({
										embed: orderNumberEmbed
									});
				
									const uniqueIDEmbed = {
										title: '[Unique ID]',
										description: `You can get your unique user ID by logging into the website and visitng the account page here: ${process.env.ACCOUNT_URL} \n After visiting the page, your unique ID will be the given in the first box starting with **GS**`,
									};
				
									message.author.send({
										embed: uniqueIDEmbed
									});
							} else {

								return message.author.send('You are missing one more argument. Type !status help on how to use the command.');

							}

						} else if( args.length === 2) {

								//The order number
								const orderNumber = args[0];

								//Format the user ID. This is meta data for the customer in WP
								const userID = args[1].split('-');

								//Send a waiting message
								const waitingEmbed = {
										description: 'Hang On! We\'re looking up the information right now',
								};
				
								message.author.send({
										embed: waitingEmbed
								});

								getOrderStatus(orderNumber, userID)
								.then( orderStatus => {
										message.author.send(orderStatus);
								});


						}
				




		} else {
			return
	}
	}//end message.channel.type = 'dm'

	//Command handling
	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command === 'dadjoke') {
		client.commands.get('dadjoke').execute(message, args);
	} else if (command === 'roll') {
		client.commands.get('roll').execute(message, args);
	} else if (command === 'commands') {
		client.commands.get('commands').execute(message, args);
	} else {
		return message.channel.send(`${message.author} that is not a valid command. Use \`\`${pf}commands\`\` for commands.`);
	}


});

//Logs the client in, establishing a websocket connection to Discord
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login
client.login(process.env.TEST_BOT_TOKEN);