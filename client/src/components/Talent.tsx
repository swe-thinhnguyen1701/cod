import { useState } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import icon from "../assets/helmet-1.ico";
import useTalent from "../state-management/talents/useTalent";

interface Props {
    maxLevel: number;
    isSelected: boolean;
    isActive: boolean;
}

const Talent = ({ maxLevel, isSelected, isActive }: Props) => {
    const [isScaled, setIsScaled] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);
    const {selectedTalent, dispatch} = useTalent();

    const handleClick = (event: React.MouseEvent) => {
        setIsScaled(true);
        setTimeout(() => setIsScaled(false), 100);

        if (!isActive) return;

        const maxLevel = selectedTalent ? selectedTalent.maxLevel : 3;
        
        if (event.altKey && isSelected && event.button === 0 && currentLevel > 0) {
            setCurrentLevel(currentLevel - 1);
            dispatch({type: "REMOVE_POINT", row: selectedTalent?.role ?? -1, col: selectedTalent?.group ?? -1})
        } else if (!event.altKey && isSelected && event.button === 0 && currentLevel < maxLevel) {
            setCurrentLevel(currentLevel + 1);
            dispatch({type: "ADD_POINT", row: selectedTalent?.role ?? -1, col: selectedTalent?.group ?? -1})
        }
    }

    return (
        <>
            {!isActive ?
                <Box className="talent-container" display="flex" flexDir="column" alignItems="center" cursor="pointer">
                    <Box
                        className={`${isSelected ? "talent-layer-1 show" : "talent-layer-1"}`}
                        transform={isScaled ? "scale(0)" : "scale(1)"}
                    >
                    </Box>
                    <VStack
                        className="talent talent-layer-2"
                        justifyContent="center"
                        bg="#59819b"
                        onClick={handleClick}
                        transform={isScaled ? "scale(0.9)" : "scale(1)"}
                        transition="transform 0.2s">
                        <VStack className="talent talent-layer-3" justifyContent="center" bg="#21445c">
                            <Image src={icon} opacity={currentLevel < 1 ? "0.25" : "1"} />
                        </VStack>
                    </VStack>
                    <Text opacity="0">
                        {currentLevel} / {maxLevel}
                    </Text>
                </Box> :
                <Box className="talent-container" display="flex" flexDir="column" alignItems="center" cursor="pointer">
                    <Box
                        className={`${isSelected ? "talent-layer-1 show" : "talent-layer-1"}`}
                        transform={isScaled ? "scale(0.1)" : "scale(1)"}
                    >
                    </Box>
                    <VStack
                        className="talent talent-layer-2"
                        justifyContent="center"
                        bg={currentLevel < 1 ? "#a19b8a" : "white"}
                        onClick={handleClick}
                        transform={isScaled ? "scale(0.9)" : "scale(1)"}
                        transition="transform 0.2s">
                        <VStack
                            className="talent talent-layer-3"
                            justifyContent="center"
                            bg={currentLevel < 1 ? "#645531" : "#877344"}
                        >
                            <Image src={icon} opacity={currentLevel < 1 ? "0.25" : "1"} />
                        </VStack>
                    </VStack>
                    <Text>
                        {currentLevel}/{maxLevel}
                    </Text>
                </Box>}
        </>
    )
}

export default Talent;