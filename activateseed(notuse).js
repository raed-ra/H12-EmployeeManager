
const departmentfactory = require('./db/Seed2(not use now)/departmentfactory');
const rolefactory = require('./db/Seed2(not use now)/rolefactory');
const employeefactory = require('./db/Seed2(not use now)/employeefactory');
const inquirer = require("inquirer");

// let depno, roleno, employeeno;

// start()

let departmentfactoryArray = new departmentfactory(100)
departmentfactoryArray.create().then((e) => {
    let rolefactoryArray = new rolefactory(100)
    rolefactoryArray.create()
    
    // .then((e) => {
    //     let employeefactoryArray = new employeefactory(100)
    //     employeefactoryArray.create()
    // });
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






