import { Box, Image, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import logo from "../assets/cod-logo-2.webp"
import codPhoneBackground from "../assets/cod-phone-background.jpg"
import DownloadLink from "../components/DownloadLink";
import HeroIntroduction from "../components/HeroIntroduction";
import { setPageTitle } from "../services/setTitlePage";

const videoUrl = "https://d3bhl6gkk81cq1.cloudfront.net/videos/intro.webm"

const HomePage = () => {
    setPageTitle("Call of Dragons Wiki");
    return (
        <>
            <Helmet>
                <title>Call of Dragons Wiki - Explore Heroes, Artifacts, and Pets</title>
                <meta name="description" content="Welcome to the Call of Dragons Wiki where you can discover all heroes, pets, artifacts, and more!" />
                <meta name="keywords" content="Call of Dragons, heroes, pets, wiki, artifacts" />
            </Helmet>
            <Box>
                <Box position="relative" mb={10}>
                    <Box>
                        <Box display={{ base: "none", md: "block" }}>
                            <video src={videoUrl} autoPlay muted loop width="100%">
                                Your browser does not support the video.
                            </video>
                        </Box>
                        <Box display={{ base: "block", md: "none" }}>
                            <Image src={codPhoneBackground} alt="Call of Dragons background image" />
                        </Box>
                    </Box>
                    <VStack position="absolute" zIndex={1} top="50%" left="50%" transform="translate(-50%, -50%)">
                        <Box display={{ base: "none", md: "flex" }} width={{ base: "32.55vw" }}>
                            <Image src={logo} alt="Call of Dragons logo" />
                        </Box>
                        <DownloadLink />
                    </VStack>
                </Box>
                <Box>
                    <HeroIntroduction />
                </Box>
            </Box>
        </>
    )
}

export default HomePage;