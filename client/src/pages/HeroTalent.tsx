import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import HeroTalents from "../components/HeroTalents";
import SEO from "../components/SEO";
import useTalentStore from "../state-management/talents/store";
import { useEffect } from "react";

const heroTalentPage = {
    title: "Hero Talents - CoD Wiki",
    description: "Explore the hero talents in the Call of Dragons Wiki. Discover the best talents for your favorite heroes.",
    keywords: "Call of Dragons, hero talents, wiki, best talents",
    type: "website"
}

const HeroTalentPage = () => {
    const { reset } = useTalentStore();
    useEffect(() => {
        reset();
    }, []);
    return (
        <>
            <SEO page={heroTalentPage} />
            <VStack>
                <Box width="100%" maxWidth={"1400px"}>
                    <VStack mb={8}>
                        <Heading as="h1" size="h1">Hero Talents</Heading>
                        <Text>Choose a hero and experiment with different talent builds to find the perfect strategy.</Text>
                    </VStack>
                    <Box mb={8}>
                        <Heading as="h2" mb={4}>HOW TO USE?</Heading>
                        <VStack alignItems={"flex-start"}>
                            <Text>
                                <Text as="span" fontWeight="bold">SELECT A HERO: </Text> Select hero from the list on the left side of the screen.
                            </Text>
                            <Text>
                                <Text as="span" fontWeight="bold">ADD POINT: </Text> Click on the talent icon to add a point to it.
                            </Text>
                            <Text>
                                <Text as="span" fontWeight="bold">REDUCE POINT: </Text> Hold <Text as="span" fontWeight={"bold"}>Alt</Text> (on Window) or <Text as="span" fontWeight={"bold"}>Option</Text> (on Mac) and click on the talent icon to remove a point from it.
                            </Text>
                        </VStack>
                    </Box>
                    <Box width="100%" className="page">
                        <HeroTalents />
                    </Box>
                </Box>
            </VStack>
        </>
    )
}

export default HeroTalentPage;