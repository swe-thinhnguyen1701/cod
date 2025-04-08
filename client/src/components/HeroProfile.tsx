import { Box, Flex, Image } from "@chakra-ui/react";
import HeroCombatRadarChart from "./HeroCombatRadarChart";

const sampleData = {
    tank: 20,
    skills: 70,
    mobility: 30,
    control: 80,
    support: 82,
    precision: 84
}

// TITLE, NAME, DESCRIPTION, ROLES, AND COMBAT DATA

const HeroProfile = () => {
    return (
        <>
            <Flex>
                <Box>
                    <Image />
                </Box>
                <Box width={{ base: "200px", md: "300px" }} height={{ base: "200px", md: "300px" }}>
                    <HeroCombatRadarChart data={sampleData} />
                </Box>
            </Flex>
        </>
    )
}

export default HeroProfile;