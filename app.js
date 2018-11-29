//required for .env file
require('dotenv').config();
//check for table

///////////////////////
// START TABLE SETUP
///////////////////////

var mysql = require('mysql');
console.log("connect")
var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : process.env.DBUSERNAME,
  password : process.env.DBPASSWORD,
  database : process.env.DBNAME,
  port : process.env.DBPORT
});
connection.connect();
console.log("connected");
connection.query('CREATE TABLE IF NOT EXISTS schedule (schedule_id int(10) NOT NULL, admin_nickname varchar(254) NOT NULL, admin_discord_id bigint(18) NOT NULL, guild_id bigint(18) NOT NULL, PRIMARY KEY(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  registered_users (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err)
    console.log('Checking for table 1');
    //else success code
  else
    console.log('Error while creating table.' + err);
});
connection.query('CREATE TABLE IF NOT EXISTS registered_users (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, PRIMARY KEY(id), FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  CREATE TABLE  user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err)
    console.log('Checking for table 2');
    //else success code
  else
    console.log('Error while creating table.' + err);
});
connection.query('CREATE TABLE IF NOT EXISTS user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id), FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  CREATE TABLE  user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err)
    console.log('Checking for table 3');
    //else success code
  else
    console.log('Error while creating table.' + err);
});
connection.end();

console.log("Startup complete!")

///////////////////////
// END TABLE SETUP
///////////////////////

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
  if (msg.content === '!create') {
    const createPlanner = require('./functions/create_planner.js');
    let results = createPlanner.createplanner();
    console.log(msg.author.id);
  }
});

//connect the discord bot
client.login(process.env.DISCORD_TOKEN);
