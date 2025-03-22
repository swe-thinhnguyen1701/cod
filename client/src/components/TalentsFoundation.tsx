import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Talent from "./Talent";

const talents = [
    [{
        id: 1,
        name: "Overall Attack",
        description: ["Increases the ATK of your LEgions's unit by ", " ."],
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
        preview: "Damage dealt during Peacekeepinig bonus",
        level: 0,
        maxLevel: 3,
    }],
]

const TalentsFoundation = () => {
    // Initialize a state to track the selected talent
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);

    const talentContainerRef = useRef<HTMLDivElement>(null);

    // Function to handle talent selection
    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
        setSelectedTalent({ rowIndex, talentIndex });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                talentContainerRef.current &&
                !talentContainerRef.current.contains(event.target as Node)
            ) {
                setSelectedTalent(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <VStack>
            {talents.map((row, rowIdx) => (
                <HStack key={rowIdx} gap={8}>
                    {row.map((talent, talentIdx) => (
                        <Box
                            id={talent.id.toString()}
                            key={talent.id}
                            ref={talentContainerRef}
                            onClick={() => handleTalentClick(rowIdx, talentIdx)}>
                            <Talent
                                maxLevel={talent.maxLevel}
                                isActive={true}
                                isSelected={
                                    selectedTalent?.rowIndex === rowIdx &&
                                    selectedTalent?.talentIndex === talentIdx
                                }
                            />
                        </Box>
                    ))}
                </HStack>
            ))}
        </VStack>
    );
}

export default TalentsFoundation;