//create a module.export that will be referenced in app.ja
var createPlanner = module.exports = {
  //create a function called "create Planner"
  createplanner: function(){
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
    connection.query('select * from schedule ', function(err, rows, fields) {
      //if it errors
      if (!err)
        console.log('The solution is: \n', rows);
        //else success code
      else
        console.log('Error while performing Query.');
    });
    connection.end();
  }
}
//used to push information to app.js
return module.exports;
