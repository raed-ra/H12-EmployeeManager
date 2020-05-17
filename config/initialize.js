var con = require("./connection.js");

var initialize = {

employeelist: async function() {
        let employee = "employee"
        return this.query("SELECT * FROM ??", employee).then((res) => {
            employeelist = res.map((employee) => ({ value: employee.id, name: employee.first_name + " " + employee.second_name }))
            return employeelist
        })
    },

rolelist: async function() {
        let role = "role"
        return this.query("SELECT * FROM ??", role).then((res) => {
            rolelist = res.map((role) => ({ value: role.id, name: role.title }))
            //console.log(rolelist)
            return rolelist
        })
    },

departmentlist: async function() {
        let department = "department"
        return this.query("SELECT * FROM ??", department).then((res) => {
            departmentlist = res.map((department) => ({ value: department.id, name: department.name }))
            //console.log(departmentlist)
            return departmentlist
        })
    },

managerarr: function (manageridlist) {
        let managerlist = []
        manageridlist.forEach(managerid => {
            var the_id = managerid.manager_id;
            var managerItem = employeelist.filter(obj => {
                return obj.value == the_id;
            });
            if(managerItem.length > 0){
                managerlist.push(managerItem[0]);
            }
        })
        return managerlist
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

module.exports = initialize;