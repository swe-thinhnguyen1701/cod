import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ARTIFACT_DETAIL_BY_NAME } from "../graphql/queries";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import ArtifactProfile from "../components/ArtifactProfile";
import useArtifactStore from "../state-management/artifacts/store";
import ArtifactSkill from "../components/ArtifactSkill";

const ArtifactDetail = () => {
    const { artifactName: artifactName } = useParams();
    const { setArtifact } = useArtifactStore();

    const { loading, error, data } = useQuery(GET_ARTIFACT_DETAIL_BY_NAME, {
        variables: { artifactName: artifactName }
    });

    useEffect(() => {
        if (data?.getArtifactDetailByName) {
            setArtifact(data.getArtifactDetailByName);
        }
    }, [data])

    if (loading)
        return <Spinner />

    if (error || !artifactName)
        throw new Response("Artifact not found", { status: 404 });

    return (
        <Box className="page">
            <Flex
                justifyContent="center"
                flexDirection={{ base: "column", lg: "row" }}
                gap={8}
                paddingTop={4}
                margin="0 auto"
                maxWidth="1440px"
                >
                <ArtifactProfile />
                <ArtifactSkill />
            </Flex>
        </Box>
    )
}

export default ArtifactDetail;