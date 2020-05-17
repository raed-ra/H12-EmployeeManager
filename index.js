const inquirer = require("inquirer");
const initialize = require("./config/initialize")
const orm = require("./config/orm.js");
const pulldbtables = require("./lib/pulldbtables")

let employeelist = []
let departmentlist = []
let rolelist = []
start()

async function start() {
    employeelist = await initialize.employeelist()
    rolelist = await initialize.rolelist()
    departmentlist = await initialize.departmentlist()
    const actionoption = await action();
    switch (actionoption.querytype.substring(0, 1)) {
        case "1":
            await addquestions(actionoption.add)
            start()
            break;
        case "2":
            console.log(actionoption.view)
            await viewtable(actionoption.view)
            start()
            break;
        case "3":
            let newrole = await chooserole()
            await orm.updaterole(newrole.role, actionoption.updaterole)
            start()
            break;
        case "4":
            let manager = await choosemanager()
            await orm.updatemanager(manager.managerid, actionoption.updatemanager)
            start()
            break;
        case "5":
            managerlist = initialize.managerarr(await orm.manageridlist())
            let whomanager = await whosemployees(managerlist)
            let reporteeslist = await orm.querymanagersreportees(whomanager.managerid)
            console.log("List of reportees:")
            console.table(reporteeslist)
            start()
            break;
        case "6":
            let tabletodeletefrom = actionoption.deletetableitem
            await deletequestions(tabletodeletefrom)
            start()
            break;
        case "7":
            let depid = actionoption.depbudget
            let budgetreport = await orm.budgetquery(depid)
            console.table(budgetreport)
            start()
            break;
        case "8":
            console.log("this is the end")
            break;
        default: throw new RoleNotDefinedError
    }
    return console.log("end!");
}

function optionIs(option) {
    return function (answer) {
        return (answer.querytype.substring(0, 1) === option)
    }
}

async function action() {
    let tablesarray = ["Employees", "Roles", "Departments"]
    return inquirer.prompt([
        {
            type: "list",
            name: "querytype",
            message: "Which type of query do you want to run?",
            choices: [
                "1. Add departments, roles, employees",
                "2. View departments, roles, employees",
                "3. Update employees role",
                "4. Update employee managers",
                "5. View employees by manager",
                "6. Delete departments, roles, and employees",
                "7. View the total utilized budget of a department -- ie the combined salaries of all employees in that department",
                "8. Exit"
            ]
        },
        {
            type: "list",
            message: "Which table you want to add info to?:",
            name: "add",
            choices: tablesarray,   //----inquirer required------- 
            when: optionIs("1")
        },
        {
            type: "list",
            message: "Which table do you want to view?:",
            name: "view",
            choices: ["All tables joined", ...tablesarray],
            when: optionIs("2")
        },
        {
            type: "list",
            message: "Which employee's role needs updating?:",
            name: "updaterole",
            choices: employeelist, //----------Query function (employee)-------???? dont run the query twice
            when: optionIs("3")
        },
        {
            type: "list",
            message: "Which employee's manager needs updating?:",
            name: "updatemanager",
            choices: employeelist,
            when: optionIs("4")
        },
        {
            type: "list",
            message: "Which table do you want to delete from?:",
            name: "deletetableitem",
            choices: tablesarray,
            when: optionIs("6")
        },
        {
            type: "list",
            message: "View the total utilized budget of a department -- ie the combined salaries of all employees in that department:",
            name: "depbudget",
            choices: departmentlist,
            when: optionIs("7")
        }
    ])
}

async function addquestions(addvariable) {
    switch (addvariable) {
        case "Departments":
            (department = await adddepartmentquestions());
            await orm.adddepartment(department)
            break;
        case "Roles":
            (role = await addrolesquestions());
            await orm.addrole(role)
            break;
        case "Employees":
            (employee = await addemployeequestions());
            await orm.addemployee(employee)
            break;
        default: throw new RoleNotDefinedError
    }
}

async function viewtable(table) {

    switch (table) {
        case "All tables joined":
            let alltables = await orm.employeeview()
            console.table(alltables)
            break;
        case "Employees":
            employeeviewlist = []
            let employees = await pulldbtables.employeelist();
            let managers = await pulldbtables.employeelist();
            let employeeroles = await pulldbtables.rolelist();
            console.table(employeeroles);
            employees.forEach((employee) => {
                if (employee.role_id !== null) {
                    employee.role_id = (employeeroles.find(data => data.id === employee.role_id)).title;
                }
                if (employee.manager_id !== null) {
                    employee.manager_id = (managers.find(data => data.id === employee.manager_id)).first_name;
                }
            })
            console.table(employees)
            break;
        case "Roles":
            let rolesdepartments = await pulldbtables.departmentlist()
            let roles = await pulldbtables.rolelist()
            roles.forEach((role) => {
                if (role.department_id !== null) {
                    role.department_id = (rolesdepartments.find(data => data.id === role.department_id)).name;
                }
            })
            console.table(roles)
            break;
        case "Departments":
            let departments = await pulldbtables.departmentlist()
            console.table(departments)
            break;
        default: throw new RoleNotDefinedError
    }
}


async function deletequestions(table) {
    switch (table) {
        case "Departments":
            (department = await deletedepartmentquestions());
            //console.log(department.departmentname)
            await orm.deletedepartment(department)
            break;
        case "Roles":
            (role = await deleterolesquestions());
            //console.log(role.rolename)
            await orm.deleterole(role)
            console.log("test1")
            break;
        case "Employees":
            (employee = await deleteemployeequestions());
            await orm.deleteemployee(employee.employeename)
            break;
        default: throw new RoleNotDefinedError
    }
}


function adddepartmentquestions() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name of department?',
        },
    ]);
}


function addrolesquestions() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Whats the job title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department will the role be reporting to?',
            choices: departmentlist,
        },
    ]);
}

function addemployeequestions() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First name?',
        },
        {
            type: 'input',
            name: 'second_name',
            message: 'Second name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is his/her role?',
            choices: rolelist,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is his/her manager?',
            choices: employeelist,
        },
    ]);
}

function chooserole() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Choose a new role?',
            choices: rolelist,
        },
    ]);
}

function choosemanager() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'managerid',
            message: 'Choose a new manager?',
            choices: employeelist,
        },
    ]);
}

function whosemployees(managerlist) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'managerid',
            message: `Which Manager's reportees do you want to see?`,
            choices: managerlist,
        },
    ]);
}

function deletedepartmentquestions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'departmentname',
            message: 'Name of department to delete?',
            choices: departmentlist
        },
    ]);
}


function deleterolesquestions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'rolename',
            message: 'Name of role to delete?',
            choices: rolelist
        },
    ]);
}

function deleteemployeequestions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeename',
            message: 'Which employee is leaving company?',
            choices: employeelist,
        },
    ]);
}

