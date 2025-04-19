import RoleEntity from "./RoleEntity"
import HeroSkillEntity from "./HeroSkillEntity"

export default interface HeroEntity {
    id: string,
    name: string,
    avatar: string,
    image: string,
    description: string,
    title: string,
    rarity_id: number
    Roles: [RoleEntity]
    Skills: [HeroSkillEntity]
}