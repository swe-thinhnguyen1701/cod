import {getArtifactImage} from "../services/getImages";
import ItemCard from "./ItemCard";


interface Props {
    artifactName: string,
    rarityId: number,
}

const ArtifactCard = ({artifactName, rarityId}: Props) => {
    return (
        <ItemCard itemName={artifactName} itemRarityId={rarityId} itemImageUrl={getArtifactImage(artifactName)} isZoomOut={true}/>
    )
}

export default ArtifactCard;