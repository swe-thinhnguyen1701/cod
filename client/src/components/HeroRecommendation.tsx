import { Box, Flex, Heading, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import { getHeroAvatar } from "../services/getImages";
import useHeroStore from "../state-management/heroes/store";
import ItemRecommendation from "./ItemRecommendation";

const HeroRecommendation = () => {
    const heroRecommendationList = useHeroStore(state => state.hero?.pairings);

    return (
        <Flex width="100%" justifyContent="center">
            <VStack alignItems="flex-start" padding={{ base: 4, xl: 8 }} width="100%" maxWidth="1400px">
                <Heading as="h2" mb={8}>RECOMMENDATION</Heading>
                <Box>
                    <Heading as="h3" fontSize="2rem" mb={4}>HERO PAIRINGS</Heading>
                    <UnorderedList display="flex" listStyleType="none" margin={0} padding={0} gap={8}>
                        {heroRecommendationList?.map((name, index) => (
                            <ListItem key={index}>
                                <ItemRecommendation itemName={name} imageUrl={getHeroAvatar(name)} linkItem={`/heroes/${name}`} />
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            </VStack>
        </Flex>
    )
}

export default HeroRecommendation;