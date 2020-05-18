
DROP DATABASE IF EXISTS Employee_ManagerDB;

CREATE DATABASE employee_managerDB;

USE employee_managerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  second_name varchar(255) NOT NULL,
  role_id int NULL,
  manager_id int NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  salary decimal(10,0) NOT NULL,
  department_id int NULL,
  PRIMARY KEY (id)
);

