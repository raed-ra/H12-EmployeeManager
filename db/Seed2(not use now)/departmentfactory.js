
let con = require("../../config/connection");
const faker = require("faker")

class DepartmentFactory {
    constructor(number) {
        this.number = number;
        this.table = 'department'
    }

    make() {
        let results = []
        // will just return the departments
        for (let index = 0; index < this.number; index++) {
            results.push({
                name: faker.commerce.department()
            })
        }
        return results
    }

  
     query(statement, value) {
        return new Promise(function(resolve, reject){
            con.query(statement,value, function (err, res) {
                if (err) {
                    reject(err);
                }else{
                    resolve(res)
                }
            })
        })       
    }

    async create() {
        // insert departments generated into db
        const toCreate = this.make()
        let results = []
        toCreate.forEach( (department) => {
            let created =  this.query("INSERT INTO department SET ?",department).catch(function(err){console.log(err)})
            results.push(created)
        })
        con.end()
        return results;
    }
}
module.exports = DepartmentFactory

