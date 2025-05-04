import { Heading, Text, VStack } from "@chakra-ui/react";
import DonationList from "../components/DonationList";

const Donation = () => {
    return (
        <VStack minHeight="80vh" className="page">
            <VStack gap={2}>
                <Heading as="h1" size="h1">Donation</Heading>
                <Text>
                    Your generosity helps us continue building meaningful tools that make a difference. Every contribution, big or small, supports our mission and fuels future development.
                </Text>
            </VStack>
            <DonationList />
        </VStack>
    )
}

export default Donation;