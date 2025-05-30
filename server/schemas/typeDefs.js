const typeDefs = `
    type Hero {
        id: ID!
        name: String
        title: String
        rarity_id: Int
    }

    type Artifact {
        id: ID!,
        name: String
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
        upgrade_preview: String
        rage_cost: Int,
        skill_image: String
    }

    type HeroStat {
        skill: Float,
        normal_attack: Float,
        open_field: Float,
        tank: Float,
        survivability: Float,
        support: Float
    }

    type HeroDetail {
        id: ID!
        name: String
        title: String
        description: String
        rarity_id: Int
        roles: [Role]
        skills: [HeroSkill]
        stats: HeroStat
        pairings: [String]
    }

    type ArtifactStat {
        name: String,
        initial_value: Float,
        max_value: Float
    }

    type ArtifactSkill {
        name: String,
        description: String,
        additional_effect: String,
        upgrade_preview: String,
        cooldown: String,
        rage_cost: Int,
    }

    type ArtifactDetail {
        name: String,
        rarity_id: Int,
        stats: [ArtifactStat]
        skill: ArtifactSkill
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
        getAllArtifacts: [Artifact]
        getHeroById(id: ID!): Hero
        getHeroDetailByName(heroName: String): HeroDetail
        getArtifactDetailByName(artifactName: String): ArtifactDetail
        getRolesFromHero(heroId: ID!): [Role]
        getTalentCoresFromHero(heroId: ID!): [[TalentCore]]
    }

    type Mutation {
        addMessage(name: String!, email: String!, message: String!, recaptchaToken: String!): Data
    }
`;

module.exports = typeDefs;