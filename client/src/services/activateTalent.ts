const activateTalent = (group: number, position: number, prerequisite: number[][]): boolean => {
    
    if(group === 0)
        return position === 0 ? true : prerequisite[0][position - 1] >= 3;
    if(group === 1)
        return prerequisite[0][2] >= 3;
    if(position === 0 || position === 4)
        return position === 0 ? prerequisite[1][0] === 1 : prerequisite[group][3] === 1;
    return prerequisite[group][position - 1] >= 5;
}

export default activateTalent;