import { Box, Heading, Text } from "@chakra-ui/react";

interface Talent {
    id: number
    name: string,
    description: string[],
    value: string[],
    preview: string,
    level: number,
    maxLevel: number,
}

interface Props {
    talent: Talent
}

const TalentDescription = ({ talent }: Props) => {
    return (
        <Box padding={4}>
            <Heading as="h3" size="md" textAlign="center">
                <Text>{talent.name}</Text>
            </Heading>
            <Box>
                <Box mb={3}>
                    {talent.description[0]}
                    <Text as="span" color="green">
                        {talent.value[talent.level]}
                    </Text>
                    {talent.description[1]}
                </Box>
                <Box>
                    <Text fontWeight="bold" >
                        Upgrade Preview
                    </Text>
                    <Text>
                        {talent.preview} <br />
                        {talent.value.map((value, index) => (
                            <Text key={index} as="span" fontWeight={talent.level === index ? "bold" : "normal"}>
                                {value}
                            </Text>
                        ))}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default TalentDescription;