import { useState } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Talent from "./Talent";
import TalentDescription from "./TalentDescription";

const talents = [
    [{
        id: 1,
        name: "Overall Attack",
        description: ["Increases the ATK of your Legions's unit by ", " ."],
        value: ["0.4%", "0.8%", "1.2%"],
        preview: "ATK bonus",
        level: 0,
        maxLevel: 3,
    }],
    [{
        id: 2,
        name: "Overall Speed",
        description: ["Increases the March Speed of your Legions's unit by ", " ."],
        value: ["2%", "4%", "6%"],
        preview: "March Speed bonus",
        level: 0,
        maxLevel: 3,
    }, {
        id: 3,
        name: "Overall Defense",
        description: ["Increases the DEF of your Legions's unit by ", " ."],
        value: ["0.4%", "0.8%", "1.2%"],
        preview: "DEF bonus",
        level: 0,
        maxLevel: 3,
    }],
    [{
        id: 4,
        name: "Logistics Master",
        description: ["Increases your Legion's Gather Speed by ", " ."],
        value: ["3%", "6%", "9%"],
        preview: "Gather Speed bonus",
        level: 0,
        maxLevel: 3,
    }, {
        id: 5,
        name: "Overall Health",
        description: ["Increases the HP of your Legions's unit by ", " ."],
        value: ["0.4%", "0.8%", "1.2%."],
        preview: "HP bonus",
        level: 0,
        maxLevel: 3,
    }, {
        id: 6,
        name: "Bane of Darkness",
        description: ["Your Legion deals ", " more Peacekeeping damage."],
        value: ["1%", "2%", "3%"],
        preview: "Damage dealt during Peacekeeping bonus",
        level: 0,
        maxLevel: 3,
    }],
]

const FoundationTalents = () => {
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);

    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
        setSelectedTalent({ rowIndex, talentIndex });
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(".talent-box")) return;

        setSelectedTalent(null);
    };

    return (
        <VStack position="relative" onClick={handleContainerClick}>
            {talents.map((row, rowIdx) => (
                <HStack key={rowIdx} gap={8}>
                    {row.map((talent, talentIdx) => (
                        <Box key={talent.id}>
                            <Box
                                id={talent.id.toString()}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleTalentClick(rowIdx, talentIdx)
                                }}
                                className="talent-box"
                            >
                                <Talent
                                    maxLevel={talent.maxLevel}
                                    isActive={true}
                                    isSelected={
                                        selectedTalent?.rowIndex === rowIdx &&
                                        selectedTalent?.talentIndex === talentIdx
                                    }
                                />
                            </Box>
                            <Box
                                bg="yellow.200"
                                borderRadius="10px"
                                position={"absolute"}
                                zIndex={2}
                                width="72vw"
                                maxWidth="320px"
                                left={{ base: "0", sm: "-45px" }}
                                display={selectedTalent?.rowIndex === rowIdx &&
                                    selectedTalent?.talentIndex === talentIdx ? "inline" : "none"} >
                                <TalentDescription talent={talent} />
                            </Box>
                        </Box>
                    ))}
                </HStack>
            ))}
        </VStack>
    );
}

export default FoundationTalents;