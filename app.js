const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  console.log('message'); // Show that things are going through for the time being.
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
token = require("./discord.js");
client.login(token.theToken());
