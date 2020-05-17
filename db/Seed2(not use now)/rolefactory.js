const faker = require("faker")
let con = require("../../config/connection");

class RoleFactory {
    constructor(number) {
        this.number = number;
        this.table = 'role'
    }

    make() {
        return this.query('SELECT `id` FROM `department`').then((ids) => {
            console.log(ids.department_id)
            let results = []
            // will just return the roles
            for (let index = 0; index < this.number; index++) {
                results.push({
                    title: faker.name.jobTitle(),
                    salary: faker.random.number(),
                    department_id: ids[Math.floor(Math.random() * ids.length)].id
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
        toCreate.forEach((role) => {
            console.log(role)
            let created = this.query("INSERT INTO " + this.table + " SET ?", role).catch(function (err) { console.log(err) })
            results.push(created)
        })
        con.end()
        return results;
    }
}
module.exports = RoleFactory

