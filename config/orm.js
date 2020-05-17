var con = require("./connection.js");


var orm = {
    addemployee: function (employee) {
        console.log(employee.role)
        var queryString = "INSERT INTO employee (first_name,second_name,role_id,manager_id) VALUES (? , ? , ? , ?)";
        return this.query(queryString, [employee.first_name, employee.second_name, employee.role, employee.manager]).then((res) => {
            console.log("Employee added!");
            return res
        });
    },
    addrole: function (role) {
        var queryString = "INSERT INTO role (title,salary,department_id) VALUES (? , ? , ?)";
        this.query(queryString, [role.title, role.salary, role.department]). then((res)=> {
            console.log("Role added!");
            return res
        });
    },
    adddepartment: function (department) {
        var queryString = "INSERT INTO department (name) VALUES (?)";
        this.query(queryString, [department.name]).then((res) => {
            console.log("department added!");
            return res
        });
    },
    updaterole: function (roleid, employeeid) {
        var querystring = "UPDATE employee SET role_id = ? WHERE id = ?";
        this.query(querystring, [roleid, employeeid]).then((res) => {
            console.log("Role updated!")
        });
    },

    updatemanager: function (managerid, employeeid) {
        var querystring = "UPDATE employee SET manager_id = ? WHERE id = ?";
        this.query(querystring, [managerid, employeeid]).then((res) => {
            console.log("Manager updated!")
        });
    },

    manageridlist: function () {
        return this.query("SELECT manager_id FROM employee GROUP BY manager_id").then((res) => {
            return res;
        });
    },

    querymanagersreportees: function (managerid) {
        let querystring = "SELECT first_name,second_name FROM employee WHERE manager_id=?";
        return this.query(querystring, [managerid]).then((res) => {
            return res
        });
    },

    deleteemployee: function (employee) {
        let queryString = "DELETE FROM employee WHERE id = ?";
        this.query(queryString, [employee]).then((res) => { 
            console.log("Employee deleted!");
            return res
        });
        queryString = "UPDATE employee SET manager_id=null WHERE manager_id = ?";
        this.query(queryString, [employee]).then((res) => { 
            console.log("Other relevant tables updated!");
            return res
        });
    },
    
    deleterole: function (role) {
        let queryString = "DELETE FROM role WHERE id = ?";
        this.query(queryString, role.rolename).then((res) => {
            console.log("Role deleted!");
            return res
        });
        queryString = "UPDATE employee SET role_id=null WHERE role_id = ?";
        this.query(queryString, role.rolename).then((res) => {
            console.log("Other relevant tables updated!");
            return res
        });
    },

    deletedepartment: function (department) {
        let queryString = "DELETE FROM department WHERE id = ?";
        this.query(queryString, department.departmentname).then((res) => {
            console.log("Department deleted!");
            return res
        });
        queryString = "UPDATE role SET department_id=null WHERE department_id = ?";
        this.query(queryString, department.departmentname).then((res) => {
            console.log("Other relevant tables updated!");
            return res
        });
    },

    budgetquery: function (dept) {
        var queryString = "SELECT department.name, sum(role.salary) as Budget FROM employee as emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.id = ?  GROUP BY department.name ";
        return this.query(queryString, [dept]).then(res => {
            return res
        });
    },

    employeeview: function () {
        var queryString = "SELECT emp.id AS EmpID ,emp.first_name AS EmpFirstName ,emp.second_name AS EmpSecondName ";
        queryString += ",mgr.first_name AS MgrFirstName,mgr.second_name AS MGRSecondName, role.title AS JobTitle, role.salary AS Salary,dep.name AS DepartmentName ";
        queryString += "FROM employee AS emp ";
        queryString += "LEFT JOIN employee AS mgr ON emp.manager_id = mgr.id ";
        queryString += "LEFT JOIN role ON emp.role_id = role.id ";
        queryString += "LEFT JOIN department as dep ON role.department_id = dep.id ";
        //queryString += "WHERE emp.manager_id IS NULL OR mgr.id IS NOT NULL OR role.department_id IS NULL ";
        return this.query(queryString).then(res => {
            return res
        });
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

};
module.exports = orm;

