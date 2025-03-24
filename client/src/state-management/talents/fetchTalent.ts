import { Talent } from "./TalentProvider";

export const TALENTS = [
    [{
        id: 1,
        name: "Overall Attack",
        description: ["Increases the ATK of your Legions's unit by ", " ."],
        value: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "ATK bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 0
    }],
    [{
        id: 2,
        name: "Overall Speed",
        description: ["Increases the March Speed of your Legions's unit by ", " ."],
        value: ["0%", "2%", "4%", "6%"],
        preview: "March Speed bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 1
    }, {
        id: 3,
        name: "Overall Defense",
        description: ["Increases the DEF of your Legions's unit by ", " ."],
        value: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "DEF bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 1
    }],
    [{
        id: 4,
        name: "Logistics Master",
        description: ["Increases your Legion's Gather Speed by ", " ."],
        value: ["0%", "3%", "6%", "9%"],
        preview: "Gather Speed bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 2
    }, {
        id: 5,
        name: "Overall Health",
        description: ["Increases the HP of your Legions's unit by ", " ."],
        value: ["0%", "0.4%", "0.8%", "1.2%."],
        preview: "HP bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 2
    }, {
        id: 6,
        name: "Bane of Darkness",
        description: ["Your Legion deals ", " more Peacekeeping damage."],
        value: ["0%", "1%", "2%", "3%"],
        preview: "Damage dealt during Peacekeeping bonus",
        level: 0,
        maxLevel: 3,
        role: 0,
        group: 2
    }],
];

const TALENT_MAP = new Map<number, Talent>();
for(let i = 0; i < TALENTS.length; i++) {
    for(let j = 0; j < TALENTS[i].length; j++) {
        TALENT_MAP.set(TALENTS[i][j].id, TALENTS[i][j]);
    }
}

export default TALENT_MAP;