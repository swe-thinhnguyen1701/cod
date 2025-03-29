const { Hero, Role } = require("../models");
const heroRoles = require("../db/heroRoles");
const roleCombinations = require("../db/roleCombinations");

const HERO_ROLE_MAP = new Map();

const populateHeroRolesMap = async () => {
    for (let i = 0; i < heroRoles.length; i++) {
        const name = heroRoles[i].name;
        const roleCombinationId = heroRoles[i].roleCombinationId;

        const hero = await Hero.findOne({ where: { name: name } });
        if (!hero) {
            console.log(`Hero not found: ${name}`);
            continue;
        }

        const roles = [];
        for (let j = 0; j < 3; j++) {
            const role = await Role.findOne({ where: { name: roleCombinations[roleCombinationId][j] } });
            if (role) {
                roles.push(role.dataValues);
            } else {
                console.log(`Role not found: ${roleCombinations[roleCombinationId][j]}`);
            }
        }

        HERO_ROLE_MAP.set(hero.id, roles);
    }

    console.log("Hero-Role map populated successfully");
}

module.exports = { HERO_ROLE_MAP, populateHeroRolesMap };
