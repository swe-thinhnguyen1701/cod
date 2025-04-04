export default interface TalentEntity {
    id: string,
    name: string,
    description: string,
    buff_att: string[] | null,
    debuff_att: string[] | null,
    inflict_att: string[] | null,
    buff_values: string[][] | null,
    debuff_values: string[][] | null,
    inflict_values: string[][] | null,
    is_primary_core: boolean,
    is_secondary_core: boolean,
    image: string,
    max_level: number,
    extra_prerequisite: boolean,
    prerequisite_talent_key: string | null,
    group: number,
    position: number,
    current_level: number,
    key: string
}

// fix the name after done