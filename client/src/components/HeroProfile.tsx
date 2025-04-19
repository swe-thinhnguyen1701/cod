import { useEffect } from "react";
import { Box, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getZoomHeroImage } from "../services/getImages"
import HeroCombatRadarChart from "./HeroCombatRadarChart";
import useHeroStore from "../state-management/heroes/store";
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

const HeroProfile = () => {
    const { hero } = useHeroStore();
    const { setRoles } = useRoleStore();

    useEffect(() => {
        if (hero?.Roles)
            setRoles(hero.Roles);

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
                    sm: `"profile image"`
                }}
                    templateColumns={{
                        base: "1fr",
                        sm: "1fr 250px",
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
                        <Image src={getZoomHeroImage(hero.name)} height={{ base: "300px", md: "350px", xl: "420px" }} width="auto" />
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
            </Box>

        </>
    )
}

export default HeroProfile;