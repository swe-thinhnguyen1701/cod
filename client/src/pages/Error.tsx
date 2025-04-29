import { Link, useRouteError } from "react-router-dom";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import NavBar from "../components/NavBar";
import errorImg1 from "../assets/404-image-1.webp";
import errorImg2 from "../assets/404-image-2.webp";
import errorImg3 from "../assets/404-image-3.webp";
import SEO from "../components/SEO";

const images = [errorImg1, errorImg2, errorImg3];
const randomIndex = Math.floor(Math.random() * images.length);

const errorPageSEO = {
    title: "Error - CoD Wiki",
    description: "Oops! The page you are looking for does not exist.",
    keywords: "error, 404, page not found, CoD Wiki",
    type: "website"
}

const Error = () => {
    const error = useRouteError() as { status?: number };

    return (
        <>
        <SEO page={errorPageSEO} />
            <NavBar />
            <Flex minHeight="90vh" flexDirection="column" alignItems="center" padding={8}>
                <Box width={{ base: "200px", md: "250px" }}>
                    <Image src={images[randomIndex]} alt="Error emoji" width="100%" />
                </Box>
                <Heading as="h1">Oopse! We can't find that page.</Heading>
                <Text>{error?.status === 404 ? "Error code: 404" : "Something went wrong!"}</Text>
                <Link to="/">
                    <Text color="blue.500" textDecoration="underline">RETURN TO HOME</Text>
                </Link>
            </Flex>
        </>
    )
}

export default Error;