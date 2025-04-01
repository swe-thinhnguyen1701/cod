const { TalentCore } = require("../models");
const talentCoreData = require("../db/talentCores");

const seedTalentCores = async () => {
    const talentCoreUrlLink = `https://d3bhl6gkk81cq1.cloudfront.net/talent-cores/`
    
    try {
        const modifyTalentCoreData = talentCoreData.map(talentCore => {
            const talentCoreImage = `${talentCoreUrlLink}${talentCore.image}`;
            return {
                ...talentCore,
                image: talentCoreImage
            }
        });
        
        console.log("🌱 Seeding talent cores...");
        await TalentCore.bulkCreate(modifyTalentCoreData, {returning: true});
        console.log("✅ Seeding complete!");
    } catch(error) {
        console.error("❌ Error seeding talent cores:", error);
    }
}

module.exports = seedTalentCores;