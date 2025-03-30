const { Role } = require("../models");
const roleData = require("../db/roles");

const seedRoles = async () => {
    const roleUrlLink = `https:\\d3bhl6gkk81cq1.cloudfront.net/hero-roles/`

    try {
        const modifyRoleData = roleData.map(role => {
            const roleImage = `${roleUrlLink}${role.name}.webp`;
            return {
                ...role,
                image: roleImage
            }
        });

        console.log("🌱 Seeding roles...");
        await Role.bulkCreate(modifyRoleData, { returning: true });
        console.log("✅ Seeding complete!");
    } catch (error) {
        console.error("❌ Error seeding roles:", error);
    }
}

module.exports = seedRoles;