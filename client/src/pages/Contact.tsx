import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import ContactForm from "../components/ContactForm";
import SEO from "../components/SEO";

const contactPageSEO = {
    title: "Contact - CoD Wiki",
    description: "We would love to hear from your ideas about our product and improvement. Don't hesitate to contact us",
    keywords: "CoD Wiki contact, Call of Dragons wiki contact, call of dragons wiki contact",
    type: "website"
}

const Contact = () => {
    return (
        <>
        <SEO page={contactPageSEO} />
        <VStack width="100%" padding={4} minHeight="80vh">
            <Box width="100%" maxWidth="900px" mb={4}>
                <Heading as="h1" size="h1">Contact Us</Heading>
                <Text>
                <Text as="span" fontWeight="bold">Call of Dragons Wiki</Text> was created to help the community better understand and enjoy the game. Whether you're a dedicated community member or a casual visitor with feedback or feature ideas, we’d love to hear from you. Don’t hesitate—just fill out the form below and hit send!
                </Text>
            </Box>
            <Box width="100%" maxWidth="500px">
                <ContactForm />
            </Box>
        </VStack>
        </>
    )
}

export default Contact;