const sequelize = require("../config/connection");
const seedHeros = require("./seedHeroData");
const seedArtifacts = require("./seedArtifactData");
const seedRoles = require("./seedRoleData");
const seedTalentCores = require("./seedTalentCoreData");
const seedHeroRoles = require("./seedHeroRole");
const seedSkills = require("./seedSkillData");
const seedStats = require("./seedStatData");
const seedArtifactStats = require("./seedArtifactStat");
const fetchData = require("./fetchData");

const seedAll = async () => {
    try {
        const {heroData, artifactData, heroSkillData, heroRoleData, roleCombinationData, roleData, talentCoreData, statData, artifactStatData} = await fetchData();

        await sequelize.sync({ force: true });
        console.log("🌱 Database synced!");
        
        await seedHeros(heroData);
        console.log("🌱 Heroes seeded!");

        await seedArtifacts(artifactData);
        console.log("🌱 Artifacts seeded!");

        await seedRoles(roleData);
        console.log("🌱 Roles seeded!");

        await seedTalentCores(talentCoreData);
        console.log("🌱 Users seeded!");

        await seedStats(statData);
        console.log("🌱 Stats seeded!");

        await seedHeroRoles(heroRoleData, roleCombinationData);
        console.log("🌱 Hero-role relationships seeded!");

        await seedArtifactStats(artifactStatData);
        console.log("🌱 Artifact-stats seeded!");

        await seedSkills(heroSkillData);
        console.log("🌱 Skills seeded!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedAll();