import { FOUNDATION_TALENT_CORES } from "../state-management/talents/fetchTalent";
import useTalentStore from "../state-management/talents/store";
import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import TalentCore from "./TalentCore";
import TalentDescription from "./TalentDescription";
import TalentGroupButton from "./TalentGroupButton";

const STRUCTURE = [[4, 12], [12, 20], [20, 28]];

interface TalentBoxProps {
    rowIdx: number;
    talentIdx: number;
    talent: { id: number };
    selectedTalent: { rowIndex: number; talentIndex: number } | null;
    handleTalentClick: (rowIndex: number, talentIndex: number) => void
}

interface TalentRow {
    rowIdx: number;
    selectedTalent: { rowIndex: number; talentIndex: number } | null;
    handleTalentClick: (rowIndex: number, talentIndex: number) => void
}

const TalentBox = ({ rowIdx, talentIdx, talent, selectedTalent, handleTalentClick }: TalentBoxProps) => (
    <Box key={talent.id}>
        <Box
            id={talent.id.toString()}
            onClick={(event) => {
                event.stopPropagation();
                handleTalentClick(rowIdx, talentIdx);
            }}
            className="talent-box"
        >
            <TalentCore talentId={talent.id} />
        </Box>
        {selectedTalent?.rowIndex === rowIdx && selectedTalent?.talentIndex === talentIdx && (
            <Box
                bg="yellow.200"
                borderRadius="10px"
                position="absolute"
                zIndex={2}
                width="72vw"
                maxWidth="320px"
                left={{ base: "0", sm: "-45px" }}
            >
                <TalentDescription />
            </Box>
        )}
    </Box>
);

const TalentRow = ({ rowIdx, selectedTalent, handleTalentClick }: TalentRow) => {
    return (
        <HStack key={rowIdx} gap={8}>
            {FOUNDATION_TALENT_CORES[rowIdx].map((talent, talentIdx) => (
                <TalentBox
                    key={talent.id}
                    rowIdx={rowIdx}
                    talentIdx={talentIdx}
                    talent={talent}
                    selectedTalent={selectedTalent}
                    handleTalentClick={handleTalentClick}
                />
            ))}
        </HStack>
    );
};

const TalentGrid = () => {
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);
    const [isBigScreen, setIsBigScreen] = useState(window.innerWidth >= 1024);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    const { selectTalent, selectedGroup } = useTalentStore();

    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
        selectTalent(FOUNDATION_TALENT_CORES[rowIndex][talentIndex].id);
        setSelectedTalent({ rowIndex, talentIndex });
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".talent-box")) {
            selectTalent(-1);
            setSelectedTalent(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (talentContainerRef.current && !talentContainerRef.current.contains(event.target as Node)) {
                selectTalent(-1);
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

    return (
        <VStack onClick={handleContainerClick} ref={talentContainerRef}>
            <VStack position="relative">
                {FOUNDATION_TALENT_CORES.map((_, rowIdx) =>
                    rowIdx <= 2 ? (
                        <TalentRow key={rowIdx} rowIdx={rowIdx} selectedTalent={selectedTalent} handleTalentClick={handleTalentClick} />
                    ) : null
                )}
            </VStack>

            <VStack position="relative" mt={10} mb={7}>
                {FOUNDATION_TALENT_CORES.map((_, rowIdx) =>
                    rowIdx === 3 ? (
                        <TalentRow key={rowIdx} rowIdx={rowIdx} selectedTalent={selectedTalent} handleTalentClick={handleTalentClick} />
                    ) : null
                )}
            </VStack>

            <Box
                width="100%"
                maxWidth={{ base: "300px", sm: "400px", md: "450px" }}
                display={!isBigScreen ? "block" : "none"}>
                <TalentGroupButton />
            </Box>

            <HStack gap={{ base: 0, lg: "100px" }}>
                {STRUCTURE.map(([start, end], index) => (
                    <VStack position="relative" key={index} display={selectedGroup === index + 2 || isBigScreen ? "flex" : "none"}>
                        {FOUNDATION_TALENT_CORES.map((_, rowIdx) =>
                            rowIdx >= start && rowIdx < end ? (
                                <TalentRow key={rowIdx} rowIdx={rowIdx} selectedTalent={selectedTalent} handleTalentClick={handleTalentClick} />
                            ) : null
                        )}
                    </VStack>
                ))}
            </HStack>
        </VStack>
    );
};

export default TalentGrid;
