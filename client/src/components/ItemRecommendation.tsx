import { Box, Card, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
    linkItem: string,
    imageUrl: string,
    itemName: string
}

const ItemRecommendation = ({ linkItem, imageUrl, itemName }: Props) => {
    return (
        <Link to={`${linkItem}`}>
            <Card
                className="item-card"
                borderRadius="10px"
            >
                <VStack>
                    <Box width="100px" height="100px" className="item-image">
                        <Image src={imageUrl} alt={`${itemName} image`} className="image" />
                    </Box>
                    <Text
                        fontWeight="bold"
                        className="hero-name"
                        width="100%"
                        padding={2}
                        textAlign="center"
                        borderRadius="0 0 10px 10px"
                        color="white">
                        {itemName.toUpperCase()}
                    </Text>
                </VStack>
            </Card>
        </Link>
    )
}

export default ItemRecommendation;