const faker = require("faker")
let con = require("../../config/connection");

class RoleFactory {
    constructor(number) {
        this.number = number;
        this.table = 'role'
    }

    make() {
        return this.query('SELECT `id` FROM `department`').then((ids) => {
            let results = []
            // will just return the roles
            for (let index = 1; index <= this.number; index++) {
                results.push({
                    title: faker.name.jobTitle(),
                    salary: faker.random.number(),
                    department_id: ids[Math.floor(Math.random() * ids.length)].id
                })
            }
            return results
        }).catch(function (err) { 
            console.log(err) })
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
        const toCreate = await this.make().catch(function (err) { console.log(err) })
        let results = []
        toCreate.forEach(async (role) => {
            let created = await this.query("INSERT INTO " + this.table + " SET ?", role).catch(function (err) { console.log(err) })
            results.push(created)
        })
        return results;
    }
}
module.exports = RoleFactory

