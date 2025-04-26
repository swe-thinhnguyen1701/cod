import { Box } from "@chakra-ui/react";
import HeroTalents from "../components/HeroTalents";
import { setPageTitle } from "../services/setTitlePage";

const HeroTalentPage = () => {
    setPageTitle("Hero Talents");
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