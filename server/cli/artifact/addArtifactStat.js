const { select } = require("@inquirer/prompts");
const saveFile = require("../FileIO/saveFile");
const artifactData = require("../../db/artifact-db.json");
const statData = require("../../db/stat-db.json");
const artifactStatDAta = require("../../db/artifact-stat-db.json");
const { Artifact } = require("../../models");

const ARTIFACT_OPTIONS = [];
const STAT_OPTIONS = [];

const createStatOptions = () => {
    statData.forEach((stat, index) => {
        STAT_OPTIONS.push({
            name: `${stat.name}: ${stat.initial_value} / ${stat.max_value}`,
            value: index + 1,
        });
    });
}

const createArtifactOptions = () => {
    artifactData.forEach((artifact, index) => {
        ARTIFACT_OPTIONS.push({
            name: artifact.name,
            value: index + 1,
        });
    });
}

const addArtifactStat = async () => {
    createStatOptions();
    createArtifactOptions();

    console.log(`
        ,--------------------------------------,
        |            ADD ARTIFACT STAT         |
        \`--------------------------------------'`);

    const artifaceId = await select({
        message: "Select an artifact",
        choices: ARTIFACT_OPTIONS
    });

    const artifact = await Artifact.findByPk(artifaceId);
    const numOfStats = artifact.rarity_id === 1 ? 4 : artifact.rarity_id === 2 ? 3 : 2;

    const statsId = [];
    for (let i = 0; i < numOfStats; i++) {
        const answer = await select({
            message: `Select stat ${i + 1}:`,
            choices: STAT_OPTIONS,
        });

        statsId.push(answer);
    }


    artifactStatDAta.push(
        {
            artifact_id: artifaceId,
            stat_id: statsId
        }
    )

    saveFile("artifact-stat-db.json", artifactStatDAta)
}

module.exports = addArtifactStat;