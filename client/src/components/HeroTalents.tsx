import { Badge, Box, Heading, Spinner, Text } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";
import TalentGrid from './TalentGrid'
import HeroSelection from "./HeroSelection";
import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../graphql/queries";

const HeroTalents = () => {
    const { loading, error, data } = useQuery(GET_ALL_HEROES);

    const { remainingPoints, isHeroSelected } = useTalentStore();

    if (loading)
        return <Spinner />

    if (error)
        return <Heading as="h2">Something went wrong!</Heading>

    return (
        <>
            <Box position="relative">
                <Box mb={4}>
                    <HeroSelection heroes={data.getAllHeroes} />
                </Box>
                {isHeroSelected && <Badge
                    padding={2}
                    position="fixed"
                    right={{ base: 2, md: 20, lg: "25vw" }}
                    colorScheme={remainingPoints > 10 ? "green" : remainingPoints > 0 ? "yellow" : "red"} zIndex="3">
                    <Text fontWeight="bold" fontSize="20px">{remainingPoints}</Text>
                </Badge>}
                {isHeroSelected && <TalentGrid />}
            </Box>
        </>
    )
}

export default HeroTalents;