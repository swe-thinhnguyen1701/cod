const { Hero, Role, TalentCore } = require("../models");
const { HERO_ROLE_MAP } = require("../utils/heroRoleMap");
const { ROLE_TALENT_CORE_MAP, MAIN_TALENT_CORE_MAP } = require("../utils/roleTalentCoreMap");

const resolvers = {
    Query: {
        getAllHeroes: async () => {
            try {
                const allHeroes = await Hero.findAll({
                    order: [["name", "ASC"]]
                });
                return allHeroes;
            } catch (error) {
                console.error("Error fetching heroes:", error);
                throw new Error("Failed to fetch heroes.");
            }
        },
        getHeroById: async (_parent, { id }) => {
            if (!id)
                throw new Error("No ID provided");

            const hero = await Hero.findByPk(id);

            if (!hero)
                throw new Error(`Hero not found with given id: ${id}`);

            return hero;
        },
        getHeroByName: async (_parent, {heroName}) => {
            const hero = await Hero.findOne({
                where: {
                    name: heroName
                }
            });

            if(!hero)
                throw new Error(`Hero not found with given name: ${heroName}`);

            return hero;
        },
        getRolesFromHero: async (_parent, { heroId }) => {
            if (!heroId)
                throw new Error("No hero ID provided");

            const key = parseInt(heroId);

            if (!HERO_ROLE_MAP.has(key))
                throw new Error(`Hero not found with given id: ${key}`);

            const roles = HERO_ROLE_MAP.get(key);

            return roles;
        },
        getTalentCoresFromHero: async (_parent, { heroId }) => {
            if (!heroId)
                throw new Error("No role ID provided");

            const key = parseInt(heroId);
            
            if (!HERO_ROLE_MAP.has(key))
                throw new Error(`Hero is not found with gieven ID: ${key}`);

            const roles = HERO_ROLE_MAP.get(key);
            const roleTalentCores = [];

            for (let i = 0; i < 5; i++) {
                let talentCores = [];
                if (i === 0) {
                    talentCores = roles[1].id === 10 ? ROLE_TALENT_CORE_MAP.get(19) : ROLE_TALENT_CORE_MAP.get(18);
                } else if (i === 1) {
                    talentCores = MAIN_TALENT_CORE_MAP.get(roles[2].id);
                } else {
                    talentCores = ROLE_TALENT_CORE_MAP.get(roles[i - 2].id);
                }
                roleTalentCores.push(talentCores);
            }

            return roleTalentCores;
        }
    }
}

module.exports = resolvers;