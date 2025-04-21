const { Role } = require("../models");

const seedRoles = async (data) => {
    const roleUrlLink = `https://d3bhl6gkk81cq1.cloudfront.net/hero-roles/`

    try {
        const modifyRoleData = data.map(role => {
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