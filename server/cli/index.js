const { select } = require("@inquirer/prompts");
const { awsMenu } = require("./aws/");

const OPTIONS = [
  { name: "AWS", value: 1, description: "Access to the AWS menu" },
  { name: "Artifact", value: 2, description: "Access to the Artifact menu" },
  { name: "Exit", value: -1, description: "Exit the program" },
];

const run = async () => {
  let isRunning = true;
  while (isRunning) {
    const answer = await select({
      message: "Select an option",
      choices: OPTIONS,
    });

    if (answer === -1) isRunning = false;
    else if (answer === 1) await awsMenu();
  }
};

run();