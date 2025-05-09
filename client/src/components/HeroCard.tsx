import {getGeneralHeroImage} from "../services/getImages"
import ItemCard from "./ItemCard"

interface Props {
    heroName: string,
    rairtyId: number
}

const HeroCard = ({heroName, rairtyId} : Props) => {
    return(
        <ItemCard itemName={heroName} itemRarityId={rairtyId} itemImageUrl={getGeneralHeroImage(heroName)} />
    )
}

export default HeroCard;