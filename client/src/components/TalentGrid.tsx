import useTalentStore from "../state-management/talents/store";
import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import TalentCore from "./TalentCore";
import TalentDescription from "./TalentDescription";
import TalentGroupButton from "./TalentGroupButton";


const STRUCTURE = [[4, 11], [12, 19], [20, 27]];

const TalentGrid = () => {
    const [isBigScreen, setIsBigScreen] = useState(window.innerWidth >= 1024);
    const [tooltopPos, setTooltipPos] = useState<{ x: number, y: number } | null>(null);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    const { talentList, setSelectedTalent } = useTalentStore();

    const handleTalentClick = (event: React.MouseEvent, key: string) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setSelectedTalent(key);
        setTooltipPos({x: (rect.left + rect.width) / 2, y:rect.bottom - 50 + window.scrollY});
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".talent-box")) {
            setSelectedTalent(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (talentContainerRef.current && !talentContainerRef.current.contains(event.target as Node)) {
                setSelectedTalent(null);
            }
        };

        const updateScreenSize = () => {
            setIsBigScreen(window.innerWidth >= 1024); // Adjust breakpoint as needed
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    if (!talentList)
        return null;

    return (
        <>
            <VStack onClick={handleContainerClick} ref={talentContainerRef} position="relative">
                <VStack>
                    {talentList.map((talents, rowIdx) => {
                        if (rowIdx > 2)
                            return null;

                        return (
                            <HStack key={rowIdx} gap={4}>
                                {talents.map((talent, colIdx) =>
                                    <Box key={colIdx} onClick={(event) => {
                                        event.stopPropagation();
                                        handleTalentClick(event, talent.key);
                                    }}>
                                        <TalentCore talentKey={talent.key} />
                                    </Box>
                                )}
                            </HStack>
                        )
                    })}
                </VStack>

                <VStack>
                    {talentList.map((talents, rowIdx) => {
                        if (rowIdx !== 3)
                            return null;

                        return (
                            <HStack key={rowIdx} gap={4}>
                                {talents.map((talent, colIdx) =>
                                    <Box key={colIdx} onClick={(event) => {
                                        event.stopPropagation();
                                        handleTalentClick(event, talent.key);
                                    }}>
                                        <TalentCore talentKey={talent.key} />
                                    </Box>
                                )}
                            </HStack>
                        )
                    })}
                </VStack>

                <HStack gap="80px">
                    {STRUCTURE.map((interval, index) => (
                        <VStack key={index}>
                            {talentList.map((talents, rowIdx) => {
                                if (rowIdx < interval[0] || rowIdx > interval[1])
                                    return null;

                                return (
                                    <HStack key={rowIdx} gap={4}>
                                        {talents.map((talent, colIdx) =>
                                            <Box key={colIdx} onClick={(event) => {
                                                event.stopPropagation();
                                                handleTalentClick(event, talent.key);
                                            }}>
                                                <TalentCore talentKey={talent.key} />
                                            </Box>)}
                                    </HStack>
                                )
                            })}
                        </VStack>
                    ))}
                </HStack>
                <Box maxWidth="300px" position="absolute" top={tooltopPos?.y} left={tooltopPos?.x} zIndex={3} bg="blackAlpha.800" borderRadius="10px">
                    <TalentDescription />
                </Box>
            </VStack>
        </>
    );
};

export default TalentGrid;
