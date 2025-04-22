import { Link } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import codLogo from "../assets/cod-logo.png"
import HamburgerMenu from "./HamburgerMenu";
import DeskTopMenu from "./DesktopMenu";

const NavBar = () => {
    return (
        <Box bg="rgba(17, 17, 17, 0.91)" width="100%">
            <Flex maxWidth="1400px" margin="0 auto" justifyContent="space-between" alignItems="center" padding={4}>
                <Box width={{ base: "100px", md: "150px", lg: "200px" }}>
                    <Link to="/">
                        <Image src={codLogo} alt="Call of Dragons logo" />
                    </Link>
                </Box>
                <Box display={{ base: "block", lg: "none" }}>
                    <HamburgerMenu />
                </Box>
                <Box display={{ base: "none", lg: "block" }}>
                    <DeskTopMenu />
                </Box>
            </Flex>
        </Box>
    )
}

export default NavBar;