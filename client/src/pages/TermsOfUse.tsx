import { Box, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import SEO from "../components/SEO";

const termOfUsePageSEO = {
    title: "Term of Use - CoD Wiki",
    description: "Call of Dragons Wiki term of use",
    keywords: "CoD Wiki term of use, Call of Dragons wiki term of use, call of dragons wiki term of use, cod term of use, call of dragons term of use",
    type: "article"
}

const TermsOfUse = () => {
    return (
        <>
        <SEO page={termOfUsePageSEO} />
        <VStack width="100%">
            <VStack alignItems="flex-start" mt={8} maxWidth={"900px"} width="100%" padding={4}>
                <Heading as="h1" size="h1" textAlign="center" mb={8}>Call of Dragons Wiki Terms of Use</Heading>
                <Box mb={4}>
                    <Text fontWeight="bold">Last Modified: January 01, 2025</Text>
                    <Text>
                        Welcome to Call of Dragons Wiki. By accessing or using this Website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Website.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">1. Fan Content Disclaimer</Heading>
                    <Text>
                        This is a fan-made website for the Call of Dragons community. It is not affiliated with, endorsed, sponsored, or approved by Farlight Games or any related entity. All trademarks and game content are the property of their respective owners.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">2. Intellectual Property</Heading>
                    <Text>
                        All original content on this Website (e.g. code, layout, user interface, design, charts, and original written content) is owned by Call of Dragons Wiki. Game assets (e.g. images, names, character data) are used solely for informational and non-commercial purposes under fair use.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">3. Usage Rules</Heading>
                    <Text>
                        You agree to use this Website for personal and non-commercial use only. You may not:
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                    Copy, reproduce, or redistribute Website content without permission.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Use the Website for illegal or harmful activities.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Attempt to disrupt the functionality or security of the Website.
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">4. No Warranties</Heading>
                    <Text>
                        This Website is provided "as is." We make no warranties regarding the accuracy, completeness, or availability of any content. Use the site at your own risk.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">5. Limitation of Liability</Heading>
                    <Text>
                        We shall not be held liable for any direct or indirect damages resulting from the use or inability to use the Website, even if we were advised of the possibility of such damages.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">6. Changes to Terms</Heading>
                    <Text>
                        We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page, and continued use of the Website constitutes acceptance of the new terms.
                    </Text>
                </Box>
            </VStack>
        </VStack>
        </>
    )
}

export default TermsOfUse;