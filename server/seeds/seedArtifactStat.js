const { Artifact, Stat } = require("../models");

const seedArtifactStats = async (artifactStatsData) => {
    try {
        for (let i = 0; i < artifactStatsData.length; i++) {
            const { artifact_id, stat_id } = artifactStatsData[i];
            const artifact = await Artifact.findByPk(artifact_id);

            const statInstances = [];
            const numOfStats = artifact.rarity_id === 1 ? 4 : artifact.rarity_id === 2 ? 3 : 2;
            for (let j = 0; j < numOfStats; j++) {
                const stat = await Stat.findByPk(stat_id[j]);
                statInstances.push(stat);
            }

            await artifact.addStats(statInstances, { through: { setGranted: false } });
        }
    } catch (error) {
        console.error("Error seeding artifact-stat relationships", error);
    }
}

module.exports = seedArtifactStats;