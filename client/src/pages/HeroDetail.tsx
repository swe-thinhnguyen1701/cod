import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_HERO_DETAIL_BY_NAME } from "../graphql/queries";
import HeroProfile from "../components/HeroProfile";
import HeroSkill from "../components/HeroSkill";
import SEO from "../components/SEO";
import useHeroStore from "../state-management/heroes/store";
import { Spinner, VStack } from "@chakra-ui/react";

const HeroDetailPage = () => {
    const { heroName: heroName } = useParams();
    const { loading, error, data } = useQuery(GET_HERO_DETAIL_BY_NAME, {
        variables: { heroName: heroName }
    });
    const { setHero } = useHeroStore();

    useEffect(() => {
        if (data?.getHeroDetailByName) {
            setHero(data.getHeroDetailByName);
        }
    }, [data]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        throw new Response("Hero not found", { status: 404 });
    }

    const heroDetailSEO = {
        title: `${heroName} - CoD Wiki`,
        description: `View ${heroName}'s skills, strengths, and battle stats. Master ${heroName} to dominate the battlefield!`,
        keywords: `Call of Dragons, ${heroName}, hero detail, skills, strengths`,
        type: "website"
    }

    return (
        <>
            <SEO page={heroDetailSEO} />
            <VStack justifyContent="center" gap={8} className="page">
                <HeroProfile />
                <HeroSkill />
            </VStack>
        </>
    )

}

export default HeroDetailPage;