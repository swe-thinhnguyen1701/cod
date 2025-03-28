const { TalentCore } = require("../models");
const talentCoreData = require("../db/talent_cores");

const seedTalentCores = async () => {
    try {
        console.log("🌱 Seeding talent cores...");
        const talentCores = await TalentCore.bulkCreate(talentCoreData, {returning: true});
        console.log("✅ Seeding complete!");
        return talentCores;
    } catch(error) {
        console.error("❌ Error seeding talent cores:", error);
    }
}

module.exports = seedTalentCores;