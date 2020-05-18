
const departmentfactory = require('./departmentfactory');
const rolefactory = require('./rolefactory');
const employeefactory = require('./employeefactory');
const inquirer = require("inquirer");

// let depno, roleno, employeeno;

// start()

let departmentfactoryArray = new departmentfactory(50)
departmentfactoryArray.create().then((e) => {
    let rolefactoryArray = new rolefactory(50)
    rolefactoryArray.create().then((e) => {
            let employeefactoryArray = new employeefactory(50)
            employeefactoryArray.create()
        });
});


// async function start() { 
//  ({ depno, roleno, employeeno } = await databasesize());
// }


// function databasesize() {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'departmentsize',
//             message: 'How many departments?',
//         },
//         {
//             type: 'input',
//             name: 'rolesnumbers',
//             message: 'How many roles in the company?',
//         },
//         {
//             type: 'input',
//             name: 'employeenumbers',
//             message: 'How many personnel?',
//         },
//     ]);
// }






