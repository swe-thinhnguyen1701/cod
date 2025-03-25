import { Badge, Box, Text} from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";
import FoundationTalents from './FoudationTalents'

const TalentGrid = () => {
    // const {remainingPoints} = useTalent()
    const { remainingPoints } = useTalentStore();
    return (
        <>
            <Box position="relative">
                <Badge position="fixed" right={2} colorScheme={remainingPoints > 10 ? "green" : remainingPoints > 0 ? "yellow" : "red"}>
                    <Text fontWeight="bold" fontSize="20px">{remainingPoints}</Text>
                </Badge>
                <FoundationTalents />
            </Box>
        </>
    )
}

export default TalentGrid;