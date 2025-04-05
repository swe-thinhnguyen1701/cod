import { Box, HStack } from "@chakra-ui/react";
import RoleBadge from "./RoleBadge";

const GROUPS = [2, 3 ,4]

interface Props {
    selectedGroup: number;
    setSelectedGroup: (group: number) => void;
}

const TalentGroupButton = ({selectedGroup, setSelectedGroup}: Props) => {
    return (
        <>
            <HStack margin="30px 0" justifyContent="space-between">
                {GROUPS.map((group) => (
                    <Box transform={selectedGroup === group ? "scale(1.2)" : "unset"} className="hover-scale-up" key={group} onClick={() => setSelectedGroup(group)}>
                        <RoleBadge idx={group - 2} />
                    </Box>
                ))}
            </HStack>
        </>
    )
}

export default TalentGroupButton;