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
connection.query('CREATE TABLE IF NOT EXISTS schedule (schedule_id int(10) NOT NULL AUTO_INCREMENT, admin_discord_id bigint(18) NOT NULL, guild_id bigint(18) NOT NULL, PRIMARY KEY(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  registered_users (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err){
    console.log('Checking for table 1');
    //else success code
  }else{
    console.log('Error while creating "schedule" table. ' + err);
    process.exit();
  }
});
connection.query('CREATE TABLE IF NOT EXISTS registered_users (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, PRIMARY KEY(id), FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  CREATE TABLE  user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err){
    console.log('Checking for table 2');
    //else success code
  }else{
    console.log('Error while creating "registered_users" table. ' + err);
    process.exit();
  }
});
connection.query('CREATE TABLE IF NOT EXISTS user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id), FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id));', function(err, rows, fields) {
   //CREATE TABLE  CREATE TABLE  user_times (id int(11) NOT NULL AUTO_INCREMENT, schedule_id int(10) NOT NULL, discord_schedule_user_id int(18) NOT NULL, day int(11) NOT NULL, hour int(11) NOT NULL, PRIMARY KEY(id) FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)); END
  if (!err){
    console.log('Checking for table 3');
    //else success code
  }else{
    console.log('Error while creating "user_times" table. ' + err);
    process.exit();
  }
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
    let results = createPlanner.createPlanner(msg.author.id, msg.guild.id);
    console.log(msg.author.id);
  }
  if (msg.content === '!destroy') {
    const destroyPlanner = require('./functions/destroy_planner.js');
    let results = destroyPlanner.destroyPlanner(msg.author.id);
    console.log(msg.author.id);
    console.log(msg.author.tag);
  }
  if (msg.content === '!display') {
    const displayPlanner = require('/functions/display_planner.js');
    let results = displayPlanner.displayPlanner(msg.author.id);
    console.log(msg.author.id);
  }
  if (msg.content === '!upload') {
    //msg.channel.send("Test", { file: "https://puu.sh/C711d/29d8f2f79e.png" });
    const embed = new Discord.RichEmbed()
      .setTitle("This is your title, it can hold 256 characters")
      .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setDescription("This is the main body of text, it can hold 2048 characters.")
      .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
      .setImage("http://i.imgur.com/yVpymuV.png")
      .setThumbnail("http://i.imgur.com/p2qNFag.png")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
      .addField("This is a field title, it can hold 256 characters",
        "This is a field value, it can hold 1024 characters.")
      /*
       * Inline fields may not display as inline if the thumbnail and/or image is too big.
       */
      .addField("Inline Field", "They can also be inline.", true)
      /*
       * Blank field, useful to create some space.
       */
      .addBlankField(true)
      .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

    msg.channel.send(embed);
    console.log("Created Message");
  }
  if (msg.content === '!edit'){
    console.log("trying");

    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setImage("http://puu.sh/Cb9Pd.png")

    let getid = msg.channel.fetchMessage("518415883371020299")
    .then(message => message.edit(embed));

    /*
    .then( message => message.edit("Again, NOPE", { file: "http://puu.sh/CaEJa.jpg"}))
    .then( console.log("finished edit"))
    .catch( error => console.log("nyet"));
    */
  }
});

//connect the discord bot
client.login(process.env.DISCORD_TOKEN);
