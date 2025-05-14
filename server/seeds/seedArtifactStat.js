const { Artifact, Stat } = require("../models");

const seedArtifactStats = async (artifactStatsData) => {
    console.log("artifact stat is running");
    try {
        for (let i = 0; i < artifactStatsData.length; i++) {
            const { artifact_id, stat_id } = artifactStatsData[i];
            const artifact = await Artifact.findByPk(artifact_id);

            const statInstances = [];
            for (let j = 0; j < 4; j++) {
                const stat = await Stat.findByPk(stat_id[j]);
                statInstances.push(stat);
            }

            await artifact.addStats(statInstances, { through: { setGranted: false } });
        }

        console.log("Artifact-stat relationships seeded successfully");
    } catch (error) {
        console.error("Error seeding artifact-stat relationships", error);
    }
}

module.exports = seedArtifactStats;