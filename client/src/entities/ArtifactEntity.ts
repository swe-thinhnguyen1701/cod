interface ArtifactStat {
  name: string;
  initial_value: number;
  max_value: number;
}

interface ArtifactSkill {
  name: string;
  description: string;
  additional_effect: string;
  upgrade_preview: string;
  cooldown: string;
  rage_cost: number;
}

export default interface ArtifactEntity {
  name: string;
  rarity_id: number;
  stats: [ArtifactStat];
  skill: ArtifactSkill;
}
