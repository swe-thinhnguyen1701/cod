const { Stat } = require("../models");

const seedStats = async (data) => {
    try {
        console.log("🌱 Seeding heroes...");
        await Stat.bulkCreate(data, { returning: true });
        console.log("✅ Seeding complete!");
        // return heroes;
    } catch (error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedStats;
