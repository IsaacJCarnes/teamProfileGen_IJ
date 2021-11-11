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

function memberHtml(employee){
    let role = employee.getRole();
    let specialStat = "";
    let specialStatData = null;
    switch (role){
        case "Manager":
            specialStat = "Office Number:";
            specialStatData = null; //No office number method in manager
            break;
        case "Engineer":
            specialStat = "Github:";
            specialStatData = `<a href="https://github.com/`+employee.getGithub() + `">` + employee.getGithub();          
            break;
        case "Intern":
            specialStat = "School:";
            specialStatData = employee.getSchool();
            break;
    }
    let starterProfile = `<div style="display:flex; flex-direction:column; width: 120px; height: 25%; margin:20px; box-shadow: 1px 1px 3px black;">
    <div style="position:relative; background-color: lightsteelblue; height:80px;">
        <h3 style="margin:10px; margin-left: 15px; max-width: 90px;">`+employee.getName()+`</h3>
        <h4 style="margin:10px; margin-left: 25px; max-width: 70px;">`+role+`</h4>
    </div>
    <p style="margin:4px; font-size: small; font-weight: bold;">ID:</p>
    <p style="margin:4px; font-size: small; max-width: 120px;">`+employee.getId()+`</p>
    <p style="margin:4px; font-size: small; font-weight: bold;">Email:</p>
    <p style="margin:4px; font-size: small; max-width: 120px;"><a href="`+employee.getEmail() + `">`+employee.getEmail()+`</a></p>
    <p style="margin:4px; font-size: small; font-weight: bold;">`+specialStat+`</p>
    <p style="margin:4px; font-size: small; max-width: 120px;">`+specialStatData+`</p>
    </div>`
}

function generateHtml(){
    let starterFile = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Document</title>
    </head>
    <body style="display:flex; align-items:center; flex-direction:column; margin:0px;">
        <section style="display: flex; justify-content:center; background-color: lightcoral; width:100%;">
            <h1 style="color: white;">My Team</h1>
        </section>
    
        <section style="display: flex; flex-wrap:wrap; justify-content: center; align-items: center; margin: 10px; width:50%;">
            `<div style="display:flex; flex-direction:column; width: 120px; height: 25%; margin:20px; box-shadow: 1px 1px 3px black;">
                <div style="position:relative; background-color: lightsteelblue; height:80px;">
                    <h3 style="margin:10px; margin-left: 15px; max-width: 90px;">John</h3>
                    <h4 style="margin:10px; margin-left: 25px; max-width: 70px;">Manager</h4>
                </div>
                <p style="margin:4px; font-size: small; font-weight: bold;">ID:</p>
                <p style="margin:4px; font-size: small; max-width: 120px;">1</p>
                <p style="margin:4px; font-size: small; font-weight: bold;">Email:</p>
                <p style="margin:4px; font-size: small; max-width: 120px;">John@email.com</p>
                <p style="margin:4px; font-size: small; font-weight: bold;">Office Number:</p>
                <p style="margin:4px; font-size: small; max-width: 120px;">3</p>
            </div>`
        </section>
        
    </body>
    </html>`
}

async function main(){
    await addManager();

    addEmployee();
}

main();