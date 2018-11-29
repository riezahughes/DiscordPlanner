//create a module.export that will be referenced in app.ja
var createPlanner = module.exports = {
  //create a function called "create Planner"
  createPlanner: function(id, gid){
    console.log(id + " " + gid);
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
  connection.query('select * from schedule where admin_discord_id='+id, function(err, rows, fields) {
    //if it errors
    if (!err){
      //else success code
      if(rows.length > 0){
        console.log("Account has a schedule already.");
        connection.end();
      }else{
      connection.query('insert into schedule (admin_discord_id, guild_id) values('+id+','+gid+')', function(err, rows, fields) {
        //if it errors
        if (!err){
          console.log('scheduler created');
          connection.end();
          //else success code
        }else{
          console.log('Error while performing Query.' +err);
          connection.end();
        }

      });
    }
    }else{
      console.log('Scheduler cannot create: '+err)
    }
  });

  }

}
//used to push information to app.js
return module.exports;
