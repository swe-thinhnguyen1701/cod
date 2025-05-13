import { useQuery } from "@apollo/client";
import { GET_ALL_ARTIFACTS } from "../graphql/queries";
import { Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import ArtifactEntity from "../entities/ArtifactEntity";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import ArtifactCard from "../components/ArtifactCard";

const artifactPageSEO = {
    title: "Artifacts - CoD Wiki",
    description: "There are various artifacts to explore",
    keywords: "CoD artifacts, Call of Dragons artifacts",
    type: "website"
}

const Artifact = () => {
    const { data, error, loading } = useQuery(GET_ALL_ARTIFACTS);

    if(loading)
        return (<Spinner />);

    if(error)
        throw new Response("Internal Error", { status: 500 });

    const artifacts: ArtifactEntity[] = data.getAllArtifacts;

    return (
        <>
            <SEO page={artifactPageSEO} />
            <VStack pt={8}>
                <VStack mb={8}>
                    <Text fontWeight="500">CHOOSE YOUR</Text>
                    <Heading as="h1" size="h1">Artifact</Heading>
                    <Text textAlign="center">With a wide array of artifacts, enhance your legion’s strength and strategy</Text>
                </VStack>
                <HStack wrap="wrap" gap={8} margin="0 auto" width="100%" maxWidth="1900px" justifyContent="center" className="page">
                    {artifacts.map((artifact) => (
                        <Link to={`/artifacts/${artifact.name}`} key={artifact.id}>
                            <ArtifactCard artifactName={artifact.name} rarityId={artifact.rarity_id} />
                        </Link>
                    ))}
                </HStack>
            </VStack >
        </>
    )
}

export default Artifact;