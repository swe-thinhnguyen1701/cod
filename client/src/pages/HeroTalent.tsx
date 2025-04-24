import { Box } from "@chakra-ui/react";
import HeroTalents from "../components/HeroTalents";

const HeroTalentPage = () => {
    return (
        <>
            <Box width="100%" className="page">
                {/* <Talent isSelected={false} isActive={true} /> */}
                <HeroTalents />
                {/* <RoleBadge /> */}
            </Box>
        </>
    )
}

export default HeroTalentPage;