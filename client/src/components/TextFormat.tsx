import { Text } from "@chakra-ui/react";

interface Props {
    text: string
}

const formatDescription = (description: string) => {

    const parts = description.split(/(\{bold\}|\{\/bold\}|\{newline\}|\{lightgrey\}|\{\/lightgrey\}|\{green\}|\{\/green\})/g);
    let effect: "bold" | "lightgrey" | "green" | null = null;

    return parts.map((part, index) => {
        switch (part) {
            case "{bold}":
                effect = "bold";
                return null;
            case "{/bold}":
                effect = null;
                return null;
            case "{lightgrey}":
                effect = "lightgrey";
                return null;
            case "{/lightgrey}":
                effect = null;
                return null;
            case "{green}":
                effect = "green";
                return null;
            case "{/green}":
                effect = null;
                return null;
            case "{newline}":
                return <br key={index} />;
            default:
                if (effect === "bold") {
                    return (
                        <Text as="span" key={index} fontWeight="bold">
                            {part}
                        </Text>
                    );
                } else if (effect === "lightgrey") {
                    return (
                        <Text as="span" key={index} color="gray.500">
                            {part}
                        </Text>
                    );
                } else if (effect === "green") {
                    return (
                        <Text as="span" key={index} fontWeight="bold" color="teal.300">
                            {part}
                        </Text>
                    );
                }
                return <Text as="span" key={index}>{part}</Text>;
        }
    });
};

const TextFormat = ({text}: Props) => {
    return (
        <Text>
            {formatDescription(text)}
        </Text>
    )
}

export default TextFormat;