module.exports = {
    name: "ready",

    async execute(client) {
        client.logger.log(`Logged in as ${client.bot.user.tag} on ${client.bot.guilds.size} guilds`);
        client.logger.log(`Serving ${client.bot.users.size} users in ${client.bot.channels.size} channels`);

        client.bot.user.setStatus("available");

        const updatePresence = () => {
            client.bot.user.setActivity(`${client.bot.guilds.size} servers | ${client.config.prefix}help`, { type: "WATCHING" }).catch(() => { 
                client.logger.error("Failed to set bot activity!");
            });
            setInterval(updatePresence, 10 * 60 * 1000);
        };
        updatePresence();
    }
};