import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../graphql/queries";
import { Heading, HStack, Spinner } from "@chakra-ui/react";
import HeroCard from "../components/HeroCard"
import HeroEntity from "../entities/HeroEntity";
import { Link } from "react-router-dom";

const Hero = () => {
    const {data, error, loading} = useQuery(GET_ALL_HEROES);

    if(loading)
        return (<Spinner/>)

    if(error)
        return (<Heading as="h2">Something went wrong</Heading>);

    
    const heroes: HeroEntity[] = data.getAllHeroes;

    return (
        <HStack wrap="wrap" gap={8} margin="0 auto" width="100%" justifyContent="center" className="page">
            {heroes.map((hero, index) => (
                <Link to={`/heroes/${hero.name}`} key={index}>
                    <HeroCard heroName={hero.name} rairtyId={hero.rarity_id} />
                </Link>
            ))}
        </HStack>
    )
}

export default Hero;