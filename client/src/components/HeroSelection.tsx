import { useState, useEffect } from "react";
import { Image, HStack, Text, Menu, MenuButton, MenuItem, Button, MenuList } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_TALENT_CORES_FROM_HERO } from "../utils/queries";
import useTalentStore from "../state-management/talents/store";

interface Hero {
    id: number;
    name: string;
    avatar: string;
}

interface Props {
    heroes: Hero[];
}

// BUG: farming heroes does not get a right talent cores.

const HeroSelection = ({ heroes }: Props) => {
    const { initialize, reset } = useTalentStore();
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    const { data } = useQuery(GET_TALENT_CORES_FROM_HERO, {
        variables: { heroId: selectedHero?.id },
        skip: !selectedHero
    });

    useEffect(() => {
        if (data?.getTalentCoresFromHero) {
            initialize(data.getTalentCoresFromHero);
        }
    }, [data]);

    const handleClick = (hero: Hero | null) => {
        if (!hero) {
            setSelectedHero(null);
            reset();
            return;
        }
        setSelectedHero(hero);
    }

    return (
        <>
            <Menu>
                <MenuButton as={Button} height="35px">
                    <HStack>
                        {selectedHero && (
                            <Image
                                src={selectedHero.avatar}
                                alt="hero"
                                width="30px"
                                height="30px"
                            />
                        )}
                        <Text>{selectedHero ? selectedHero.name : "Select Hero"}</Text>
                    </HStack>
                </MenuButton>
                <MenuList maxH="300px" overflowY="auto">
                    <MenuItem onClick={() => handleClick(null)}>Select Hero</MenuItem>
                    {heroes.map((hero) => (
                        <MenuItem key={hero.name} onClick={() => handleClick(hero)}>
                            <HStack>
                                <Image src={hero.avatar} alt="hero" width={"30px"} height={"30px"} />
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