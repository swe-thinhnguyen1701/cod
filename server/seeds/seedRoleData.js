const { Role } = require("../models");
const roleData = require("../db/roles");

const seedRoles = async () => {
    try {
        console.log("🌱 Seeding roles...");
        const roles = await Role.bulkCreate(roleData, {returning: true});
        console.log("✅ Seeding complete!");
        return roles;
    } catch(error) {
        console.error("❌ Error seeding roles:", error);
    }
}

module.exports = seedRoles;