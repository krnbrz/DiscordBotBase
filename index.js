const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

/**
 * Set up ALL THE THINGS \o/
 */
const client = {
    bot: new Discord.Client,
    commands: new Enmap(),
    aliases: new Enmap(),
    cooldowns: new Enmap(),
    config: require("./config.json"),
    logger: require("./util/logger.js")
};

client.logger.log("Starting up...");

/**
 * Load all ".js" files in ./events and listen for emits
 */
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const eventFile of eventFiles) {
    const event = require(`./events/${eventFile}`);

    client.bot.on(event.name, (...args) => event.execute(client, ...args));
}

client.logger.log(`Loaded ${eventFiles.length} events`);

/**
 * Load all ".js" files in ./commands and add to client.commands Enmap
 * Also check the file for assigned aliases and add to client.aliases Enmap
 */
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const commandFile of commandFiles) {
    const command = require(`./commands/${commandFile}`);
    client.commands.set(command.name, command);

    if (command.aliases && command.aliases.length > 0) {
        for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
        }
    }
}

client.logger.log(`Registered ${commandFiles.length} commands`);

/**
 * Lets gooooooooo
 */
client.logger.log("Logging in...");
client.bot.login(client.config.token);