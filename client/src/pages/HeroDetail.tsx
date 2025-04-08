import { useQuery } from "@apollo/client";
import { Box, Heading, HStack, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GET_HERO_BY_NAME } from "../utils/queries";
import HeroProfile from "../components/HeroProfile";

const HeroDetailPage = () => {
    const {heroName: heroName} = useParams();
    const {loading, error, data} = useQuery(GET_HERO_BY_NAME, {
        variables: {heroName: heroName}
    });

    // console.log(heroName);

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