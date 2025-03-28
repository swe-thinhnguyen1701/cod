import { Box, HStack } from "@chakra-ui/react";
import useTalentStore from "../state-management/talents/store";
import RoleBadge from "./RoleBadge";

const GROUPS = [2, 3 ,4]

const TalentGroupButton = () => {
    const { selectedGroup, selectGroup } = useTalentStore();

    return (
        <>
            <HStack margin="30px 0" justifyContent="space-between">
                {GROUPS.map((group) => (
                    <Box transform={selectedGroup === group ? "scale(1.2)" : "unset"} className="hover-scale-up" key={group} onClick={() => selectGroup(group)}>
                        <RoleBadge idx={group - 2} />
                    </Box>
                ))}
            </HStack>
        </>
    )
}

export default TalentGroupButton;