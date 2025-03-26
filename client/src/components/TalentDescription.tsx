import { Box, Heading, Text } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";
import TalentEnitity from "../entities/TalentEntity";

const sample: TalentEnitity = {
    id: 25,
    name: "Bane of Darkness",
    description: ["Your Legion deals ", " more Peacekeeping damage."],
    buffValue: ["0%", "1%", "2%", "3%"],
    preview: "Damage dealt during Peacekeeping bonus",
    level: 0,
    maxLevel: 5,
    group: 2,
    position: 6,
    isPrimaryCore: false,
    isSecondaryCore: false
}

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
                <Text>Overall Attack</Text>
            </Heading>
            {selectedTalent.isPrimaryCore || selectedTalent.isSecondaryCore
                ? <Box>{formatDescription(sample.description[0])}</Box>
                : <Box>
                    <Box mb={4}>
                        {sample?.description[0]}
                        <Text as="span" fontWeight="bold" color="green">
                            {sample.buffValue[sample.level]}
                        </Text>
                        {sample.description[1]}
                        <Text as="span" fontWeight="bold" color="red">
                            {sample.debuffValue && [sample.level]}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold" >
                            Upgrade Preview
                        </Text>
                        <Text>
                            {sample.preview} <br />
                            {sample.buffValue.map((buffValue, index) => {
                                if (index === 0) return;
                                return (
                                    <Box key={index} as="span">
                                        {index !== 1 && " / "}
                                        <Text as="span" fontWeight={sample.level === index ? "bold" : "normal"}>
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