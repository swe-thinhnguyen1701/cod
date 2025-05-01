import { useEffect } from "react";
import { Box, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getGeneralHeroImage } from "../services/getImages"
import HeroCombatRadarChart from "./HeroCombatRadarChart";
import useHeroStore from "../state-management/heroes/store";
import useRoleStore from "../state-management/roles/store";
import RoleBadge from "./RoleBadge";


const sampleData = {
    skill: 20,
    normalAtk: 70,
    openField: 90,
    tank: 30,
    survivability: 80,
    support: 82,
}

const BACKGROUND_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-images/background.webp";
const GOLD_COLOR = "#c8a565";

const HeroProfile = () => {
    const { hero } = useHeroStore();
    const { setRoles } = useRoleStore();

    useEffect(() => {
        if (hero?.roles)
            setRoles(hero.roles);

    }, [hero]);

    if (!hero)
        return null;

    return (
        <>
            <Box bgImage={BACKGROUND_URL}
                bgSize="100% 100%"
                bgRepeat="no-repeat"
                width="100%">
                <Grid templateAreas={{
                    base: `"image" "profile"`,
                    md: `"profile image"`
                }}
                    templateColumns={{
                        base: "1fr",
                        md: "1fr 300px",
                        lg: "1fr 500px"
                    }}
                    alignItems="center"
                    maxWidth="1400px"
                    gap={4}
                    padding={4}
                    margin="0 auto"
                >
                    <GridItem area="image" display="flex" justifyContent="center">
                        <Image src={getGeneralHeroImage(hero.name)} height={{ base: "300px", md: "350px", xl: "auto" }} width="auto" />
                    </GridItem>
                    <GridItem area="profile">
                        <VStack alignItems="flex-start">
                            <Box>
                                <Text fontWeight="bold" color={GOLD_COLOR} fontSize="1.4rem">
                                    {hero?.title.toUpperCase()}
                                </Text>
                                <Heading as="h1" color="#fff" fontSize={{ base: "2.986rem", md: "3.815rem", xl: "4.61rem" }}>
                                    {hero?.name.toUpperCase()}
                                </Heading>
                            </Box>
                            <Text color="#fff" mb={4} maxWidth="400px" fontSize="">
                                {hero?.description}
                            </Text>
                            <HStack justifyContent="start" gap={2}>
                                {hero?.roles.map((_role, index) => (
                                    <Box key={index}>
                                        <RoleBadge idx={index} />
                                    </Box>
                                ))}
                            </HStack>
                            <Box>
                                <HeroCombatRadarChart data={sampleData} />
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid >
            </Box>

        </>
    )
}

export default HeroProfile;