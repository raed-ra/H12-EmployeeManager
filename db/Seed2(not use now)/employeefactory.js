let con = require("../../config/connection");
const faker = require("faker")

class EmployeeFactory {
 constructor (number) {
     this.number = number;
     this.table = 'employee'
 }

 make() {
    return this.query('SELECT `id` FROM `role`').then((ids) => {
        console.log(ids.role_id)
        let results = []
        // will just return the roles
        for (let index = 0; index < this.number; index++) {
            results.push({
                first_name: faker.name.firstName(),
                second_name: faker.name.lastName(),
                manager_id: Math.floor(Math.random() * ids.length),
                role_id: ids[Math.floor(Math.random() * ids.length)].id
            })
        }
        return results
    })
}

query(statement,value) {
    return new Promise(function (resolve, reject) {

        if (value!==undefined) {
            con.query(statement, value, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            })
            return;
        }
        con.query(statement, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res)
            }
        })
    })
}



async create() {
    // insert roles generated into db
    const toCreate = await this.make()
    console.log(toCreate)
    let results = []
    toCreate.forEach((employee) => {
        console.log(role)
        let created = this.query("INSERT INTO " + this.table + " SET ?", employee).catch(function (err) { console.log(err) })
        results.push(created)
    })
    con.end()
    return results;
}
}
module.exports = EmployeeFactory