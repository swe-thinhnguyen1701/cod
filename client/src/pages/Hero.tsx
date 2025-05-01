import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../graphql/queries";
import { Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import HeroCard from "../components/HeroCard"
import SEO from "../components/SEO";
import HeroEntity from "../entities/HeroEntity";
import { Link } from "react-router-dom";

const Hero = () => {
    const { data, error, loading } = useQuery(GET_ALL_HEROES);
    const heroPageSEO = {
        title: "Heroes - CoD Wiki",
        description: "Explore the heroes in the Call of Dragons Wiki. Discover their roles, skills, and battle stats.",
        keywords: "Call of Dragons, heroes, wiki, roles, skills",
        type: "website"
    }

    if (loading)
        return (<Spinner />)

    if (error)
        throw new Response("Internal Error", { status: 500 });

    const heroes: HeroEntity[] = data.getAllHeroes;

    return (
        <>
            <SEO page={heroPageSEO} />
            <VStack pt={8}>
                <VStack mb={8}>
                    <Text fontWeight="500">SELECT YOUR</Text>
                    <Heading as="h1" size="h1">Hero</Heading>
                    <Text textAlign="center">With more than 40 heroes, you will find a good pair to form a legion</Text>
                </VStack>
                <HStack wrap="wrap" gap={8} margin="0 auto" width="100%" maxWidth="1900px" justifyContent="center" className="page">
                    {heroes.map((hero, index) => (
                        <Link to={`/heroes/${hero.name}`} key={index}>
                            <HeroCard heroName={hero.name} rairtyId={hero.rarity_id} />
                        </Link>
                    ))}
                </HStack>
            </VStack >
        </>
    )
}

export default Hero;