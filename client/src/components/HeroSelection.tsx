import { useState } from "react";
import { Image, HStack, Text, Menu, MenuButton, MenuItem, Button, MenuList } from "@chakra-ui/react";
import sampleHero from "../assets/Syndrion.png"

const heroes = Array.from({ length: 50 }, (_, i) => ({
    name: `Hero ${i + 1}`,
    image: sampleHero,
}));

const HeroSelection = () => {
    const [selectedName, setSelectedName] = useState("Select Hero");
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleClick = (name: string, image: any) => {
        setSelectedName(name);
        setSelectedImage(image);
   
    }

    return (
        <>
            <Menu>
                <MenuButton as={Button} height="35px">
                    <HStack>
                        {selectedImage && <Image src={selectedImage} alt="hero" width="30px" height="30px" />}
                        <Text>{selectedName}</Text>
                    </HStack>
                </MenuButton>
                <MenuList maxH="300px" overflowY="auto">
                   {heroes.map((hero) => (
                        <MenuItem key={hero.name} onClick={() => handleClick(hero.name, hero.image)}>
                            <HStack>
                                <Image src={hero.image} alt="hero" width={"30px"} height={"30px"}/>
                                <Text>{hero.name}</Text>
                            </HStack>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}

export default HeroSelection;