import { Card, VStack, Image, Text, Box } from "@chakra-ui/react"

interface Props {
    itemName: string,
    itemRarityId: number,
    itemImageUrl: string,
    isZoomOut?: boolean | false,
}

const ItemCard = ({ itemName, itemRarityId, itemImageUrl, isZoomOut}: Props) => {

    return (
        <Card
            className={`item-card ${itemRarityId === 1 ? "legend" : itemRarityId === 2 ? "epic" : "common"} ${isZoomOut ? "zoom-out" : ""}`}
            borderRadius="10px"
        >
            <VStack>
                <Box width="300px" height="290px" className="item-image">
                    <Image src={itemImageUrl} alt={itemName} className="image" />
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
    )
}

export default ItemCard;