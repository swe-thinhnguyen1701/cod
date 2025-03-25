import { Box, Heading, Text } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";

const TalentDescription = () => {
    const { selectedTalent } = useTalentStore();

    if (!selectedTalent) return;

    const formatDescription = (description: string) => {
        return description.split(/(\{green\}|\{\/green\}|\{red\}|\{\/red\})/g).map((part, index) => {
            // Check if the previous part was an opening tag
            const prevPart = index > 0 ? description.split(/(\{green\}|\{\/green\}|\{red\}|\{\/red\})/g)[index - 1] : null;
            
            if (prevPart === "{green}") {
                return <Text as="span" fontWeight="bold" key={index} color="green">{part}</Text>;
            } else if (prevPart === "{red}") {
                return <Text as="span" fontWeight="bold" key={index} color="red">{part}</Text>;
            } else if (part === "{green}" || part === "{/green}" || part === "{red}" || part === "{/red}") {
                // Hide the tags themselves by returning an empty fragment
                return null;
            } else {
                return part;
            }
        }).filter(Boolean);
    }

    return (
        <Box padding={4}>
            <Heading as="h3" size="md" textAlign="center">
                <Text>{selectedTalent?.name}</Text>
            </Heading>
            {selectedTalent.isPrimaryCore || selectedTalent.isSecondaryCore
                ? <Box>{formatDescription(selectedTalent.description[0])}</Box>
                : <Box>
                    <Box mb={4}>
                        {selectedTalent?.description[0]}
                        <Text as="span" fontWeight="bold" color="green">
                            {selectedTalent?.buffValue[selectedTalent.level]}
                        </Text>
                        {selectedTalent?.description[1]}
                        <Text as="span" fontWeight="bold" color="red">
                            {selectedTalent.debuffValue && [selectedTalent.level]}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" >
                            Upgrade Preview
                        </Text>
                        <Text>
                            {selectedTalent?.preview} <br />
                            {selectedTalent?.buffValue.map((buffValue, index) => {
                                if (index === 0) return;
                                return (
                                    <Box key={index} as="span">
                                        {index !== 1 && " / "}
                                        <Text as="span" fontWeight={selectedTalent.level === index ? "bold" : "normal"}>
                                            {buffValue}
                                        </Text>
                                    </Box>
                                )
                            })}
                        </Text>
                    </Box>
                </Box>}
        </Box >
    );
}

export default TalentDescription;