//still getting functions set up correctly. 
const Discord = require('discord.js');
const client = new Discord.Client();
var token = require("./config.js");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'create') {
    token.scheduler("create");
    msg.reply('created');
    console.log(msg);
    //console.log(token.selectQuery());
  }
});

client.login(token.theToken());
