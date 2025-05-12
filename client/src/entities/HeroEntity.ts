import RoleEntity from "./RoleEntity"
import HeroSkillEntity from "./HeroSkillEntity"

export default interface HeroStats {
    skill: number,
    normal_attack: number,
    open_field: number,
    tank: number,
    survivability: number,
    support: number
}

export default interface HeroEntity {
    id: string,
    name: string,
    avatar: string,
    image: string,
    description: string,
    title: string,
    rarity_id: number
    roles: [RoleEntity]
    skills: [HeroSkillEntity]
    stats: HeroStats
}