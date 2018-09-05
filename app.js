//required for .env file
require('dotenv').config();

//include discord.js
const Discord = require('discord.js');

//create new discord object
const client = new Discord.Client();

//when the discord bot connects...
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//when the bot recieves a message...
client.on('message', msg => {
  console.log('message'); // Show that things are going through for the time being.
  if (msg.content === 'create') {
    const createPlanner = require('./functions/create_planner.js');
    var results = createPlanner.createplanner();
    console.log(results);
  }
});

//connect the discord bot
client.login(process.env.DISCORD_TOKEN);
