const { Hero, Artifact, Skill, Message, Stat } = require("../models");
const { HERO_ROLE_MAP } = require("../utils/heroRoleMap");
const { ROLE_TALENT_CORE_MAP, MAIN_TALENT_CORE_MAP } = require("../utils/roleTalentCoreMap");
const { validateMessage } = require("../utils/resolver_helper_methods/validateMessage");

const rateLimitMap = new Map();
const RATE_LIMIT = 5; // 5 requests
const RATE_LIMIT_TIME = 15 * 60 * 1000; // 15 minute

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
        getAllArtifacts: async() => {
            try {
                const allArtifacts = await Artifact.findAll({
                    order: [["name", "ASC"]]
                });

                return allArtifacts;
            } catch (error) {
                console.error("Error fetching artifacts:", error);
                throw new Error("Failed to fetch artifacts.");
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
                }
            });

            if(!hero)
                throw new Error(`Hero not found with given name: ${heroName}`);

            const limit = hero.rarity_id < 3 ? 5 : 4; 
            const skills = await Skill.findAll({
                where: {
                    source_id: hero.id,
                    source_type: "hero"
                },
                limit: limit,
                order: [["id", "ASC"]]
            });

            const heroWithRoles = {
                ...hero.toJSON(),
                roles: HERO_ROLE_MAP.get(hero.id),
                skills: skills
            };

            return heroWithRoles;
        },
        getArtifactDetailByName: async (_parent, { artifactName}) => {
            let artifact = await Artifact.findOne({
                where: {
                    name: artifactName
                },
                include: {
                    model: Stat,
                    as: "stats",
                    // attributes: ["id", "name", "value"]
                }
            });
            
            if(!artifact)
                throw new Error(`Artifact not found with given name: ${artifactName}`);

            const artifactSkill = await Skill.findOne({
                where: {
                    source_id: artifact.id,
                    source_type: "artifact"
                }
            });

            artifact  = {
                ...artifact.toJSON(),
                skill: artifactSkill
            };

            return artifact;
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
        addMessage: async (_parent, { name, email, message, recaptchaToken }, context) => {
            const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
            });

            let data = await response.json();

            if (!data.success || data.score < 0.5) {
                return {
                    response: {
                        code: 403,
                        success: false,
                        message: "Failed reCAPTCHA verification"
                    }
                };
            }

            const isMessageExist = await Message.findOne({ name, email, message });
            if (isMessageExist) {
                return {
                    response: {
                        code: 429,
                        success: false,
                        message: "Message has already been sent!"
                    }
                };
            }

            const ip = context.req.ip;

            const now = Date.now();
            const entry = rateLimitMap.get(ip) || { count: 0, timestamp: now };

            if (now - entry.timestamp > RATE_LIMIT_TIME) {
                rateLimitMap.set(ip, { count: 1, timestamp: now });
            } else {
                if (entry.count >= RATE_LIMIT) {
                    return {
                        response: {
                            code: 429,
                            success: false,
                            message: "Too many requests. Please try again later."
                        }
                    };
                }

                rateLimitMap.set(ip, { count: entry.count + 1, timestamp: entry.timestamp });
            }

            const error = validateMessage({ name, email, message });
            if (error) {

                return {
                    response: {
                        code: 400,
                        success: false,
                        message: error
                    }
                };
            }

            await Message.create({
                name,
                email,
                message
            });

            return {
                response: {
                    code: 200,
                    success: true,
                    message: "Message sent successfully"
                }
            };
        }
    }
}

module.exports = resolvers;