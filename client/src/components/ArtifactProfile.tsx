import { useState } from "react";
import { getArtifactImage } from "../services/getImages";
import { VStack, Box, Text, Heading, UnorderedList, ListItem, HStack, Checkbox, Image } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifacts/store";
import starImg from "../assets/star.webp";

const ArtifactProfile = () => {
    const [isMaxLevel, setIsMaxLevel] = useState(false);
    const { artifact } = useArtifactStore();

    if (!artifact)
        return null;

    return (
        <VStack pt={4}>
            <Box width={{ base: "200px" }}>
                <Image src={getArtifactImage(artifact.name)} alt={`${artifact.name} image`} className="artifact-img" />
            </Box>
            <Box width={{ base: "100vw" }} maxWidth="450px" padding={4}>
                <UnorderedList
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    gap={4}
                    listStyleType="none" 
                    ml={0}
                    mb={4}
                >
                    {Array(isMaxLevel ? 6 - (artifact.rarity_id - 1) : 1)
                        .fill(null)
                        .map((_, index) => (
                            <ListItem key={index} width="25px">
                                <Image src={starImg} alt="star icon" />
                            </ListItem>
                        ))}
                </UnorderedList>
                <Heading
                    as="h1"
                    fontSize={{ base: "1.79rem", md: "2.02rem" }}
                    textAlign="center"
                    color="#c8a565"
                    mb={4}
                >{artifact.name.toUpperCase()}</Heading>
                <Box>
                    <Heading as="h2" fontSize={{ base: "1.5rem" }}>Stat</Heading>
                    <Text mt={2} mb={2}>
                        Level
                        <Text
                            as="span"
                            fontWeight="bold"
                            paddingLeft="5px"
                        >
                            {!isMaxLevel ? "1" : `${(6 - artifact.rarity_id + 1) * 10}`} / {`${(6 - artifact.rarity_id + 1) * 10}`}
                        </Text>
                    </Text>
                    <UnorderedList listStyleType="none" margin={0}>
                        {artifact.stats.map((stat, index) => (
                            <ListItem key={index}>
                                <HStack justifyContent="space-between">
                                    <Text as="span">{stat.name}</Text>
                                    <Text as="span">{!isMaxLevel ? stat.initial_value : stat.max_value}%</Text>
                                </HStack>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            </Box>
            <Checkbox colorScheme="green" onChange={(e) => setIsMaxLevel(e.target.checked)}>
                <Text as="span" fontWeight="bold">Preview Max Level</Text>
            </Checkbox>
        </VStack>
    )
}

export default ArtifactProfile;