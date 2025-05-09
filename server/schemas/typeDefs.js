const typeDefs = `
    type Hero {
        id: ID!
        name: String
        title: String
        rarity_id: Int
    }

    type Role {
        id: ID!
        name: String
        image: String
        description: String
    }

    type TalentCore {
        id: ID!
        name: String
        description: String
        buff_att: [String],
        debuff_att: [String],
        inflict_att: [String],
        buff_values: [[String]],
        debuff_values: [[String]],
        inflict_values: [[String]],
        is_primary_core: Boolean,
        is_secondary_core: Boolean,
        image: String,
        max_level: Int,
        extra_prerequisite: Boolean
    }

    type HeroSkill {
        name: String,
        description: String,
        rage_cost: Int,
        skill_image: String
    }

    type HeroDetail {
        id: ID!
        name: String
        title: String
        description: String
        rarity_id: Int
        roles: [Role]
        skills: [HeroSkill]
    }

    type TalentCoreGroup {
        talentCores: [TalentCore]
    }

    type Response {
        code: Int
        success: Boolean
        message: String
    }

    type Data {
        response: Response
    }

    type Query {
        getAllHeroes: [Hero]
        getHeroById(id: ID!): Hero
        getHeroDetailByName(heroName: String): HeroDetail
        getRolesFromHero(heroId: ID!): [Role]
        getTalentCoresFromHero(heroId: ID!): [[TalentCore]]
    }

    type Mutation {
        addMessage(name: String!, email: String!, message: String!, recaptchaToken: String!): Data
    }
`;

module.exports = typeDefs;