import { memo, useState, useCallback, useEffect } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import activateTalent from "../services/activateTalent";
import useTalentStore from "../state-management/talents/store";
import TalentEntity from "../entities/TalentEntity";
import Line from "./Line";

interface Props {
    talentKey: string
}

const TalentCore = memo(({ talentKey }: Props) => {
    const [isScaled, setIsScaled] = useState(false);

    const talent = useTalentStore(state => state.talentMap?.get(talentKey) as TalentEntity);
    const selectedTalentKey = useTalentStore(state => state.selectedTalent?.key);
    const prerequisite = useTalentStore(state => state.prerequisite);
    const addPoint = useTalentStore(state => state.addPoint);
    const reducePoint = useTalentStore(state => state.reducePoint);
    const addPointToSpecialTalent = useTalentStore(state => state.addPointToSpecialTalent);
    const isQualified = useTalentStore(state => state.isQualified);
    const setRollbackTalentCore = useTalentStore(state => state.setRollbackTalentCore);
    const isRollback = useTalentStore(state => state.isRollback);

    const isSelected = selectedTalentKey === talentKey;
    const isActive = activateTalent(talent.group, talent.position, prerequisite) && isQualified(talent.key);

    useEffect(() => {
        if (talent.extra_prerequisite && isRollback(talent.key)) {
            console.log("IT SHOULD SET ROLLBACK");
            setRollbackTalentCore(talent.key);
        }
    }, [talent.current_level]);

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            setIsScaled(true);
            setTimeout(() => setIsScaled(false), 150);

            if (!isActive) return;

            if (event.altKey && isSelected && event.button === 0 && talent.current_level > 0) {
                reducePoint();
            } else if (!event.altKey && isSelected && event.button === 0 && talent.current_level < talent.max_level) {
                if (talent.group > 1 && (talent.position === 3 || talent.position === 7)) {
                    addPointToSpecialTalent();
                    return;
                }
                addPoint();
            }
        },
        [isActive, isSelected, talent, reducePoint, addPoint, addPointToSpecialTalent]
    );

    if (!talent) return null;

    return (
        <>
            <Box display="flex" flexDir="column" alignItems="center" position="relative">
                <Box
                    className="talent-container"
                    transform={talent.is_primary_core ? "scale(1.5)" : talent.is_secondary_core ? "scale(1.2)" : "scale(1)"}
                    margin={talent.is_primary_core ? 5 : talent.is_secondary_core ? 2 : 0}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    cursor="pointer">
                    <Box
                        className={`${isSelected ? "talent-layer-1 show" : "talent-layer-1"}`}
                    >
                    </Box>
                    <VStack
                        className="talent talent-layer-2"
                        justifyContent="center"
                        bg={
                            !isActive
                                ? "#59819b"
                                : talent.current_level < 1 ? "#a19b8a" : "white"
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
                                    : talent.current_level < 1 ? "#645531" : "#877344"
                            }
                            padding="5px 3px"
                        >
                            <Image height="100%" src={talent.image} opacity={talent.current_level < 1 ? "0.25" : "1"} />
                        </VStack>
                    </VStack>

                </Box>
                {talent.extra_prerequisite && <Line left={24} top={-33} isActive={talent.current_level > 0} />}
                <Text fontWeight="bold">
                    {talent.current_level}/{talent.max_level}
                </Text>
            </Box>
        </>
    )
});

export default TalentCore;