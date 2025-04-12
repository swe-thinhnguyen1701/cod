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

export const GET_HERO_BY_ID = gql`
    query getHeroById($id: ID!) {
        getHeroById(id: $id) {
            id
            name
        }
    }
`

export const GET_HERO_BY_NAME = gql`
    query getHeroByName($heroName: String!) {
        getHeroByName(heroName: $heroName) {
            id
            name
            description
            title            
            Roles {
                name
                image
                description    
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