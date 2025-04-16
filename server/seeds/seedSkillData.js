const {Skill} = require("../models");
const skillData = require("../db/skills");

const seedSkills = async () => {
    try {
        console.log("🌱 Seeding skills...");
        await Skill.bulkCreate(skillData, { returning: true });
        console.log("✅ Seeding complete!");
        // return skills;
    } catch (error) {
        console.error("❌ Error seeding skills:", error);
    }
}

module.exports = seedSkills;