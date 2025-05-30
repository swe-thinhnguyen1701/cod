const artifactData = require("../../db/artifact-db.json");
const { select } = require("@inquirer/prompts");
const addNewArtifact = require("./addNewArtifact");
const addArtifactStat = require("./addArtifactStat");
const addArtifactSkill = require("./addArtifactSkill");

const OPTIONS = [
    {
        name: "Add new artifact",
        value: 0
    },
    {
        name: "Add artifact stat",
        value: 1
    },
    {
        name: "Add artifact skill",
        value: 2
    },
    {
        name: "Exit",
        value: -1
    }
];

const artifactMenu = async () => {
    while (true) {
        console.log(`
        ,--------------------------------------,
        |            ARTIFACT MENU             |
        \`--------------------------------------'`);

        const answer = await select({
            message: "Select an option",
            choices: OPTIONS,
        });

        if (answer === 0) await addNewArtifact();
        else if (answer === 1) await addArtifactStat();
        else if (answer === 2) await addArtifactSkill();
        else return
    }
}

module.exports = { artifactMenu };