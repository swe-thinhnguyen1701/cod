import { Box, Image, VStack } from "@chakra-ui/react";
import logo from "../assets/cod-logo-2.webp"
import codPhoneBackground from "../assets/cod-phone-background.jpg"
import DownloadLink from "../components/DownloadLink";

const videoUrl = "https://d3bhl6gkk81cq1.cloudfront.net/videos/intro.webm"

const HomePage = () => {
    return (
        <Box>
            <Box maxWidth="1900px" position="relative">
                <Box>
                    <Box display={{ base: "none", md: "block" }}>
                        <video src={videoUrl} autoPlay muted loop height="200">
                            Your browser does not support the video.
                        </video>
                    </Box>
                    <Box display={{base: "block", md: "none"}}>
                        <Image  src={codPhoneBackground} alt="Call of Dragons background image" />
                    </Box>
                </Box>
                <VStack position="absolute" zIndex={1} top="50%" left="50%" transform="translate(-50%, -50%)">
                    <Box display={{base: "none", md: "flex"}} width={{ base: "32.55vw" }}>
                        <Image src={logo} alt="Call of Dragons logo" />
                    </Box>
                    <DownloadLink />
                </VStack>
            </Box>
        </Box>
    )
}

export default HomePage;