import { UnorderedList, ListItem, Card, Heading, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react"
import { useRef, useState } from "react";

const DONATION_PRICES = ["$0.99", "$1.99", "$2.99", "$3.99", "$4.99"];

const DonationList = () => {
    const [selectedDonation, setSelectedDonation] = useState(0);
    const [customValue, setCustomValue] = useState("");
    const donationValue = useRef("0.99");

    const onSelect = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest("li")) {
            const id = parseInt(target.closest("li")?.id || "0");
            if (id < 5) {
                setCustomValue("");
                donationValue.current = DONATION_PRICES[id];
            }
            setSelectedDonation(id);
        }
    }

    const customDonation = (value: string) => {
        if (/^\d*\.?\d{0,2}$/.test(value) && value.length < 10) {
            donationValue.current = value;
            setCustomValue(value);
        }
    }

    return (
        <UnorderedList
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            listStyleType="none"
            margin={0}
            padding={0}
            onClick={(event) => onSelect(event)}
            maxWidth="600px"
        >
            {DONATION_PRICES.map((price, index) => (
                <ListItem key={index} id={`${index.toString()}`} cursor="pointer" value={price}>
                    <Card
                        padding={4}
                        bg={index === selectedDonation ? "teal.300" : "none"}
                        _hover={{ bg: "teal.500" }}
                        transition={"background 0.3s ease-in-out"}
                        width={{ base: "120px", md: "150px" }}
                    >
                        <Heading as="h3" textAlign="center">{price}</Heading>
                    </Card>
                </ListItem>
            ))}
            <ListItem id="5" width="100%" paddingLeft={{ base: 0, md: "60px" }} transition="padding 0.3s ease-in-out">
                <InputGroup maxWidth="200px" alignSelf="flex-start">
                    <InputLeftAddon>Custom</InputLeftAddon>
                    <Input
                        type="text"
                        placeholder="0.01"
                        minLength={1}
                        maxLength={8}
                        value={customValue}
                        onChange={event => customDonation(event.target.value)} />
                </InputGroup>
            </ListItem>
        </UnorderedList>
    )
}

export default DonationList;