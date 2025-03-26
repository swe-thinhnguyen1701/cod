import { FOUNDATION_TALENT_CORES } from "../state-management/talents/fetchTalent"
import useTalentStore from "../state-management/talents/store";

import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";

import TalentCore from "./TalentCore";
import TalentDescription from "./TalentDescription";

const FoundationTalents = () => {
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    const {selectTalent} = useTalentStore();

    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
        // console.log(`rowIndex: ${rowIndex}, talentIndex: ${talentIndex}`);
        // console.log(FOUNDATION_TALENT_CORES[rowIndex][talentIndex].id);
        
        selectTalent(FOUNDATION_TALENT_CORES[rowIndex][talentIndex].id);
        setSelectedTalent({ rowIndex, talentIndex });
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(".talent-box")) return;

        selectTalent(-1);
        setSelectedTalent(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                talentContainerRef.current &&
                !talentContainerRef.current.contains(event.target as Node)
            ) {
                selectTalent(-1);
                setSelectedTalent(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef}>
            {FOUNDATION_TALENT_CORES.map((row, rowIdx) => (
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
                                <TalentCore talentId={talent.id}/>
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
                                <TalentDescription />
                            </Box>
                        </Box>
                    ))}
                </HStack>
            ))}
        </VStack>
    );
}

export default FoundationTalents;