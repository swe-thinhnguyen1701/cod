import { Link } from "react-router-dom";
import { UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { NAV_LINKS } from "../config/navLinks";

const DeskTopMenu = () => {
    return (
        <UnorderedList listStyleType="none" margin={0} fontWeight="bold" padding={0} display="flex" color="white">
            {NAV_LINKS.map((link, index) => (
                <ListItem key={index} className="list-item" fontWeight="bold" fontSize="18px" borderRadius="8px">
                    <Link to={link.path}>
                        <Text width="100%" padding={4}>
                            {link.name}
                        </Text>
                    </Link>
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default DeskTopMenu;