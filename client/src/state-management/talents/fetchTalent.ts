import TalentEnitity from "../../entities/TalentEntity";

export const TALENTS = [
    [{
        id: 1,
        name: "Overall Attack",
        description: ["Increases the ATK of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "ATK bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 0,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 2,
        name: "Overall Speed",
        description: ["Increases the March Speed of your Legions's unit by ", " ."],
        buffValue: ["0%", "2%", "4%", "6%"],
        preview: "March Speed bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 1,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 3,
        name: "Overall Defense",
        description: ["Increases the DEF of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "DEF bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 1,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 4,
        name: "Logistics Master",
        description: ["Increases your Legion's Gather Speed by ", " ."],
        buffValue: ["0%", "3%", "6%", "9%"],
        preview: "Gather Speed bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 5,
        name: "Overall Health",
        description: ["Increases the HP of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%."],
        preview: "HP bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 6,
        name: "Bane of Darkness",
        description: ["Your Legion deals ", " more Peacekeeping damage."],
        buffValue: ["0%", "1%", "2%", "3%"],
        preview: "Damage dealt during Peacekeeping bonus",
        level: 0,
        maxLevel: 3,
        group: 0,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 7,
        name: "Shield of Stability",
        description: ["Your Legion gains {green}1%{/green} more DEF and takes {green}1%{/green} less damage, but their March Speed is reduced by {red}2%{/red}."],
        buffValue: [],
        preview: "",
        level: 0,
        maxLevel: 1,
        group: 1,
        position: 0,
        isPrimaryCore: true,
        isSecondaryCore: false
    }],
    [{
        id: 8,
        name: "Overall Attack",
        description: ["Increases the ATK of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "ATK bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 0,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 9,
        name: "Logistics Master",
        description: ["Increases your Legion's Gather Speed by ", " ."],
        buffValue: ["0%", "3%", "6%", "9%"],
        preview: "Gather Speed bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 1,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 10,
        name: "Overall Health",
        description: ["Increases the HP of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%."],
        preview: "HP bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 1,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 11,
        name: "Bane of Darkness",
        description: ["Your Legion deals ", " more Peacekeeping damage."],
        buffValue: ["0%", "1%", "2%", "3%"],
        preview: "Damage dealt during Peacekeeping bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 1,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 12,
        name: "Logistics Master",
        description: ["Increases your Legion's Gather Speed by ", " ."],
        buffValue: ["0%", "3%", "6%", "9%"],
        preview: "Gather Speed bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 13,
        name: "Overall Health",
        description: ["Increases the HP of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%."],
        preview: "HP bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }, {
        id: 14,
        name: "Bane of Darkness",
        description: ["Your Legion deals ", " more Peacekeeping damage."],
        buffValue: ["0%", "1%", "2%", "3%"],
        preview: "Damage dealt during Peacekeeping bonus",
        level: 0,
        maxLevel: 5,
        group: 2,
        position: 2,
        isPrimaryCore: false,
        isSecondaryCore: false
    }],
    [{
        id: 15,
        name: "Overall Speed",
        description: ["Increases the March Speed of your Legions's unit by ", " ."],
        buffValue: ["0%", "2%", "4%", "6%"],
        preview: "March Speed bonus",
        level: 0,
        maxLevel: 1,
        group: 2,
        position: 3,
        isPrimaryCore: false,
        isSecondaryCore: true
    }, {
        id: 16,
        name: "Overall Defense",
        description: ["Increases the DEF of your Legions's unit by ", " ."],
        buffValue: ["0%", "0.4%", "0.8%", "1.2%"],
        preview: "DEF bonus",
        level: 0,
        maxLevel: 1,
        group: 2,
        position: 3,
        isPrimaryCore: false,
        isSecondaryCore: true
    }]
];

const TALENT_MAP = new Map<number, TalentEnitity>();
for(let i = 0; i < TALENTS.length; i++) {
    for(let j = 0; j < TALENTS[i].length; j++) {
        TALENT_MAP.set(TALENTS[i][j].id, TALENTS[i][j]);
    }
}

export default TALENT_MAP;