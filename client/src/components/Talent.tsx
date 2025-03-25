import { useState } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import icon from "../assets/helmet-1.ico";
import useTalent from "../state-management/talents/useTalent";
import TALENT_MAP from "../state-management/talents/fetchTalent";
import activateTalent from "../services/activateTalent";
import TalentEnitity from "../entities/TalentEntity";

interface Props {
    talentId: number
}

const Talent = ({ talentId }: Props) => {
    const [isScaled, setIsScaled] = useState(false);
    const { prerequisite, selectedTalent, dispatch } = useTalent();
    const talent = TALENT_MAP.get(talentId) as TalentEnitity;
    const currentLevel = talent.level;

    const isSelected = selectedTalent?.id === talentId;
    const isActive = activateTalent(talent.group, talent.position, prerequisite);
    // console.log(prerequisite[0][0]);
    

    const handleClick = (event: React.MouseEvent) => {
        setIsScaled(true);
        setTimeout(() => setIsScaled(false), 100);

        if (!isActive) return;

        const maxLevel = talent ? talent.maxLevel : 3;

        if (event.altKey && isSelected && event.button === 0 && currentLevel > 0) {
            dispatch({ type: "REMOVE_POINT", group: talent?.group ?? -1, position: talent?.position ?? -1 })
        } else if (!event.altKey && isSelected && event.button === 0 && currentLevel < maxLevel) {
            dispatch({ type: "ADD_POINT", group: talent?.group ?? -1, position: talent?.position ?? -1 })
        }
    }

    return (
        <>
            <Box className="talent-container" display="flex" flexDir="column" alignItems="center" cursor="pointer">
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
                <Text fontWeight="bold">
                    {currentLevel}/{talent.maxLevel}
                </Text>
            </Box>
        </>
    )
}

export default Talent;