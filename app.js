const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NDg1NDg1NzE0OTMxMzE4Nzk0.DmxR_w.wurK8se9T6gHIGANyGVaALFn4SQ');
