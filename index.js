const jest = require("jest")
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let int = new Intern("James", 1, "fart@gmail.com","Harvard");
let mana = new Manager("Jerk", 2, "Cancel@gmail", 45);

console.log(int);
console.log(mana);
