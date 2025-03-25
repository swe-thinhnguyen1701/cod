export default interface TalentEnitity {
    id: number;
    name: string;
    description: string[];
    buffValue: string[];
    debuffValue?: string[];
    preview: string;
    level: number;
    maxLevel: number;
    group: number;
    position: number;
    isPrimaryCore: boolean;
    isSecondaryCore: boolean;
}