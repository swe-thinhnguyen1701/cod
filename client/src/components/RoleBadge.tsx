import { Box, Text, Image } from "@chakra-ui/react";
import sampleImg from "../assets/Rally.png";

const ROLES = ["Infantry", "Cavalry", "Ranged"];
const ROLE_BORDER_COLORS = ["#961212", "#ac5e04", "#088db2"];
const ROLE_BG_COLORS = ["#200000", "#3a1c0d", "#0d2f3a"];
const BG_COLORS = ["rgb(133, 23, 23)", "rgb(172, 94, 4)", "rgb(8, 141, 178)"];
const ROLE_ICON_SIZE = "33px";

interface Props {
    idx: number;
}

const RoleBadge = ({ idx }: Props) => {
    return (
        <>
            <Box
                bg={`linear-gradient(90deg, ${BG_COLORS[idx]} 0%, rgba(0,0,0,1) 70%)`}
                borderRadius="4px"
                width={{base: "80px", md: "100px"}}
                position="relative"
                pl={7}
                paddingTop="3px"
                paddingBottom="5px"
                className="role-badge"
                cursor="default">
                <Box
                    className="role-icon-container"
                    border={`solid 2px ${ROLE_BORDER_COLORS[idx]}`}
                    bg={ROLE_BG_COLORS[idx]}
                    borderRadius="50%"
                    width={ROLE_ICON_SIZE}
                    height={ROLE_ICON_SIZE}
                    position="absolute"
                    top="-4px"
                    left="-13px">
                    <Image transform="scale(2.2)" className="role-icon-image" src={sampleImg} height={ROLE_ICON_SIZE} />
                </Box>
                <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color="#fff">{ROLES[idx]}</Text>

            </Box>
        </>
    )
}

export default RoleBadge;