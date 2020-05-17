var constable = require("console.table");


var constable = {
    constableemploee: function (employee) {
        console.log(employee.role)
        var queryString = "INSERT INTO employee (first_name,second_name,role_id,manager_id) VALUES (? , ? , ? , ?)";
        con.query(queryString, [employee.first_name, employee.second_name, employee.role, employee.manager], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    },
    constablerole: function (role) {
        var queryString = "INSERT INTO role (title,salary,department_id) VALUES (? , ? , ?)";
        con.query(queryString, [role.title, role.salary, role.department], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    },
    constabledepartment: function (department) {
        var queryString = "INSERT INTO department (name) VALUES (?)";
        console.log("----")
        console.log(department.name)
        console.log("----")
        con.query(queryString,[department.name],function (err, result) {
                if (err) throw err;
                console.log(result);
            }
        );
    }  
};
module.exports = constable;