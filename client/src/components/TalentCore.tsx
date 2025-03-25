import { useState } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import icon from "../assets/helmet-1.ico";
import activateTalent from "../services/activateTalent";
import TalentEnitity from "../entities/TalentEntity";
import useTalentStore from "../state-management/talents/store";

interface Props {
    talentId: number
}

const TalentCore = ({ talentId }: Props) => {
    const [isScaled, setIsScaled] = useState(false);
    const { selectedTalent, prerequisite, talentMap, modifyTalentPoints, modifySpecialTalentPoints } = useTalentStore();
    const talent = talentMap.get(talentId) as TalentEnitity;
    const currentLevel = talent.level;

    const isSelected = selectedTalent?.id === talentId;
    const isActive = activateTalent(talent.group, talent.position, prerequisite);

    console.log(JSON.stringify(prerequisite));

    const handleClick = (event: React.MouseEvent) => {
        setIsScaled(true);
        setTimeout(() => setIsScaled(false), 100);

        if (!isActive) return;

        const maxLevel = talent.maxLevel;

        if (event.altKey && isSelected && event.button === 0 && currentLevel > 0) {
            modifyTalentPoints(talent.group, talent.position, -1);
        } else if (!event.altKey && isSelected && event.button === 0 && currentLevel < maxLevel) {
            if (talent.group > 1 && (talent.position === 3 || talent.position === 7)) {
                modifySpecialTalentPoints(talent.group, talent.position);
                return;
            }
            modifyTalentPoints(talent.group, talent.position, 1);
        }
    }

    return (
        <>
            <Box display="flex" flexDir="column" alignItems="center">
                <Box
                    className="talent-container"
                    transform={talent.isPrimaryCore ? "scale(1.5)" : talent.isSecondaryCore ? "scale(1.2)" : "scale(1)"}
                    margin={talent.isPrimaryCore ? 5 : talent.isSecondaryCore ? 2 : 0}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    cursor="pointer">
                    <Box
                        className={`${isSelected ? "talent-layer-1 show" : "talent-layer-1"}`}
                        transform={isScaled ? "scale(0.1)" : "scale(1)"}
                    >
                    </Box>
                    <VStack
                        className="talent talent-layer-2"
                        justifyContent="center"
                        bg={
                            !isActive
                                ? "#59819b"
                                : currentLevel < 1 ? "#a19b8a" : "white"
                        }
                        onClick={handleClick}
                        transform={isScaled ? "scale(0.9)" : "scale(1)"}
                        transition="transform 0.2s">
                        <VStack
                            className="talent talent-layer-3"
                            justifyContent="center"
                            bg={
                                !isActive
                                    ? "#21445c"
                                    : currentLevel < 1 ? "#645531" : "#877344"
                            }
                        >
                            <Image src={icon} opacity={currentLevel < 1 ? "0.25" : "1"} />
                        </VStack>
                    </VStack>

                </Box>
                <Text fontWeight="bold">
                    {currentLevel}/{talent.maxLevel}
                </Text>
            </Box>
        </>
    )
}

export default TalentCore;