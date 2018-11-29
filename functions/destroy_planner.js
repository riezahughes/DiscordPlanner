//create a module.export that will be referenced in app.ja
var destroyPlanner = module.exports = {
  //create a function called "destroy Planner"
  destroyPlanner: function(usr){
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
    connection.query('delete from schedule where admin_discord_id='+usr, function(err, rows, fields) {
      //if it errors
      if (!err)
        console.log('Schedule Successfully Ended.');
        //else success code
      else
        console.log('Error while trying to end Schedule.');
    });
    connection.end();
  }
}
return module.exports;
