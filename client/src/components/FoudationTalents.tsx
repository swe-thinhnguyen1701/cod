import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Talent from "./Talent";
import TalentDescription from "./TalentDescription";
import useTalent from "../state-management/talents/useTalent";
import { TALENTS } from "../state-management/talents/fetchTalent"
import useTalentStore from "../state-management/talents/store";

const FoundationTalents = () => {
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    // const { dispatch } = useTalent();
    const {selectTalent} = useTalentStore();

    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
        // dispatch({ type: "SELECTED_TALENT", id: TALENTS[rowIndex][talentIndex].id })
        selectTalent(TALENTS[rowIndex][talentIndex].id);
        setSelectedTalent({ rowIndex, talentIndex });
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(".talent-box")) return;

        setSelectedTalent(null);
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
        <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef}>
            {TALENTS.map((row, rowIdx) => (
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
                                <Talent talentId={talent.id}/>
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