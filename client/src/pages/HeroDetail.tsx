import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_HERO_BY_NAME } from "../graphql/queries";
import HeroProfile from "../components/HeroProfile";
import HeroSkill from "../components/HeroSkill";
import useHeroStore from "../state-management/heroes/store";
import { Heading, HStack, Spinner, VStack } from "@chakra-ui/react";

const HeroDetailPage = () => {
    const { heroName: heroName } = useParams();
    const { loading, error, data } = useQuery(GET_HERO_BY_NAME, {
        variables: { heroName: heroName }
    });
    const { setHero } = useHeroStore();

    useEffect(() => {
        if (data?.getHeroByName) {
            setHero(data.getHeroByName);
        }
    }, [data]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <Heading as="h2">Something went wrong!</Heading>
    }



    return (
        <VStack justifyContent="center" gap={8}>
            <HeroProfile />
            <HStack width="100%" justifyContent="center" bg="#1b202b">
                <HeroSkill />
            </HStack>
        </VStack>
    )

}

export default HeroDetailPage;