const { Hero, Role, TalentCore, Skill, Message } = require("../models");
const { HERO_ROLE_MAP } = require("../utils/heroRoleMap");
const { ROLE_TALENT_CORE_MAP, MAIN_TALENT_CORE_MAP } = require("../utils/roleTalentCoreMap");
const { validateMessage } = require("../utils/resolver_helper_methods/validateMessage");

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
        getHeroDetailByName: async (_parent, { heroName }) => {
            let hero = await Hero.findOne({
                where: {
                    name: heroName
                },
                include: [
                    {
                        model: Skill,
                    }
                ],
            });

            const heroWithRoles = {
                ...hero.toJSON(),
                roles: HERO_ROLE_MAP.get(hero.id)
            };

            return heroWithRoles;
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
    },

    Mutation: {
        addMessage: async (_parent, { name, email, message }, context) => {
            const isMessageExist = await Message.findOne({name, email, message});
            if(isMessageExist){
                return {
                    code: 429,
                    success: false,
                    message: "Message has already been sent!"
                }
            }

            const ip = context.req.ip;

            const now = Date.now();
            const entry = rateLimitMap.get(ip) || { count: 0, timestamp: now };

            if (now - entry.timestamp > RATE_LIMIT_TIME) {
                rateLimitMap.set(ip, { count: 1, timestamp: now });
            } else {
                if (entry.count >= RATE_LIMIT) {
                    return {
                        code: 429,
                        success: false,
                        message: "Too many requests. Please try again later."
                    };
                }

                rateLimitMap.set(ip, { count: entry.count + 1, timestamp: entry.timestamp });
            }

            const error = validateMessage({ name, email, message });
            if (error) {
                return {
                    code: 400,
                    success: false,
                    message: error
                };
            }

            await Message.create({
                name,
                email,
                message
            });

            return {
                code: 200,
                success: true,
                message: "Message sent successfully"
            };
        }
    }
}

module.exports = resolvers;