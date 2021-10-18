const Client = require('./classes/Client');	//helper class

const client = new Client(process.env.MONGODB_SRV);	//create a client instance with a unique mongosrv

client.botStart();	//starts client connection from Client class
client.dbStart(); //starts the database connection from Database class that is accessable through the client class
