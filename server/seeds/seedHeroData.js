const { Hero } = require("../models");

const seedHeros = async (data) => {
    try {
        console.log("🌱 Seeding heroes...");
        await Hero.bulkCreate(data, { returning: true });
        console.log("✅ Seeding complete!");
        // return heroes;
    } catch (error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedHeros;
