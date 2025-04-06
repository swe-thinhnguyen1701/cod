import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../utils/queries";
import { Heading, HStack, Spinner } from "@chakra-ui/react";
import HeroCard from "../components/HeroCard"
import HeroIntity from "../entities/HeroEntity";

const Hero = () => {
    const {data, error, loading} = useQuery(GET_ALL_HEROES);

    if(loading)
        return (<Spinner/>)

    if(error)
        return (<Heading as="h2">Something went wrong</Heading>);

    
    const heroes: HeroIntity[] = data.getAllHeroes;

    return (
        <HStack wrap="wrap" gap={8} margin="0 auto" width="100%" justifyContent="center">
            {heroes.map((hero, index) => (<HeroCard key={index} hero={hero} />))}
        </HStack>
    )
}

export default Hero;