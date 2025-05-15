import { Box, Heading, Text } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifacts/store"
import TextFormat from "./TextFormat";

const ArtifactSkill = () => {
    const { artifact } = useArtifactStore();

    if (!artifact)
        return null;

    return (
        <Box>
            <Heading as="h2" mb={2}>{artifact.skill.name}</Heading>
            <Box mb={4}>
                <Text fontWeight="bold" mb={2}>♦ Skill Description</Text>
                <TextFormat text={artifact.skill.description} />
            </Box>
            {artifact.skill.additional_effect &&
                <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>♦ Additional Effect</Text>
                    <TextFormat text={artifact.skill.additional_effect} />
                </Box>
            }
            <Box>
                <Text fontWeight="bold" mb={2}>♦ Skill Upgrade Preview</Text>
                <TextFormat text={artifact.skill.upgrade_preview} />
            </Box>
        </Box>
    )
}

export default ArtifactSkill;