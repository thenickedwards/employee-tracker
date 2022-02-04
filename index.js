// Requires
const mysql = require('mysql2');

// Connection to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // Your MySQL username below
      user: 'root',
      // Your MySQL password if used, if not leave as is
      password: '',
      database: 'employees_db'
    },
    // console.log(`Connected to the classlist_db database.`)
  );

//   Pseudocode
// Present main menu
// View all emps READ - `SELECT * FROM tablename`
// View all depts READ - `SELECT * FROM tablename`
// View all roles READ - `SELECT * FROM tablename`
// Add emp CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1
// Add dept CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)`
// Add role CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1 @ 35'
// Update emp
// Update dept ?
// Update role ?