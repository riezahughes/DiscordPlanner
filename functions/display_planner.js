//create a module.export that will be referenced in app.ja
var displayPlanner = module.exports = {
  //create a function called "display Planner"
  displayPlanner: function(usr){
  var mysql = require('mysql');
  //connect using mysql details of your localhost
  var connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSERNAME,
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME,
    port : process.env.DBPORT
  });
  connection.connect();
  //run your mysql query
    connection.query('select * from schedule where (admin_discord_id, guild_id) values('+id+','+gid+')', function(err, rows, fields) {
      //if it errors
      if (!err)
        console.log('No such schedule exists.');
        //else success code
      else
        console.log('Planner displayed successfully.');
    });
    connection.end();
  }
}
return module.exports;
