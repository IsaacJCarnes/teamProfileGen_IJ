const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let teamMembers = []; //Will be filled with employees

function writeToFile(fileName, data) {
    fs.writeFile('./dist/' + fileName, data, err => { //generateMarkdown(data) adds README data
      if (err) {
        console.error(err) //Logs error
        return
      }
      //file written successfully
    })
}

const addManager = async () => {
    await inquirer
        .prompt([ //Asks for manager info
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
    ]).then((response) => { //Creates and adds new manager to teamMembers array
        teamMembers.push(new Manager(response.name, response.id, response.email, response.officeNum));
    });
};

const addEngineer = async () => {
    await inquirer.prompt([ //Asks for engineer info
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
    ]).then((response) =>{ //Creates and adds new engineer
        teamMembers.push(new Engineer(response.name, response.id, response.email, response.github));
    })
}

const addIntern = async () => {
    await inquirer.prompt([ //Asks for intern info
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
    ]).then((response) =>{ //Create and add new intern
        teamMembers.push(new Intern(response.name, response.id, response.email, response.school));
    })
}

let memberOptions = ["Add an engineer", "Add an intern","Done adding team members"];
const addEmployee = async () => {
    await inquirer.prompt([ //Asks which employee will be added
        {
            type: 'list',
            message: 'Would you like to add a member to the team?',
            name: 'memberType',
            choices: [memberOptions[0], memberOptions[1], memberOptions[2]]
        }
    ]).then(async (response) =>{
        switch (response.memberType){
            case  memberOptions[0]: // Engineer
                await addEngineer(); // Query data, create and add new engineer
                await addEmployee(); // Recurse
                return true;
            case memberOptions[1]: // Intern
                await addIntern(); // Query data, create and add new intern
                await addEmployee(); // Recurse
                return true;
            case memberOptions[2]: // No more members / base case 
                return false;          
        }
    });
}

function memberProfile(employee){
    let role = employee.getRole();
    let specialStat = "";
    let specialStatData = null;
    switch (role){ //Special data based on role
        case "Manager":
            specialStat = ""; //Could be office number
            specialStatData = ""; //No office number method in manager
            break;
        case "Engineer":
            specialStat = "Github:";
            specialStatData = `<a href="https://github.com/`+employee.getGithub() + `">` + employee.getGithub()+`</a>`;          
            break;
        case "Intern":
            specialStat = "School:";
            specialStatData = employee.getSchool();
            break;
    }

    let profile = `
    <div style="display:flex; flex-direction:column; width: 120px; height: 220px; margin:20px; box-shadow: 1px 1px 3px black;">
        <div style="position:relative; background-color: lightsteelblue; height:80px;">
            <h3 style="margin:10px; margin-left: 15px; max-width: 90px;">`+employee.getName()+`</h3>
            <h4 style="margin:10px; margin-left: 25px; max-width: 70px;">`+role+`</h4>
        </div>
        <p style="margin:4px; font-size: small; font-weight: bold;">ID:</p>
        <p style="margin:4px; font-size: small; max-width: 120px;">`+employee.getId()+`</p>
        <p style="margin:4px; font-size: small; font-weight: bold;">Email:</p>
        <p style="margin:4px; font-size: small; max-width: 120px;"><a href="mailto:`+employee.getEmail() + `">`+employee.getEmail()+`</a></p>
        <p style="margin:4px; font-size: small; font-weight: bold;">`+specialStat+`</p>
        <p style="margin:4px; font-size: small; max-width: 120px;">`+specialStatData+`</p>
    </div>
    `;
    return profile;
}

function generateMemberProfiles(){
    let teamProfiles = "";
    for(const i of teamMembers){
        teamProfiles = teamProfiles.concat(memberProfile(i));
    }
    return teamProfiles;
}

function generateHtml(){
    let teamHtml = `<!DOCTYPE html>
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
                `+generateMemberProfiles()+`
        </section>
        
    </body>
    </html>`

    writeToFile("teamProfiles.html", teamHtml);
}

async function main(){
    await addManager();
    await addEmployee();
    generateHtml();
}

main();