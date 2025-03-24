import { Box, Heading, Text } from "@chakra-ui/react";
import useTalent from "../state-management/talents/useTalent";

const TalentDescription = () => {
    const { selectedTalent } = useTalent();

    if (!selectedTalent) return;

    return (
        <Box padding={4}>
            <Heading as="h3" size="md" textAlign="center">
                <Text>{selectedTalent?.name}</Text>
            </Heading>
            <Box>
                <Box mb={3}>
                    {selectedTalent?.description[0]}
                    <Text as="span" color="green">
                        {selectedTalent?.value[selectedTalent.level]}
                    </Text>
                    {selectedTalent?.description[1]}
                </Box>
                <Box>
                    <Text fontWeight="bold" >
                        Upgrade Preview
                    </Text>
                    <Text>
                        {selectedTalent?.preview} <br />
                        {selectedTalent?.value.map((value, index) => {
                            if (index === 0) return;
                            return (
                                <Box key={index} as="span">
                                    {index !== 1 && " / "}
                                    <Text as="span" fontWeight={selectedTalent.level === index ? "bold" : "normal"}>
                                        {value}
                                    </Text>
                                </Box>
                            )
                        })}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default TalentDescription;