import { useState } from "react";
import useHeroStore from "../state-management/heroes/store";
import { Box, Flex, Image, Heading, VStack, Text } from "@chakra-ui/react";
import { getHeroSkillImage } from "../services/getImages";

const HeroSkill = () => {
    const heroSkills = useHeroStore((state) => state.hero?.Skills);
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

    return (
        <Flex flexDirection={{ base: "column", md: "row" }} gap={4} width={{ base: "100%", xl: "1200px" }} color="white" padding="20px 0">
            <Flex
                flexDirection={{ base: "row", md: "column" }}
                gap={4}
                padding={2}
                width={{ base: "100%", md: "100px" }}
                overflowX={{ base: "auto", md: "visible" }}>
                {heroSkills.map((skill, index) => (
                    <VStack key={index} width="70px"className="hero-skill">
                        <Box opacity={selectedSkill === index ? "1" : "0.7"} onClick={() => handleSkillClick(index)} width={{ base: "30px", md: "40px", xl: "50px" }}>
                            <Image src={getHeroSkillImage(skill.name)} alt={`${skill.name} image`} />
                        </Box>
                        <Text textAlign="center" fontWeight="bold" fontSize={{ base: "8px", md: "10px", xl: "12px" }}>{skill.name.toUpperCase()}</Text>
                    </VStack>
                ))}
            </Flex>
            <VStack alignItems="flex-start" padding={4} height={{ base: "700px", sm: "550px", md: "100%" }}>
                <Heading as="h4">
                    {heroSkills[selectedSkill].name}
                </Heading>
                {heroSkills[selectedSkill].isRage
                    ? <Box>
                        <Text fontWeight="bold">Rage Skill</Text>
                        <Text color="red">Rage Cost: 1,000</Text>
                    </Box>
                    : <Text fontWeight="bold">Passive Skill</Text>}
                <Text>
                    {formatDescription(heroSkills[selectedSkill].description)}
                </Text>
                {/* {heroSkills[selectedSkill].isUltimate && <Text color="red">Hero can learn Awakened Skill once they reach Level 40 and all their Skills are at max level.</Text>} */}
                <Text color="red" fontWeight="bold">
                    {selectedSkill > 0 && selectedSkill < 4
                        ? `Unlocks at Hero level ${selectedSkill * 10} and ${selectedSkill + 1} Stars.`
                        : selectedSkill === 4
                            ? "Hero can learn Awakened Skill once they reach Level 40 and all their Skills are at max level."
                            : ""}
                </Text>
            </VStack>
        </Flex>
    )
}

export default HeroSkill;