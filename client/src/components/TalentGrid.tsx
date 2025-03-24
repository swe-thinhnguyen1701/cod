import useTalent from "../state-management/talents/useTalent";


const TalentGrid = () => {
    const {remainingPoints} = useTalent()
    return(
        <h2>{remainingPoints}</h2>
    )
}

export default TalentGrid;