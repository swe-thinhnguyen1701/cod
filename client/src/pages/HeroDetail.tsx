import { useQuery } from "@apollo/client";
import { Heading, HStack, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GET_HERO_BY_NAME } from "../utils/queries";
import HeroProfile from "../components/HeroProfile";
import { useEffect } from "react";
import useHeroStore from "../state-management/heroes/store";

const HeroDetailPage = () => {
    const {heroName: heroName} = useParams();
    const {loading, error, data} = useQuery(GET_HERO_BY_NAME, {
        variables: {heroName: heroName}
    });
    const {setHero} = useHeroStore();

    // console.log(heroName);

    useEffect(() => {
        // console.log(data);
        if(data?.getHeroByName){
            setHero(data.getHeroByName);
            // console.log(data.getHeroByName);
        }
    }, [data]);

    if(loading) {
        return <Spinner />
    }

    if(error) {
        return <Heading as="h2">Something went wrong!</Heading>
    }

    

    return (
        <HStack justifyContent="center">
            <HeroProfile />
        </HStack>
    )

}

export default HeroDetailPage;