const { input, select } = require("@inquirer/prompts");
const artifactData = require("../../db/artifact-db.json");
const skillData = require("../../db/skill-db.json");
const saveFile = require("../FileIO/saveFile");

const ARTIFACTS = [];

const creatArtifactOptions = () => {
    artifactData.forEach((artifact, index) => {
        ARTIFACTS.push({
            name: artifact.name,
            value: index + 1,
        });
    });
}

const addArtifactSkill = async () => {
    creatArtifactOptions();
    console.log(`
        ,--------------------------------------,
        |            ADD ARTIFACT SKILL         |
        \`--------------------------------------'`);

    const skillName = await input({message: "Enter the skill name: "});
    const skillDescription = await input({message: "Enter the skill description: "});
    const additionalEffect = await input({message: "Enter the additional effect: "});
    const upgradePreview = await input({message: "Enter the upgrade preview: "});
    const cooldown = await input({message: "Enter the cooldown: "});
    const rageCost = await input({message: "Enter the rage cost: "});
    const sourceId = await select({
        message: "Select the source",
        choices: ARTIFACTS
    });


    skillData.push(
        {
            name: skillName,
            description: skillDescription,
            additional_effect: additionalEffect === "null" ? null : additionalEffect,
            upgrade_preview: upgradePreview,
            cooldown: cooldown === "null" ? null : cooldown,
            rage_cost: rageCost === "null" ? null : rageCost,
            source_id: sourceId,
            source_type: "artifact"
        }
    )

    saveFile("skill-db.json", skillData);
}

module.exports = addArtifactSkill;