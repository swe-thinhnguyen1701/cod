export default interface HeroSkillEntity {
    name: string,
    description: string,
    upgrade_preview: string | null,
    rage_cost: number | null,
    skill_image: string
}