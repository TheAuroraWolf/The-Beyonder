console.clear();

const Discord = require("discord.js");
require('dotenv').config

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

const allIntents = new Intents(32767);

// Create a new client instance
const beyond = new Client({ intents: allIntents });

module.exports =  beyond;

const fs = require('fs');

const Omniscient = fs.readdirSync('./Omniscient').filter(file => file.endsWith('.js'));

const Abilities = fs.readdirSync('./Abilities').filter(file => file.endsWith('.js'));

beyond.commands = new Collection ();


//Event Handler
for (const file of Omniscient) {
	const event = require(`./Omniscient/${file}`);
	if (event.once) {
		beyond.once(event.name, (...args) => event.execute(...args));
	} else {
		beyond.on(event.name, (...args) => event.execute(...args));
	}
}

//Command Handler
for (const file of Abilities) {
	const command = require(`./Abilities/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	beyond.commands.set(command.name, command);
}

// Login to Discord with your client's token
beyond.login(process.env.token);

