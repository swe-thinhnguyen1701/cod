import { ReactNode, useReducer } from "react";
import TalentContext from "./talentContext";
import TALENT_MAP from "./fetchTalent";
import TalentEnitity from "../../entities/TalentEntity";

export interface TalentPointsAction {
    type: "ADD_POINT" | "REMOVE_POINT";
    group: number,
    position: number
}

interface State {
    prerequisite: number[][];
    remainingPoints: number;
    selectedTalent: TalentEnitity | null;
}

interface SelectedTalentAction {
    type: "SELECTED_TALENT";
    id: number;
}

export type TalentAction = TalentPointsAction | SelectedTalentAction;

const PREREQUISITE: number[][] = Array(19).fill(null).map(() => Array(8).fill(0));
const TOTAL_POINTS = 59;
const TRACKING_TALENT = new Map<number, Set<number>>();

const setTalentPoints = (state: State, group: number, position: number, step: number):State => {
    if (group === -1 || position === -1 || state.remainingPoints < 1) return state;

    const newPrerequisite = JSON.parse(JSON.stringify(state.prerequisite));
    newPrerequisite[group][position] += step;

    const originalTalent = state.selectedTalent as TalentEnitity;

    const updateSelectedTalent = {
        ...originalTalent,
        level: originalTalent.level + step
    }
    TALENT_MAP.set(updateSelectedTalent.id, updateSelectedTalent);

    const totalReturnPoints = updateTracking(updateSelectedTalent, step > 0, newPrerequisite);

    return {
        prerequisite: newPrerequisite,
        remainingPoints: state.remainingPoints - step + totalReturnPoints,
        selectedTalent: updateSelectedTalent
    };
};

const updateTracking = (talent: TalentEnitity, isAdd: boolean, prerequisite: number[][]): number => {
    if (isAdd) {
        if (TRACKING_TALENT.has(talent.group))
            TRACKING_TALENT.get(talent.group)?.add(talent.id);
        else
            TRACKING_TALENT.set(talent.group, new Set([talent.id]));
        return 0;
    }

    const shouldUpdate = isUpdate(talent.group, talent.position, prerequisite);
    if (!shouldUpdate)
        return 0;

    let totalReturnPoints = 0;
    const updatePrequisite = JSON.parse(JSON.stringify(prerequisite));

    for (let i = 2; i < 19; i++) {
        if (TRACKING_TALENT.has(i)) {
            TRACKING_TALENT.get(i)?.forEach(id => {
                const updateTalent = TALENT_MAP.get(id) as TalentEnitity;
                totalReturnPoints += updateTalent.level;
                updatePrequisite[updateTalent.group][updateTalent.position] -= updateTalent.level;
                updateTalent.level = 0;
                TALENT_MAP.set(id, updateTalent);
            });
            TRACKING_TALENT.delete(i);
        }
    }

    if (talent.group === 0) {
        const removeList: number[] = [];
        TRACKING_TALENT.get(0)?.forEach(id => {
            const updateTalent = TALENT_MAP.get(id) as TalentEnitity;
            console.log(updateTalent.id);
            if (updateTalent.position > talent.position) {
                totalReturnPoints += updateTalent.level;
                updatePrequisite[updateTalent.group][updateTalent.position] -= updateTalent.level;
                updateTalent.level = 0;
                removeList.push(id);
                TALENT_MAP.set(id, updateTalent);
            }
            console.log(JSON.stringify(updatePrequisite));
        });

        for (const id of removeList) {
            TRACKING_TALENT.get(0)?.delete(id);
        }
    }

    return totalReturnPoints;
}

const isUpdate = (group: number, position: number, newPrerequisite: number[][]): boolean => {
    // console.log(`Checking update for group ${group} and position ${position}`);

    if(group === 0)
        return position === 0 ? true : newPrerequisite[group][position] < 3;
    if(group === 1)
        return true;
    if(position === 3)
        return true;
    return newPrerequisite[group][position] < 5;
}

const TalentReducer = (state: State, action: TalentAction): State => {
    switch (action.type) {
        case "ADD_POINT":
            return setTalentPoints(state, action.group, action.position, 1);
        case "REMOVE_POINT":
            return setTalentPoints(state, action.group, action.position, -1);
        case "SELECTED_TALENT":
            return {
                ...state,
                selectedTalent: TALENT_MAP.get(action.id) as TalentEnitity
            };
        default:
            return state;
    }
}

interface Props {
    children: ReactNode
}

const TalentProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(TalentReducer, {
        prerequisite: PREREQUISITE,
        remainingPoints: TOTAL_POINTS,
        selectedTalent: null
    });

    return (
        <TalentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TalentContext.Provider>
    )
}

export default TalentProvider;