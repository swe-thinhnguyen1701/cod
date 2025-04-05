import { Box, Heading, Text } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";

const Effects = (attributeNames: string[], effectValues: string[][], currentLevel: number, maxLevel: number) => {
    return attributeNames.map((attributeName, index) =>
        <Box key={index}>
            <Text key={index}>
                {attributeName}
            </Text>
            {effectValues[index]?.map((inflictValue, index) => {
                if (index === 0 || index > maxLevel) return;
                return (
                    <Box key={index} as="span">
                        {index !== 1 && " / "}
                        <Text as="span" fontWeight={currentLevel === index ? "bold" : "normal"}>
                            {inflictValue}
                        </Text>
                    </Box>
                )
            })}
        </Box>
    );
}

const TalentDescription = () => {
    const { selectedTalent } = useTalentStore();

    if (!selectedTalent) return;

    const formatDescription = (description: string) => {
        let buffIndex = 0;
        let debuffIndex = 0;
        let inflictedIndex = 0;

        const currentLevel = selectedTalent.current_level;

        const parts = description.split(/(\{green\}|\{\/green\}|\{red\}|\{\/red\}|\{orange\}|\{\/orange\}|\{newline\}|\{\/newline\}|\{newlinex2\}|\{\/newlinex2\})/g);
        let currentColor: "green" | "red" | "orange" | null = null;

        return parts.map((part, index) => {
            switch (part) {
                case "{green}":
                    currentColor = "green";
                    return null;
                case "{/green}":
                    currentColor = null;
                    return null;
                case "{red}":
                    currentColor = "red";
                    return null;
                case "{/red}":
                    currentColor = null;
                    return null;
                case "{orange}":
                    currentColor = "orange";
                    return null;
                case "{/orange}":
                    currentColor = null;
                    return null;
                case "{newlinex2}":
                    return (
                        <Box key={index} as="span">
                            <br />
                            <br />
                        </Box>
                    );
                case "{/newlinex2}":
                    return null;
                case "{newline}":
                    return <br key={index} />;
                case "{/newline}":
                    return;
                default:
                    if (currentColor === "green") {
                        return (
                            <Text as="span" key={index} fontWeight="bold" color="green.400">
                                {selectedTalent.buff_values?.[buffIndex++]?.[currentLevel] ?? ""}
                            </Text>
                        );
                    } else if (currentColor === "red") {
                        return (
                            <Text as="span" key={index} fontWeight="bold" color="red.400">
                                {selectedTalent.debuff_values?.[debuffIndex++]?.[currentLevel] ?? ""}
                            </Text>
                        );
                    } else if (currentColor === "orange") {
                        return (
                            <Text as="span" key={index} fontWeight="bold" color="orange">
                                {selectedTalent.inflict_values?.[inflictedIndex++]?.[currentLevel] ?? ""}
                            </Text>
                        );
                    }
                    return <Text as="span" key={index}>{part}</Text>;
            }
        });
    };


    return (
        <Box padding={4}>
            <Heading as="h3" size="md" textAlign="center">
                {selectedTalent.name}
            </Heading>
            <Box>
                {formatDescription(selectedTalent.description)}
                {!selectedTalent.is_primary_core && !selectedTalent.is_secondary_core &&
                    <Box mt={4}>
                        <Text fontWeight="bold">
                            Upgrade Preview
                        </Text>
                        {selectedTalent.buff_att && selectedTalent.buff_values && Effects(
                            selectedTalent.buff_att,
                            selectedTalent.buff_values,
                            selectedTalent.current_level,
                            selectedTalent.max_level)}
                        {selectedTalent.debuff_att && selectedTalent.debuff_values && Effects(
                            selectedTalent.debuff_att,
                            selectedTalent.debuff_values,
                            selectedTalent.current_level,
                            selectedTalent.max_level)}
                        {selectedTalent.inflict_att && selectedTalent.inflict_values && Effects(
                            selectedTalent.inflict_att,
                            selectedTalent.inflict_values,
                            selectedTalent.current_level,
                            selectedTalent.max_level)}
                    </Box>}
            </Box>
        </Box>
    );
}

export default TalentDescription;