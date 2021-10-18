module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        console.log(`READY EVENT FIRED! Logged in as ${client.user.tag}`);
    },
};