


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
    name: "email",
    message: "Enter your GitHub e-mail address"
        
},
{
    type:"input",
    name: "bio",
    message: "What is your bio?"        
            
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
    message: "What is your table of contents?"
},
{
    type: "input",
    name: "usage",
    message: "What is the usage of your project?"
},
{
    type: "input",
    name: "license",
    message: "License?"
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
{
    type: "input",
    name: "questions",
    message: "Do you have questions?"
},


];

var data;

inquirer.prompt(questions)
.then(answers => {
    axios.get(`https://api.github.com/users/${answers.username}`)
    .then(data => {
        writeFileAsync("README.txt",`# Name: ${answers.name}
        # Github User Name: ${answers.username}
        # Github email address: ${answers.email}
        # Bio Image: ${data.avatar_url}
        # Bio: ${answers.bio}
        # Repo name: ${answers.repoName}
        # Repo URL: ${data.repos_url}
        # Table of Contents: ${answers.tableOfcontents}
        # Usage: ${answers.usage}
        # License: ${answers.license}
        # Contributing: ${answers.contributing}
        # Installation: ${answers.installation}
        # Contributing: ${answers.questions}
        
        
        `)
    
    
    
    })

    
});
