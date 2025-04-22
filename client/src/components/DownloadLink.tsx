import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import linkBackground from "../assets/link-background.png";

const DownloadLink = () => {
    return (
        <Box bgImage={linkBackground} bgSize="cover" bgRepeat="no-repeat" padding={4} className="download-link">
            <Link to="https://callofdragons.farlightgames.com/" target="_blank">
                <Text as="span" fontWeight="bold">PLAY FOR FREE</Text>
            </Link>
        </Box>
    )
}

export default DownloadLink;