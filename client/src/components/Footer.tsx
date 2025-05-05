import { Box, Flex, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <VStack margin="0 auto" width="100%" bg="#292929" color="white" padding={4}>
                <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" width="100%" maxWidth="1400px" gap={8} mb={{base: 4, md: 8}}>
                    <VStack width="100%" maxWidth="800px">
                        <Heading as="h3">Call of Dragons Wiki</Heading>
                        <Text>This site is a fan-made project and is not affiliated with or endorsed by Call of Dragons or its developers.<br />Call of Dragons was made by Farlight Games</Text>
                    </VStack>
                    <Flex flexDirection={{ base: "column", md: "row" }} gap={8} alignItems="flex-start">
                        <Box>
                            <Heading as="h4" fontSize="1.1rem" mb={2}>Site</Heading>
                            <UnorderedList listStyleType="none" padding={0} margin={0}>
                                <ListItem>
                                    <Link to="/about" className="sub-link">About</Link>
                                </ListItem>
                                <ListItem>
                                    <Link to="/contact" className="sub-link">Contact</Link>
                                </ListItem>
                                <ListItem>
                                    <Link to="https://ko-fi.com/codwiki" target="_blank" className="sub-link">Support Us</Link>
                                </ListItem>
                            </UnorderedList>
                        </Box>
                    </Flex>
                </Flex>
                <Flex flexDirection={{ base: "column", md: "row" }} gap={{base: 2, md: 8}}>
                    <UnorderedList listStyleType="none" padding={0} margin={0} display="flex" gap={4} fontSize="11px">
                        <ListItem>
                            <Link to="/privacy-policy" className="sub-link">Privacy Policy</Link>
                        </ListItem>
                        <ListItem>
                            <Text color="grey">|</Text>
                        </ListItem>
                        <ListItem>
                            <Link to="/terms-of-use" className="sub-link">Terms of Use</Link>
                        </ListItem>
                    </UnorderedList>
                </Flex>
            </VStack>
        </>
    )
}

export default Footer;