require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  console.log('message'); // Show that things are going through for the time being.
  if (msg.content === 'create') {
    const createPlanner = require('./functions/create_planner.js');
    var results = createPlanner.createplanner();
    console.log(results);
  }
});

client.login(process.env.DISCORD_TOKEN);
