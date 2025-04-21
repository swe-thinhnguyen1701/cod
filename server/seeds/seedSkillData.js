const {Skill} = require("../models");

const seedSkills = async (data) => {
    try {
        console.log("🌱 Seeding skills...");
        await Skill.bulkCreate(data, { returning: true });
        console.log("✅ Seeding complete!");
        // return skills;
    } catch (error) {
        console.error("❌ Error seeding skills:", error);
    }
}

module.exports = seedSkills;