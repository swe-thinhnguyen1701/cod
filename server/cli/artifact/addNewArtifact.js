const { input, select } = require("@inquirer/prompts");
const saveFile = require("../FileIO/saveFile");
const artifactData = require("../../db/artifact-db.json");

const addNewArtifact = async () => {
    console.log(`
        ,--------------------------------------,
        |            ADD NEW ARTIFACT          |
        \`--------------------------------------'`);

    const artifactName = await input({message: "Enter the artifact name: "});
    const aritfactRarityId = await select({
        message: "Select the artifact rarity",
        choices: [
            { name: "Legendary", value: 1 },
            { name: "Epic", value: 2 },
            { name: "Elite", value: 3 },
            { name: "Advanced", value: 4 },
        ]
    });

    artifactData.push(
        {
            name: artifactName,
            rarity_id: parseInt(aritfactRarityId),
        }
    );

    saveFile("artifact-db.json", artifactData);
}

module.exports = addNewArtifact;