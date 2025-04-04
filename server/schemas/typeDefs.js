const typeDefs = `
    type Hero {
        id: ID!
        name: String
        title: String
        avatar: String
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

    type TalentCoreGroup {
        talentCores: [TalentCore]
    }

    type Query {
        getAllHeroes: [Hero]
        getHeroById(id: ID!): Hero
        getRolesFromHero(heroId: ID!): [Role]
        getTalentCoresFromHero(heroId: ID!): [[TalentCore]]
    }
`;

module.exports = typeDefs;