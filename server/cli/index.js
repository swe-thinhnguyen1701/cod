const { select } = require("@inquirer/prompts");
const { awsMenu } = require("./aws/");
const { artifactMenu } = require("./artifact");

const OPTIONS = [
  { name: "AWS", value: 1, description: "Access to the AWS menu" },
  { name: "Artifact", value: 2, description: "Access to the Artifact menu" },
  { name: "Exit", value: -1, description: "Exit the program" },
];

const run = async () => {
  let isRunning = true;
  while (isRunning) {
    console.log(`
        ,--------------------------------------,
        |                MAIN MENU             |
        \`--------------------------------------'`);
    const answer = await select({
      message: "Select an option",
      choices: OPTIONS,
    });

    if (answer === -1) isRunning = false;
    else if (answer === 1) await awsMenu();
    else if (answer === 2) await artifactMenu();
  }
};

run();