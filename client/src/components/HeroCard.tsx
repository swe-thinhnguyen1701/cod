import { Card, VStack, Image, Text, Box } from "@chakra-ui/react"
import {getGeneralHeroImage} from "../services/getImages"

interface Props {
    heroName: string,
    rairtyId: number
}

const HeroCard = ({heroName, rairtyId} : Props) => {

    return (
        <Card className={`hero-card ${rairtyId === 1 ? "legend" : rairtyId === 2 ? "epic" : "common"}`} borderRadius="10px">
            <VStack>
                <Box width="300px" height="290px">
                    <Image src={getGeneralHeroImage(heroName)} alt={heroName} className="hero-image" />
                </Box>
                <Text
                 fontWeight="bold"
                  className="hero-name"
                   width="100%"
                    padding={2}
                     textAlign="center"
                      borderRadius="0 0 10px 10px"
                      color="white">
                    {heroName.toUpperCase()}
                </Text>
            </VStack>
        </Card>
    )
}

export default HeroCard;