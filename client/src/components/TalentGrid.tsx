import useTalentStore from "../state-management/talents/store";
import useTalent from "../state-management/talents/useTalent";


const TalentGrid = () => {
    // const {remainingPoints} = useTalent()
    const {remainingPoints}  = useTalentStore();
    return(
        <h2>{remainingPoints}</h2>
    )
}

export default TalentGrid;