import useTalentStore from "../state-management/talents/store";
import { useState, useRef, useEffect } from "react";
import { Box, HStack, Popover, PopoverContent, PopoverTrigger, VStack } from "@chakra-ui/react";
import TalentCore from "./TalentCore";
import TalentDescription from "./TalentDescription";
import TalentGroupButton from "./TalentGroupButton";
import TalentHeading from "./TalentHeading";

const STRUCTURE = [[4, 11], [12, 19], [20, 27]];

interface TalentCoreDescription {
    row: number,
    col: number
}

const TalentGrid = () => {
    const [isBigScreen, setIsBigScreen] = useState(window.innerWidth >= 1024);
    const [selectedTalentGroup, setSelectedTalentGroup] = useState<number>(2);
    const [showDescription, setShowDescription] = useState<TalentCoreDescription | null>(null);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    const { talentList, setSelectedTalent } = useTalentStore();

    const handleTalentClick = (key: string, row: number, col: number) => {
        setSelectedTalent(key);
        setShowDescription({ row: row, col: col });
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".talent-box")) {
            setSelectedTalent(null);
            setShowDescription(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (talentContainerRef.current && !talentContainerRef.current.contains(event.target as Node)) {
                setSelectedTalent(null);
                setShowDescription(null);
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
                                    <Popover key={colIdx} isOpen={showDescription?.row == rowIdx && showDescription?.col == colIdx}>
                                        <VStack>
                                            <Box onClick={(event) => {
                                                event.stopPropagation();
                                                handleTalentClick(talent.key, rowIdx, colIdx);
                                            }}>
                                                <TalentCore talentKey={talent.key} />
                                            </Box>
                                            <PopoverTrigger>
                                                <Box></Box>
                                            </PopoverTrigger>
                                        </VStack>
                                        <PopoverContent>
                                            <TalentDescription />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </HStack>
                        )
                    })}
                    <TalentHeading idx={-1} />
                </VStack>

                <VStack margin={8}>
                    {talentList.map((talents, rowIdx) => {
                        if (rowIdx !== 3)
                            return null;

                        return (
                            <HStack key={rowIdx} gap={4}>
                                {talents.map((talent, colIdx) =>
                                    <Popover key={colIdx} isOpen={showDescription?.row == rowIdx && showDescription?.col == colIdx}>
                                        <VStack>
                                            <Box onClick={(event) => {
                                                event.stopPropagation();
                                                handleTalentClick(talent.key, rowIdx, colIdx);
                                            }}>
                                                <TalentCore talentKey={talent.key} />
                                            </Box>
                                            <PopoverTrigger>
                                                <Box></Box>
                                            </PopoverTrigger>
                                        </VStack>
                                        <PopoverContent>
                                            <TalentDescription />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </HStack>
                        )
                    })}
                </VStack>

                <Box display={isBigScreen ? "none" : "block"}>
                    <TalentGroupButton selectedGroup={selectedTalentGroup} setSelectedGroup={setSelectedTalentGroup} />
                </Box>

                <HStack gap="80px">
                    {STRUCTURE.map((interval, index) => (
                        <VStack key={index} display={!isBigScreen && selectedTalentGroup !== index + 2 ? "none" : "flex"}>
                            <TalentHeading idx={index} />
                            {talentList.map((talents, rowIdx) => {
                                if (rowIdx < interval[0] || rowIdx > interval[1])
                                    return null;

                                return (
                                    <HStack key={rowIdx} gap={4}>
                                        {talents.map((talent, colIdx) =>
                                            <Popover key={colIdx} isOpen={showDescription?.row == rowIdx && showDescription?.col == colIdx}>
                                                <VStack>
                                                    <Box onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleTalentClick(talent.key, rowIdx, colIdx);
                                                    }}>
                                                        <TalentCore talentKey={talent.key} />
                                                    </Box>
                                                    <PopoverTrigger>
                                                        <Box></Box>
                                                    </PopoverTrigger>
                                                </VStack>
                                                <PopoverContent>
                                                    <TalentDescription />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </HStack>
                                )
                            })}
                        </VStack>
                    ))}
                </HStack>
            </VStack>
        </>
    );
};

export default TalentGrid;
