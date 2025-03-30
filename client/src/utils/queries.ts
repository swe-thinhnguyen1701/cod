import { gql } from "@apollo/client";

export const GET_ALL_HEROES = gql`
    query getAllHeroes {
        getAllHeroes {
            id
            name
            avatar
        }
    }
`

export const GET_HERO_BY_ID = `
    query getHeroById($id: ID!) {
        getHeroById(id: $id) {
            id
            name
            avatar
        }
    }
`

export const GET_ROLES_FROM_HERO = `
    query getRolesFromHero($heroId: ID!) {
        getRolesFromHero(heroId: $heroId) {
            id
            name
            image
            description
        }
    }
`

export const GET_TALENT_CORE_FROM_HERO = `
    query getTalentCoresFromHero($heroId: ID!) {
        getTalentCoresFromHero(heroId: $heroId) {
            id: ID!
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
            prerequisite_talent_core
        }
    }
`