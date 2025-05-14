const { Hero, Role } = require("../models");

const seedHeroRoles = async (heroRoleData, roleCombinationData) => {
    try {
        const heroes = await Hero.findAll();
        const roles = await Role.findAll();

        for (let i = 0; i < heroRoleData.length; i++) {
            const hrData = heroRoleData[i];
            const hero = heroes.find(hero => hero.name === hrData.name);

            const roleNames = roleCombinationData[hrData.roleCombinationId];
            const roleInstances = roles.filter(role => roleNames.includes(role.name));

            await hero.addRoles(roleInstances, { through: { setGranted: false } });
        }

        console.log("Hero-role relationships seeded successfully.");
    } catch (error) {
        console.error("Error seeding hero-role relationships:", error);
    }
};

module.exports = seedHeroRoles;
