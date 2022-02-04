// Requires
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');

db.query = util.promisify(db.query);

// Question/Main Menu Arrays for Inquirer
const mainMenu = [
    {
        name: "mainMenuSelection",
        type: "list",
        message: "What would you like to do?",
        choices: [
            {name: "View All Employees", value: "VIEW_EMPLOYEES"},
            {name: "Add Employee", value: "ADD_EMPLOYEE"},
            {name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE"},
            {name: "View All Roles", value: "VIEW_ROLES"},
            {name: "Add Role", value: "ADD_ROLE"},
            {name: "View All Departments", value: "VIEW_DEPARTMENTS"},
            {name: "Add Department", value: "ADD_DEPARTMENT"}
        ]
    }
];

// Present Main Menu
async function startMainMenu() {
    const response = await inquirer
    .prompt(mainMenu)
    if (response.continue == 'VIEW_EMPLOYEES') {
        viewAllEmployees();
    }
}

// View all emps READ - `SELECT * FROM tablename`
async function viewAllEmployees() {
    const allEmployees = await db.query('SELECT * FROM employees');
    console.table(allEmployees);
}

// db.query('SELECT * FROM employees')
//     .then((results) => {
//         console.table(results);
//     });

// Add emp CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1
// Update emp

// View all roles READ - `SELECT * FROM tablename`
// Add role CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1 @ 35'
async function createRole() {

}

// View all depts READ - `SELECT * FROM tablename`
// Add dept CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)`

startMainMenu();