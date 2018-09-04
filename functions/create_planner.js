var createPlanner = module.exports = {
  createplanner: function(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSERNAME,
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME,
    port : process.env.DBPORT
  });
  connection.connect();
    connection.query('select * from schedule ', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: \n', rows);
      else
        console.log('Error while performing Query.');
    });
    connection.end();
  }
}
return module.exports;
