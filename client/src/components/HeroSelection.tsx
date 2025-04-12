import { useState, useEffect } from "react";
import { Image, HStack, Text, Menu, MenuButton, MenuItem, Button, MenuList } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_TALENT_CORES_FROM_HERO, GET_ROLES_FROM_HERO } from "../graphql/queries";
import useTalentStore from "../state-management/talents/store";
import useRoleStore from "../state-management/roles/store";
import { getHeroAvatar } from "../services/getImages";

interface Hero {
    id: string;
    name: string;
    avatar: string;
}

interface Props {
    heroes: Hero[];
}

const HeroSelection = ({ heroes }: Props) => {
    const { initialize, reset } = useTalentStore();
    const { setRoles } = useRoleStore();
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    const { data: talentCoresData } = useQuery(GET_TALENT_CORES_FROM_HERO, {
        variables: { heroId: selectedHero?.id },
        skip: !selectedHero
    });

    const { data: rolesData } = useQuery(GET_ROLES_FROM_HERO, {
        variables: { heroId: selectedHero?.id },
        skip: !selectedHero
    });

    useEffect(() => {
        if (talentCoresData?.getTalentCoresFromHero && rolesData?.getRolesFromHero) {
            initialize(talentCoresData.getTalentCoresFromHero);
            setRoles(rolesData.getRolesFromHero);
        }
    }, [talentCoresData, rolesData, selectedHero]);

    const handleClick = (hero: Hero | null) => {
        if(!hero && !selectedHero) {
            return;
        }

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
                                src={getHeroAvatar(selectedHero.name)}
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
                                <Image src={getHeroAvatar(hero.name)} alt="hero" width={"30px"} height={"30px"} />
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