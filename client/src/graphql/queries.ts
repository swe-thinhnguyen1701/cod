import { gql } from "@apollo/client";

export const GET_ALL_HEROES = gql`
    query getAllHeroes {
        getAllHeroes {
            id
            name
            rarity_id
        }
    }
`

export const GET_ALL_ARTIFACTS = gql`
    query getAllArtifacts {
        getAllArtifacts {
            id
            name
            rarity_id
        }
    }
`

export const GET_HERO_BY_ID = gql`
    query getHeroById($id: ID!) {
        getHeroById(id: $id) {
            id
            name
        }
    }
`

export const GET_HERO_DETAIL_BY_NAME = gql`
    query getHeroDetailByName($heroName: String!) {
        getHeroDetailByName(heroName: $heroName) {
            id
            name
            description
            title            
            roles {
                name
                image
                description    
            }
            skills {
                name
                description
                upgrade_preview
                skill_image
                rage_cost
            }
            stats {
                skill
                normal_attack
                open_field
                tank
                survivability
                support
            }
            pairings
        }
    }
`

export const GET_ARTIFACT_DETAIL_BY_NAME = gql`
    query getArtifactDetailByName($artifactName: String!) {
        getArtifactDetailByName(artifactName: $artifactName) {
            name
            rarity_id
            stats {
                name
                initial_value
                max_value
            }
            skill {
                name
                description
                additional_effect
                upgrade_preview
                cooldown
                rage_cost
            }
        }
    }
`

export const GET_ROLES_FROM_HERO = gql`
    query getRolesFromHero($heroId: ID!) {
        getRolesFromHero(heroId: $heroId) {
            id
            name
            image
            description
        }
    }
`

export const GET_TALENT_CORES_FROM_HERO = gql`
    query getTalentCoresFromHero($heroId: ID!) {
        getTalentCoresFromHero(heroId: $heroId) {
            id
            name
            description
            buff_att
            debuff_att
            inflict_att
            buff_values
            debuff_values 
            inflict_values
            is_primary_core
            is_secondary_core
            image
            max_level
            extra_prerequisite
        }
    }
`