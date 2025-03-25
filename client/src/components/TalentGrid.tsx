import useTalentStore from "../state-management/talents/store";

const TalentGrid = () => {
    // const {remainingPoints} = useTalent()
    const {remainingPoints}  = useTalentStore();
    return(
        <h2>{remainingPoints}</h2>
    )
}

export default TalentGrid;