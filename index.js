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
            {name: "Add Department", value: "ADD_DEPARTMENT"},
            {name: "Quit", value: "QUIT"}
        ]
    }
];

const addEmployeeQuestions = [
    {
        name: "employeeeFirstName",
        type: "input",
        message: "What is this employee's first name?"
    },
    {
        name: "employeeeLastName",
        type: "input",
        message: "What is this employee's last name?"
    },
    {
        name: "employeeeRole",
        type: "input",
        message: "What is this employee's role?"
    },
    {
        name: "employeeeManager",
        type: "input",
        message: "What is this id of this employee's manager?"
    }
];

const addRoleQuestions = [
    {
        name: "roleTitle",
        type: "input",
        message: "What is the title of this role?"
    },
    {
        name: "roleSalary",
        type: "input",
        message: "What is the salary of this role?"
    },
    {
        name: "roleDepartment",
        type: "input",
        message: "Which department is appropriate this role?",
        choices: departmentArray
    }
]

const addDepartmentQuestions = [
    {
        name: "departmentName",
        type: "input",
        message: "What is the name of this department?"
    }
]

// Present Main Menu
async function startMainMenu() {
    const response = await inquirer
    .prompt(mainMenu)
    // console.log(response);

    // IF VIEW ALL EMPS
    if (response.mainMenuSelection == 'VIEW_EMPLOYEES') {
        await viewAllEmployees();
        startMainMenu();
    }
    // IF ADD EMP
    if (response.mainMenuSelection == 'ADD_EMPLOYEE') {
        await addEmplolyee();
        startMainMenu();
    }
    // IF UPDATE EMP
    
    // IF VIEW ALL ROLES
    if (response.mainMenuSelection == 'VIEW_ROLES') {
        await viewAllRoles();
        startMainMenu();
    }
    // IF ADD ROLE

    // IF VIEW ALL DEPTS
    if (response.mainMenuSelection == 'VIEW_DEPARTMENTS') {
        await viewAllDepartments();
        startMainMenu();
    }
    // IF ADD DEPTS
    if (response.mainMenuSelection == 'ADD_DEPARTMENT') {
        await addDepartment();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'QUIT') {
        console.log('Thanks for using the Employee Tracker and have a great day!')
        process.exit();
    }
}

// View all emps READ - `SELECT * FROM tablename`
async function viewAllEmployees() {
    const allEmployees = await db.query('SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS Name, employees.role_id AS Role, employees.manager_id AS Manager FROM employees');
    
    console.table(allEmployees);
}

// SELECT e.ID, e.name AS Employee, s.name AS Supervisor FROM employee e INNER JOIN employee s ON s.ID = e.supervisorID ORDER BY e.ID;

// ALT?
// db.query('SELECT * FROM employees')
//     .then((results) => {
//         console.table(results);
//     });

// ADD emp CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1
// BROKEN!!! :*(
async function addEmplolyee() {
    await inquirer
        .prompt(addEmployeeQuestions)
        .then(function(data){
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${data.employeeeFirstName}, ${data.employeeeLastName},  ${data.employeeeRole},  ${data.employeeeManager});`);
        })
}
// UPDATE emp

// ROLES ROLES ROLES
// VIEW all roles READ - `SELECT * FROM tablename`
async function viewAllRoles() {
    const allRoles = await db.query('SELECT * FROM roles');
    console.table(allRoles);
}
// ADD role CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)` + more info in hwdemo1 @ 35'

// DEPTS DEPTS DEPTS
// VIEW all depts READ - `SELECT * FROM tablename`
async function viewAllDepartments() {
    const allDepartments = await db.query('SELECT * FROM departments');
    console.table(allDepartments);
}
// ADD dept CREATE - `INSERT INTO tablename (col1, col2) VALUES (val1, val2)`
async function addDepartment() {
    await inquirer
        .prompt(addDepartmentQuestions)
        .then(function(data){
            db.query(`INSERT INTO departments (name) VALUES (?)`, data.departmentName);
        })
}

startMainMenu();