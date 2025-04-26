import { Box } from "@chakra-ui/react";
import HeroTalents from "../components/HeroTalents";
import { setPageTitle } from "../services/setTitlePage";
import { Helmet } from "react-helmet";

const HeroTalentPage = () => {
    setPageTitle("Hero Talents");
    return (
        <>
            <Helmet>
                <title>Hero Talents</title>
                <meta
                    name="description"
                    content="Hero talent simulation tool to build the best talents for your favorite heroes in Call of Dragons." />
            </Helmet>
            <Box width="100%" className="page">
                <HeroTalents />
            </Box>
        </>
    )
}

export default HeroTalentPage;