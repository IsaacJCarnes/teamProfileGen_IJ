const jest = require("jest");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let teamMembers = [];

function teamToString(){
    let str = "Role   Name   ID   Email";
    for(const i of teamMembers){
        let role = i.getRole();
        switch (role){
            case "Manager":
                str = str.concat(role + ": " + i.getName() + " " + i.getId() + " " + i.getEmail() +"\n");
                break;
            case "Engineer":
                str = str.concat(role + ": " + i.getName() + " " + i.getId() + " " + i.getEmail() + " Github: " + i.getGithub() +"\n");
                break;
            case "Intern":
                str = str.concat(role + ": " + i.getName() + " " + i.getId() + " " + i.getEmail() + " School: " + i.getSchool() +"\n");
                break;
        }
    }
    console.log(str);
}

const addManager = async () => {
    await inquirer
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
        teamMembers.push(new Manager(response.name, response.id, response.email, response.officeNum));
    });
};

const addEngineer = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the engineers name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the engineers employee ID?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the engineers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the engineers github?',
            name: 'github',
        }
    ]).then((response) =>{
        teamMembers.push(new Engineer(response.name, response.id, response.email, response.github));
    })
}

const addIntern = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the interns name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the interns employee ID?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the interns email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the interns school?',
            name: 'school',
        }
    ]).then((response) =>{
        teamMembers.push(new Intern(response.name, response.id, response.email, response.school));
    })
}

let memberOptions = ["Add an engineer", "Add an intern","Done adding team members"];
const addEmployee = async () => {
    await inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add a member to the team?',
            name: 'memberType',
            choices: [memberOptions[0], memberOptions[1], memberOptions[2]]
        }
    ]).then(async (response) =>{
        switch (response.memberType){
            case  memberOptions[0]: // Engineer
                await addEngineer();
                addEmployee();
                return true;
            case memberOptions[1]: // Intern
                await addIntern();
                addEmployee();
                return true;
            case memberOptions[2]: // No more members
                teamToString();
                return false;          
        }
    });
}

async function main(){
    await addManager();

    addEmployee();
}

main();