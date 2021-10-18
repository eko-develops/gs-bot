require('dotenv').config(); //enviroment variables
const Discord = require('discord.js');
const fs = require('fs');	//used to read commands folder


class Client extends Discord.Client {
    constructor () {
        super({ intents: [Discord.Intents.FLAGS.GUILDS]});

        this.commands = new Discord.Collection();
    }


    /**
     * Reads commands folder and loads commands.
     * Reads events folder and loads events.
     * Fires Client.login after loading commands and events.
     */
    start () {
        
        fs.readdirSync('./commands').filter( file => file.endsWith('.js')).forEach( file => {
            const command = require(`../commands/${file}`);

            console.log(`Command ${command} loaded`);
            this.commands.set(command.data.name, command);
        }); //read the commands folder, filter any files that dont end with js, 
        console.log('commands loaded...');
        
        
        fs.readdirSync('./events').filter( file => file.endsWith('.js')).forEach( file => {
            const event = require(`../events/${file}`);
            
            console.log(`Event ${event} loaded`);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }); //read the events folder, filter out files that dont have js extenstion, depending on the event type, fire it
        console.log('events loaded...');
        
        this.login(process.env.TEST_BOT_TOKEN);
    }


}

module.exports = Client;