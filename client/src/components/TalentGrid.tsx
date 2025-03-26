import { FOUNDATION_TALENT_CORES } from "../state-management/talents/fetchTalent"
import useTalentStore from "../state-management/talents/store";

import { useState, useRef, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";

import TalentCore from "./TalentCore";
import TalentDescription from "./TalentDescription";
// 0 - 3
// 3 - 4
// 4 - 12
// 12 - 20
// 20 - 28
const STRUCTURE = [[4, 12], [12, 20], [20, 28]];

const TalentGrid = () => {
    const [selectedTalent, setSelectedTalent] = useState<{ rowIndex: number; talentIndex: number } | null>(null);
    const talentContainerRef = useRef<HTMLDivElement>(null);
    const { selectTalent } = useTalentStore();

    const handleTalentClick = (rowIndex: number, talentIndex: number) => {
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
        <>
            <VStack>
                <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef}>
                    {FOUNDATION_TALENT_CORES.map((row, rowIdx) => {
                        if (rowIdx > 2) return null;

                        return (
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
                                            <TalentCore talentId={talent.id} />
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
                        )
                    })}
                </VStack>
                <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef}>
                    {FOUNDATION_TALENT_CORES.map((row, rowIdx) => {
                        if (rowIdx < 3 || rowIdx > 3) return null;

                        return (
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
                                            <TalentCore talentId={talent.id} />
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
                        )
                    })}
                </VStack>
                <HStack gap={{ base: 0, lg: 8 }}>
                    {STRUCTURE.map(([start, end], index) => (
                        <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef} key={index} display={index === 0 ? "flex" : "none"}>
                            {FOUNDATION_TALENT_CORES.map((row, rowIdx) => {
                                if (rowIdx < start || rowIdx >= end) return null;

                                return (
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
                                                    <TalentCore talentId={talent.id} />
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
                                )
                            })}
                        </VStack>
                    ))}
                </HStack>

                {/* <HStack>
                    <VStack position="relative" onClick={handleContainerClick} ref={talentContainerRef}>
                        {FOUNDATION_TALENT_CORES.map((row, rowIdx) => {
                            if (rowIdx < 4) return null;

                            return (
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
                                                <TalentCore talentId={talent.id} />
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
                            )
                        })}
                    </VStack>
                </HStack> */}
            </VStack>

        </>
    );
}

export default TalentGrid;