const { Artifact } = require("../models");

const seedArtifacts = async (data) => {
    try {
        console.log("🌱 Seeding heroes...");
        await Artifact.bulkCreate(data, { returning: true });
        console.log("✅ Seeding complete!");
        // return heroes;
    } catch (error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedArtifacts;
