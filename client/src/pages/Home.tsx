import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Box>
            <Link to="/hero-talent">Talent</Link>
        </Box>
    )
}

export default HomePage;