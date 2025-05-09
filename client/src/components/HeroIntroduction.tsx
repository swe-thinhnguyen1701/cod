import { Heading, ListItem, Text, UnorderedList, VStack, Box, Image, HStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getGeneralHeroImage } from "../services/getImages";

const HERO_ROLES = [
    {
        name: "Infantry",
        description: "Durable frontline warriors essential for initiating and sustaining engagements. With high defense and health, they anchor battles and can adapt to various situations by using flexible artifacts tailored to the scenario."
    },
    {
        name: "Cavalry",
        description: "Fast and mobile units with high burst damage, capable of quickly taking down key targets and retreating safely. Excellent for hit-and-run tactics and disrupting enemy formations."
    },
    {
        name: "Marksman",
        description: "Ranged attackers with high precision, effective at dealing consistent damage from a distance."
    },
    {
        name: "Magic",
        description: "Spellcasters with powerful area and elemental attacks, often used for crowd control or burst damage."
    },
    {
        name: "Overall",
        description: "A balanced rating that reflects the hero’s effectiveness across all roles and scenarios."
    }];
const HERO_ROLE_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-roles/"
const ICONIC_HEROES = [
    {
        name: "Goresh",
        title: "Tormentor",
    }, {
        name: "Urag",
        title: "One-Armed Wolf Lord",
    }, {
        name: "Maggrat",
        title: "Seer of Spores",
    }, {
        name: "Liliya",
        title: "Sorceress of Flames",
    }, {
        name: "Theia",
        title: "Unchaning Law",
    }
];

const HeroIntroduction = () => {
    const [selectedType, setSelectedType] = useState(0);
    return (
        <>
            <Flex flexDir={{ base: "column", lg: "row" }} bg="#1b202b" alignItems="center" justifyContent="center" color="white">
                <VStack gap={8} padding={4} width="100%" maxWidth="700px">
                    <VStack>
                        <Text>CHOOSE YOUR</Text>
                        <Heading as="h2" size="lg" mb={4}>HERO</Heading>
                        <Text>Whether you thrive on the front lines, strike from the shadows, or rain destruction from afar — there’s a role that fits your style. Command your hero, master your strengths, and shape the battlefield your way.</Text>
                    </VStack>
                    <Text className="discover-hero-link" as="span" padding={4}>
                        <Link to="/heroes" >EXPLORE MORE HEROES</Link>
                    </Text>
                    <Box width="100%" overflowX={{ base: "auto", md: "visible" }} minHeight="125px">
                        <UnorderedList listStyleType="none" display="flex" justifyContent="center" gap={{ base: 4, md: 8 }} minWidth="max-content" margin={0}>
                            {HERO_ROLES.map((type, index) => (
                                <ListItem key={index} minWidth="100px" className="hero-role-item" onClick={() => setSelectedType(index)}>
                                    <VStack>
                                        <HStack width={{ base: "70px", md: "80px" }}>
                                            <Image src={`${HERO_ROLE_URL}${type.name}.webp`} width="100%" alt={`${type.name} role image`} />
                                        </HStack>
                                        <Text
                                            fontWeight="bold"
                                            borderBottom={selectedType === index ? "1px solid #f8d375" : "none"}
                                            color={selectedType === index ? "#f8d375" : "inherit"}
                                            fontSize={{ base: "10px", md: "12px", lg: "13px" }}
                                        >
                                            {type.name.toUpperCase()}
                                        </Text>
                                    </VStack>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                    <Text height={{base: "150px", sm: "120px", md: "75px"}}>
                        {HERO_ROLES[selectedType].description}
                    </Text>
                </VStack>
                <VStack paddingBottom={10}>
                    <Box width={{ base: "100%", md: "500px", lg: "39.06vw" }} maxWidth="800px" height={{ base: "97.19vw", md: "486px", lg: "auto" }}>
                        <Image src={getGeneralHeroImage(ICONIC_HEROES[selectedType].name)} alt={`${ICONIC_HEROES[selectedType].name} hero image`} width="100%" />
                    </Box>
                    <Heading as="h4">{ICONIC_HEROES[selectedType].name.toUpperCase()}</Heading>
                    <Text>{ICONIC_HEROES[selectedType].title}</Text>
                </VStack>
            </Flex>
        </>
    )
}

export default HeroIntroduction;