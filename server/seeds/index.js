const sequelize = require("../config/connection");
const seedHeros = require("./seedHeroData");
const seedRoles = require("./seedRoleData");
const seedTalentCores = require("./seedTalentCoreData");
const seedHeroRoles = require("./seedHeroRole");

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("🌱 Database synced!");

        await seedRoles();
        console.log("🌱 Roles seeded!");

        await seedHeros();
        console.log("🌱 Heroes seeded!");

        await seedTalentCores();
        console.log("🌱 Users seeded!");

        await seedHeroRoles();
        console.log("🌱 Hero-role relationships seeded!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedAll();