import { Box, Text, Image } from "@chakra-ui/react";
import useRoleStore from "../state-management/roles/store";

const ROLE_BORDER_COLORS = ["#961212", "#ac5e04", "#088db2"];
const ROLE_BG_COLORS = ["#200000", "#3a1c0d", "#0d2f3a"];
const BG_COLORS = ["rgb(133, 23, 23)", "rgb(172, 94, 4)", "rgb(8, 141, 178)"];
const ROLE_ICON_SIZE = "20px";

interface Props {
    idx: number;
}

const RoleBadge = ({ idx }: Props) => {
    const {roles} = useRoleStore();

    if(!roles) return null;

    return (
        <>
            <Box
                bg={`linear-gradient(90deg, ${BG_COLORS[idx]} 0%, rgba(0,0,0,1) 90%)`}
                borderRadius="5px"
                // width={{base: "60px", md: "100px"}} //reduce 30px
                position="relative"
                pl={5}
                pr={2}
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
                    top="-2px"
                    left="-3px">
                    <Image transform="scale(2)" className="role-icon-image" src={roles[idx].image} height={ROLE_ICON_SIZE} />
                </Box>
                <Text fontWeight="bold" fontSize="10px" color="#fff">{roles[idx].name}</Text>

            </Box>
        </>
    )
}

export default RoleBadge;