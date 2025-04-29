import { Box } from "@chakra-ui/react";
import HeroTalents from "../components/HeroTalents";
import SEO from "../components/SEO";
import useTalentStore from "../state-management/talents/store";
import { useEffect } from "react";

const heroTalentPage = {
    title: "Hero Talents - CoD Wiki",
    description: "Explore the hero talents in the Call of Dragons Wiki. Discover the best talents for your favorite heroes.",
    keywords: "Call of Dragons, hero talents, wiki, best talents",
    type: "website"
}

const HeroTalentPage = () => {
    const { reset } = useTalentStore();
    useEffect(() => {
        reset();
    }, []);
    return (
        <>
            <SEO page={heroTalentPage}/>
            <Box width="100%" className="page">
                <HeroTalents />
            </Box>
        </>
    )
}

export default HeroTalentPage;