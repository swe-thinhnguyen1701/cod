import { useRef } from "react"
import { Link } from "react-router-dom";
import {
    Box,
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerContent,
    Image,
    Flex,
    UnorderedList,
    ListItem,
    Text,
    useDisclosure,
    useMediaQuery
} from "@chakra-ui/react"
import { FiMenu, FiX } from "react-icons/fi";
import codLogo from "../assets/cod-logo.png";
import { NAV_LINKS } from "../config/navLinks";

const HamburgerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLDivElement | null>(null);

    const [isLargeScreen] = useMediaQuery("(min-width: 62em)");

    if (isLargeScreen)
        return null;

    return (
        <>
            <Box
                ref={btnRef}
                onClick={onOpen}
                color="white"
                fontSize="30px"
                display={{ base: "block", lg: "none" }}
                padding={2}
                className="menu-btn"
                borderRadius="5px">
                <FiMenu />
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg={{ base: "#1f1f1f" }} color="white">
                    <DrawerBody padding={2}>
                        <Flex justifyContent="space-between" alignItems="center" mt={4}>
                            <Box width="100px">
                                <Image src={codLogo} alt="Call of Dragons logo" />
                            </Box>
                            <Box
                                onClick={onClose}
                                color="white"
                                fontSize="30px"
                                display={{ base: "block", lg: "none" }}
                                padding={2}
                                className="menu-btn"
                                borderRadius="5px">
                                <FiX />
                            </Box>
                        </Flex>
                        <UnorderedList listStyleType="none" margin={0} fontWeight="bold" mt={4} padding={0}>
                            {NAV_LINKS.map((link, index) => (
                                <ListItem key={index} className="list-item" fontWeight="bold" fontSize="18px" borderRadius="8px">
                                    <Link to={link.path} onClick={onClose}>
                                        <Text width="100%" padding={4}>
                                            {link.name}
                                        </Text>
                                    </Link>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default HamburgerMenu;