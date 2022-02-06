// Requires
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');

db.query = util.promisify(db.query);

// Arrays to display existing data
var departmentsArray = [
    {name: "Engineering", value: 1},
    {name: "Legal", value: 2},
    {name: "Finance", value: 3},
    {name: "Sales", value: 4}
]

var rolesArray = [
    {name: "Lead Engineer", value: 1},
    {name: "Software Engineer", value: 2},
    {name: "Lawyer", value: 3},
    {name: "Legal Team Lead", value: 4},
    {name: "Account Manager", value: 5},
    {name: "Salesperson", value: 6},
    {name: "Accountant", value: 7},
]

var newRoleID = rolesArray.length+1;

var employeesArray = [
    {name: "Mike Chan", value: 1},
    {name: "Ashley Rodriguez", value: 2},
    {name: "Kevin Tupik", value: 3},
    {name: "Kunal Singh", value: 4},
    {name: "Malia Brown", value: 5},
    {name: "Sarah Lourd", value: 6},
    {name: "Tom Allen", value: 7},
]

var newEmployeeID = employeesArray.length+1;

// Question Arrays for Inquirer
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
        type: "list",
        message: "What is this employee's role?",
        choices: rolesArray
    },
    {
        name: "employeeeManager",
        type: "list",
        message: "What is this id of this employee's manager?",
        choices: employeesArray
    }
];

const updateEmployeeRoleQuestions = [
    {
        name: "updateEmployee",
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: employeesArray
    },
    {
        name: "updateRole",
        type: "list",
        message: "Which role do you want to assign to this employee??",
        choices: rolesArray
    }
]

const addRoleQuestions = [
    {
        name: "roleTitle",
        type: "input",
        message: "What is the title of this role?"
    },
    {
        name: "roleSalary",
        type: "input",
        message: "What is the salary of this role? (Enter as whole number with no special characters, e.g. $50,000 = 50000.)"
    },
    {
        name: "roleDepartment",
        type: "list",
        message: "Which department is appropriate this role?",
        choices: departmentsArray
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

    if (response.mainMenuSelection == 'VIEW_EMPLOYEES') {
        await viewAllEmployees();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'ADD_EMPLOYEE') {
        await addEmployee();
        startMainMenu();
    }
    // TODO: IF UPDATE EMP
    if (response.mainMenuSelection == 'UPDATE_EMPLOYEE_ROLE') {
        await updateEmployeeRole();
        startMainMenu();
    }


    if (response.mainMenuSelection == 'VIEW_ROLES') {
        await viewAllRoles();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'ADD_ROLE') {
        await addRole();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'VIEW_DEPARTMENTS') {
        await viewAllDepartments();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'ADD_DEPARTMENT') {
        await addDepartment();
        startMainMenu();
    }

    if (response.mainMenuSelection == 'QUIT') {
        console.log('Thanks for using the Employee Tracker and have a great day!')
        process.exit();
    }
}

// EMPLOYEES FUNCTIONS
// View all employees
async function viewAllEmployees() {
    const allEmployees = await db.query('SELECT employees.id, employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id INNER JOIN roles ON roles.id=employees.role_id INNER JOIN departments ON (departments.id = roles.department_id)');
    
    console.table(allEmployees);
}

// Add employee
async function addEmployee() {
    await inquirer
        .prompt(addEmployeeQuestions)
        .then(function(data){

            const newEmployee = {};
            newEmployee["name"] = `${data.employeeeFirstName} ${data.employeeeLastName}`;
            newEmployee["value"] = newEmployeeID;
            employeesArray.push(newEmployee);

            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.employeeeFirstName, data.employeeeLastName, data.employeeeRole, data.employeeeManager]);
        })
}
// UPDATE emp
async function updateEmployeeRole() {
    await inquirer
        .prompt(updateEmployeeRoleQuestions)
        .then(function(data){
            console.log('updateEmployeeRole is running!')
            console.log(data)

            db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [data.updateRole, data.updateEmployee]);
    })
}

// ROLES FUNCTIONS
// View all roles
async function viewAllRoles() {
    const allRoles = await db.query('SELECT roles.id, roles.title AS Role, roles.salary AS Salary, departments.name AS Department FROM roles INNER JOIN departments ON (departments.id = roles.department_id)');
    console.table(allRoles);
}
// Add role
async function addRole() {
    await inquirer
        .prompt(addRoleQuestions)
        .then(function(data){

            const newRole = {};
            newRole["name"] = data.roleTitle;
            newRole["value"] = newRoleID;
            rolesArray.push(newRole);
            
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.roleTitle, data.roleSalary, data.roleDepartment]);
        })
}

// DEPARTMENTS FUNCTIONS
// View all departments
async function viewAllDepartments() {
    const allDepartments = await db.query('SELECT departments.id, departments.name AS Department FROM departments');
    console.table(allDepartments);
}
// Add department
async function addDepartment() {
    await inquirer
        .prompt(addDepartmentQuestions)
        .then(function(data){
            db.query(`INSERT INTO departments (name) VALUES (?)`, data.departmentName);
        })
}

startMainMenu();