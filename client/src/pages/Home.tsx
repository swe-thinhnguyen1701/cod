import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Box>
            <Link to="/hero-talent">Talent</Link>
            <Link to="/heroes">Heroes</Link>
        </Box>
    )
}

export default HomePage;