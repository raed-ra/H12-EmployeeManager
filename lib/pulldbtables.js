var con = require("../config/connection.js");

var dbtables = {

employeelist: async function() {
        let employee = "employee"
        return this.query("SELECT * FROM ??", employee).then((res) => {
            return res
        })
    },

rolelist: async function() {
        let role = "role"
        return this.query("SELECT * FROM ??", role).then((res) => {
            return res
        })
    },

departmentlist: async function() {
        let department = "department"
        return this.query("SELECT * FROM ??", department).then((res) => {
            return res
        })
    },

query: function (statement, value) {
        return new Promise(function (resolve, reject) {
            con.query(statement, value, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            })
        })
    }
}

module.exports = dbtables;