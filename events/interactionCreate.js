module.exports = {
    name: 'interactionCreate',
    async execute (interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);	//fetch the command in the collection
    
        if (!command) return;	//if the command doesnt exist, exit
    
        try {
            await command.execute(interaction);	//if the command does exist, call the commands execute method and pass in the interaction
        } catch (error) {	//catch any errors and reply back with an error
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};