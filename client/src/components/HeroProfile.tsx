import { Box, Flex, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import HeroCombatRadarChart from "./HeroCombatRadarChart";
import useHeroStore from "../state-management/heroes/store";
import { useEffect, useState } from "react";
import useRoleStore from "../state-management/roles/store";
import RoleBadge from "./RoleBadge";

const sampleData = {
    tank: 20,
    skills: 70,
    mobility: 30,
    control: 80,
    support: 82,
    precision: 84
}

const BACKGROUND_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-images/background.webp";
const GOLD_COLOR = "#c8a565";


// TITLE, NAME, DESCRIPTION, ROLES, AND COMBAT DATA

const HeroProfile = () => {
    const { hero } = useHeroStore();
    const {setRoles} = useRoleStore();
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        if(hero?.Roles)
            setRoles(hero.Roles);

        const updateMediumScreen = () => {
            setIsMediumScreen(window.innerWidth >= 768);
        }

        window.addEventListener("resize", updateMediumScreen);
        updateMediumScreen();
        return () => {
            window.removeEventListener("resize", updateMediumScreen);
        }
    }, [hero]);

    if(!hero)
        return null;

    return (
        <>
            <Grid templateAreas={{
                base: `"image" "profile"`,
                sm: `"profile image"`
            }}
                templateColumns={{
                    base: "1fr",
                    sm: "1fr 250px",
                    md: "1fr 39.06vw",
                    lg: "1fr 500px"
                }}
                bgImage={BACKGROUND_URL}
                bgSize={{base: "cover", md: "100% 400px", lg: "100% 600px" }}
                bgRepeat="no-repeat"
                width="100%"
                maxWidth="1400px"
                gap={4}
                padding={4}
            >
                <GridItem area="image">
                    <Flex justifyContent="center" >
                        <Box width="100%" maxWidth="500px">
                            <Image src={hero?.image} width="100%" />
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem area="profile">
                    <VStack alignItems="flex-start">
                        <Box>
                            <Text fontWeight="bold" color={GOLD_COLOR} fontSize="1.4rem">
                                {hero?.title.toUpperCase()}
                            </Text>
                            <Heading as="h1" color="#fff" fontSize={{base: "2.986rem", md: "3.815rem", xl: "4.61rem"}}>
                                {hero?.name.toUpperCase()}
                            </Heading>
                        </Box>
                        <Text color="#fff" mb={4} maxWidth="400px" fontSize="">
                            {hero?.description}
                        </Text>
                        <HStack justifyContent="start" gap={2}>
                            {hero?.Roles.map((_role, index) => (
                                <Box key={index}>
                                    <RoleBadge idx={index} />
                                </Box>
                            ))}
                        </HStack>
                        <Box width="150px" height="150px">
                            <HeroCombatRadarChart data={sampleData} />
                        </Box>
                    </VStack>
                </GridItem>
            </Grid >
        </>
    )
}

export default HeroProfile;