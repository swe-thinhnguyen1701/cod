import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import SEO from "../components/SEO";

const artifactPageSEO = {
    title: "Artifacts - CoD Wiki",
    description: "There are various artifacts to explore",
    keywords: "CoD artifacts, Call of Dragons artifacts",
    type: "website"
}

const Artifact = () => {
    <>
        <SEO page={artifactPageSEO} />
        <VStack pt={8}>
                <VStack mb={8}>
                    <Text fontWeight="500">SELECT YOUR</Text>
                    <Heading as="h1" size="h1">Hero</Heading>
                    <Text textAlign="center">With more than 40 heroes, you will find a good pair to form a legion</Text>
                </VStack>
                <HStack wrap="wrap" gap={8} margin="0 auto" width="100%" maxWidth="1900px" justifyContent="center" className="page">
                    
                </HStack>
            </VStack >
    </>
}

export default Artifact;