

const mysql = require("mysql");


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'inkehnashod',
    database: 'employee_managerdb'
});

con.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + con.threadId);
  });
  
  module.exports = con;