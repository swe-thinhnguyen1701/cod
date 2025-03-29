import { Badge, Box, Text } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";
import TalentGrid from './TalentGrid'
import HeroSelection from "./HeroSelection";

const HeroTalents = () => {
    const { remainingPoints } = useTalentStore();
    return (
        <>
            <Box position="relative">
                <Box mb={4}>
                    <HeroSelection />
                </Box>
                <Badge padding={2} position="fixed" right={2} colorScheme={remainingPoints > 10 ? "green" : remainingPoints > 0 ? "yellow" : "red"} zIndex="3">
                    <Text fontWeight="bold" fontSize="20px">{remainingPoints}</Text>
                </Badge>
                <TalentGrid />
            </Box>
        </>
    )
}

export default HeroTalents;