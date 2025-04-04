import { Box } from "@chakra-ui/react"

interface Props {
    top?: number;
    left?: number;
    isActive?: boolean;
}

const Line = ({top, left, isActive}: Props) => {
    return (
        <Box
         className="line"
         position="absolute"
         top={`${top}px`}
         left={`${left}px`}
         opacity={0.5}
         bg={isActive ? "#877344": "darkgrey"}
         />
    )
}

export default Line;