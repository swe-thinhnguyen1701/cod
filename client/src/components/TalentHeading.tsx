import { Image, Text, HStack, Box } from "@chakra-ui/react";
import useRoleStore from "../state-management/roles/store";
import sampleBg from "../assets/ring-bg.webp"
import RoleEntity from "../entities/RoleEntity";

const foundation = {
    id: "-1",
    name: "Foudation",
    description: "The foundation for all Talents, and a prerequisite for Core Talents",
    image: "https://d3bhl6gkk81cq1.cloudfront.net/hero-roles/Foundation.webp"
}

interface Props {
    idx: number;
}

const Heading = (data: RoleEntity) => {
    return (
        <HStack className="talent-description" position="relative">
            <Box backgroundImage={sampleBg} width="50px" height="50px">
                <Image src={data.image} alt="role" width="100%" />
            </Box>
            <Text fontSize="lg" fontWeight="bold">{data.name}</Text>
            <Text className="talent-description-text" position="absolute" bottom="0">{data.description}</Text>
        </HStack>
    )
}

const TalentHeading = ({ idx }: Props) => {
    const roles = useRoleStore(state => state.roles);

    if (!roles) {
        return null;
    }

    return (idx === -1 ? Heading(foundation) : Heading(roles[idx]));
}

export default TalentHeading;