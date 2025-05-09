import {getArtifactImage} from "../services/getImages";
import ItemCard from "./ItemCard";


interface Props {
    name: string,
    rarityId: number,
}

const ArtifactCard = ({name, rarityId}: Props) => {
    return (
        <ItemCard itemName={name} itemRarityId={rarityId} itemImageUrl={getArtifactImage(name)} />
    )
}

export default ArtifactCard;