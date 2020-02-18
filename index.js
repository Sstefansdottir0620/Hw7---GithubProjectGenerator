const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);



const questions = [
{
    type:"input",
    name: "name",
    message: "What is your name?"

},
{
    type:"input",
    name: "username",
    message: "Enter your GitHub username"
    
},
{
    type:"input",
    name: "repoName",
    message: "What is your Repo name?"
                
},
{
    type:"input",
    name: "repoURL",
    message: "What is your Repo URL?"
                
},
{
    type: "input",
    name: "tableOfContents",
    message: "What is the table of contents?"
},
{
    type: "input",
    name: "usage",
    message: "What is the usage of your project?"
},
{
    type: "input",
    name: "license",
    message: "What is the license for your project?"
},
{
    type: "input",
    name: "contributing",
    message: "Who contributed to the project?"
},
{
    type: "input",
    name: "installation",
    message: "What was installed for the project?"
},
];

//this is the function that prompts the user to answer questions that will be generated to the Readme
inquirer.prompt(questions)
.then(answers => {
    var userEmail;
    axios.get(`https://api.github.com/users/${answers.username}`)
    .then(res=> {

    var eventsUrl = res.data.events_url;
    if (eventsUrl.indexOf("{/privacy}") > -1) {
        eventsUrl = eventsUrl.substring(0, eventsUrl.indexOf("{/privacy}"));
    }
    axios
    .get(eventsUrl)
    .then(resEmail => {
        userEmail = resEmail.data[0].payload.commits[0].author.email;
    });

    var repoName;
    axios.get(res.data.repos_url)
    .then(repos => { 
        repos.data.forEach(repo => {
            if (repo.id === 241012274) {
                repoName = repo.name;  
            }
            
        });

    })

    writeFileAsync("README.md",`# Name: ${answers.name}
    # Github User Name: ${answers.username}
    # Github email address: ${userEmail}
    # Bio Image: ${res.data.avatar_url}
    # Repo URL: ${res.data.repos_url}
    # Bio: ${answers.bio}
    # Repo name: ${repoName}
    # Table of Contents: ${answers.tableOfcontents}
    # Usage: ${answers.usage}
    # License: ${answers.license}
    # Contributing: ${answers.contributing}
    # Installation: ${answers.installation}
    # Contributing: ${answers.questions}`)
    
    
    })

    
});


