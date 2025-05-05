import { Heading, Text, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SEO from "../components/SEO";

const aboutPageSEO = {
    title: "About - CoD Wiki",
    description: "Welcome to Call of Dragons Wiki (CoD Wiki) — a community-driven fan site dedicated to exploring and organizing everything related to the game Call of Dragons...",
    keywords: "CoD Wiki, Call of Dragons wiki, call of dragons wiki, call of dragons",
    type: "website"
}

const About = () => {
    return (
        <>
        <SEO page={aboutPageSEO} />
        <VStack maxW="900px" w="100%" p={4} m="0 auto" minH="80vh" align="start" spacing={6}>
            <Heading as="h1" size="xl">About Us</Heading>
            <Text>
                Welcome to Call of Dragons Wiki (CoD Wiki) — a community-driven fan site dedicated to exploring and organizing everything related to the game Call of Dragons. Whether you're a new player or a seasoned veteran, our goal is to provide a helpful and creative space to discover hero talents, build guides, and learn game mechanics.
            </Text>

            <Text>
                We are not affiliated with the official developers of Call of Dragons. This site was built by fans, for fans — designed to evolve as the game does. You can explore talents, strategize your builds, and contribute feedback to improve the site.
            </Text>

            <Text>
                If you enjoy using the Wiki and want to support continued updates and development, consider supporting us{" "}
                <Link as={RouterLink} to="https://ko-fi.com/codwiki" target="_blank" color="teal.500" fontWeight="bold">here</Link>.
            </Text>

            <Text>
                If you have any ideas to improve this site, please reach out to us via the{" "}
                <Link as={RouterLink} to="/contact" color="teal.500" fontWeight="bold">Contact</Link> page. We’re always looking for ways to enhance your experience.
            </Text>

            <Text>
                Thank you for being a part of our community!{"\n"}{"\n"}- The CoD Wiki Team
            </Text>
        </VStack>
        </>
    );
};

export default About;
