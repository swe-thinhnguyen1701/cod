import { Card, VStack, Image, Text, Box } from "@chakra-ui/react"
import HeroIntity from "../entities/HeroEntity"

interface Props {
    hero: HeroIntity
}

const HeroCard = ({hero} : Props) => {

    return (
        <Card className={`hero-card ${hero.rarity_id === 1 ? "legend" : hero.rarity_id === 2 ? "epic" : "common"}`} borderRadius="10px">
            <VStack>
                <Box width="300px" height="290px">
                    <Image src={hero.image} alt={hero.name} className="hero-image" />
                </Box>
                <Text
                 fontWeight="bold"
                  className="hero-name"
                   width="100%"
                    padding={2}
                     textAlign="center"
                      borderRadius="0 0 10px 10px"
                      color="white">
                    {hero.name}
                </Text>
            </VStack>
        </Card>
    )
}

export default HeroCard;