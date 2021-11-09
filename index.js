const jest = require("jest")
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let manager = null;
const teamMembers = [];

function addEngineer(){

}

function addIntern(){

}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add a member to the team?',
            name: 'memberType',
            choices: [memberOptions[0], memberOptions[1], memberOptions[2]]
        }
    ]).then((response) =>{
        switch (response.memberType){
            case  memberOptions[0]: // Engineer
                addEngineer();
                return true;
            case memberOptions[1]: // Intern
                addIntern();
                return true;
            case memberOptions[2]: // No more members
                return false;          
        }
    });
}

inquirer
    .prompt([
    {
        type: 'input',
        message: 'What is the team managers name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the team managers employee ID?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is the team managers email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is the team managers office number?',
        name: 'officeNum',
    }

]).then((response) => {
    manager = new Manager(response.name, response.id, response.email, response.officeNum);
    let addingMembers = true;
    let memberOptions = ["Add an engineer", "Add an intern","Done adding team members"];
    while(addingMembers){
        addingMembers = addEmployee();
    }
});