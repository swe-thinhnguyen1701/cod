const { Hero } = require("../models");
const heroData = require("../db/heroes");

const seedHeros = async () => {
    try {
        console.log("🌱 Seeding heroes...");
        const heroes = await Hero.bulkCreate(heroData, {returning: true});
        console.log("✅ Seeding complete!");
        return heroes;
    } catch(error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedHeros;
