// Connection to database
const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
      host: '127.0.0.1',
      // Your MySQL username below
      user: 'root',
      // Your MySQL password below if used, if not leave as is
      password: '',
      database: 'employees_db'
    },
    // console.log(`Connected to the employees_db database.`)
  );

  connection.connect(function (err) {
      if (err) {
        throw err;
      } else {
          console.log('Sucessfully connected to mysql!')
      }
  });

  module.exports = connection;