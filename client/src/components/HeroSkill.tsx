import { useState } from "react";
import useHeroStore from "../state-management/heroes/store";
import { Box, Flex, Image, Heading, VStack, Text, HStack } from "@chakra-ui/react";
import { getHeroSkillImage } from "../services/getImages";

const HeroSkill = () => {
    const heroSkills = useHeroStore((state) => state.hero?.skills);
    const [selectedSkill, setSelectedSkill] = useState(0);

    const handleSkillClick = (index: number) => {
        setSelectedSkill(index);
    };

    if (!heroSkills)
        return null;

    const formatDescription = (description: string) => {

        const parts = description.split(/(\{bold\}|\{\/bold\}|\{newline\}|\{lightgrey\}|\{\/lightgrey\})/g);
        let currentColor: "bold" | "lightgrey" | null = null;

        return parts.map((part, index) => {
            switch (part) {
                case "{bold}":
                    currentColor = "bold";
                    return null;
                case "{/bold}":
                    currentColor = null;
                    return null;
                case "{lightgrey}":
                    currentColor = "lightgrey";
                    return null;
                case "{/lightgrey}":
                    currentColor = null;
                    return null;
                case "{newline}":
                    return <br key={index} />;
                default:
                    if (currentColor === "bold") {
                        return (
                            <Text as="span" key={index} fontWeight="bold">
                                {part}
                            </Text>
                        );
                    } else if (currentColor === "lightgrey") {
                        return (
                            <Text as="span" key={index} color="gray.500">
                                {part}
                            </Text>
                        );
                    }
                    return <Text as="span" key={index}>{part}</Text>;
            }
        });
    };

    console.log(heroSkills[selectedSkill]);

    return (
        <>
            <HStack width="100%" bg="#1b202b" justifyContent="center">
                <Box width="100%" padding={{ base: 4, xl: 8 }} maxWidth="1400px">
                    <Heading as="h2" color="white" mb={8}>SKILLS</Heading>
                    <Flex
                        flexDirection={{ base: "column", md: "row" }}
                        gap={4}
                        width={{ base: "100%", xl: "1200px" }}
                        color="white">
                        <Flex
                            flexDirection={{ base: "row", md: "column" }}
                            gap={4}
                            width={{ base: "100%", md: "100px" }}>
                            {heroSkills.map((skill, index) => (
                                <VStack
                                    key={index}
                                    width="100px"
                                    className="hero-skill"
                                    cursor="pointer"
                                    opacity={selectedSkill === index ? "1" : "0.5"}
                                    transform={selectedSkill === index ? "scale(1.15)" : "none"}
                                    onClick={() => handleSkillClick(index)}
                                    transition={"transform 0.3s ease-in-out"}
                                    _hover={{ transform: "scale(1.15)" }}
                                >
                                    <Box width={{ base: "30px", md: "40px", xl: "50px" }}>
                                        <Image src={getHeroSkillImage(skill.skill_image)} alt={`${skill.name} hero image`} />
                                    </Box>
                                    <Text textAlign="center" fontWeight="bold" fontSize={{ base: "8px", md: "10px", xl: "12px" }}>{skill.name.toUpperCase()}</Text>
                                </VStack>
                            ))}
                        </Flex>
                        <VStack alignItems="flex-start" height={{ base: "650px", sm: "550px", md: "530px", xl: "100%" }} padding={{ base: 0, lg: "20px" }}>
                            <Heading as="h4">
                                {heroSkills[selectedSkill].name}
                            </Heading>
                            {heroSkills[selectedSkill].rage_cost
                                ? <Box>
                                    <Text fontWeight="bold">Rage Skill</Text>
                                    <Text color="red" fontWeight="bold">Rage Cost: {heroSkills[selectedSkill].rage_cost}</Text>
                                </Box>
                                : <Text fontWeight="bold">Passive Skill</Text>}
                            <Text>
                                {formatDescription(heroSkills[selectedSkill].description)}
                            </Text>
                            {heroSkills[selectedSkill].upgrade_preview &&
                                <Box mt={4}>
                                    <Text fontWeight="bold" mb={2}>Upgrade Preview</Text>
                                    <Text>{formatDescription(heroSkills[selectedSkill].upgrade_preview)}</Text>
                                </Box>
                            }
                            <Text color="red" fontWeight="bold">
                                {selectedSkill > 0 && selectedSkill < 4
                                    ? `Unlocks at Hero level ${selectedSkill * 10} and ${selectedSkill + 1} Stars.`
                                    : selectedSkill === 4
                                        ? "Hero can learn Awakened Skill once they reach Level 40 and all their Skills are at max level."
                                        : ""}
                            </Text>
                        </VStack>
                    </Flex>
                </Box>
            </HStack>
        </>
    )
}

export default HeroSkill;