import { ReactNode, useReducer } from "react";
import TalentContext from "./talentContext";
import TALENT_MAP from "./fetchTalent";
import Talent from "../../entities/TalentEntity"

export interface TalentPointsAction {
    type: "ADD_POINT" | "REMOVE_POINT";
    row: number,
    col: number
}

interface State {
    prerequisite: number[][];
    remainingPoints: number;
    selectedTalent: Talent | null;
}

interface SelectedTalentAction {
    type: "SELECTED_TALENT";
    id: number;
}

export type TalentAction = TalentPointsAction | SelectedTalentAction;

const PREREQUISITE: number[][] = Array(3).fill(null).map(() => Array(9).fill(0));
const TOTAL_POINTS = 59;


const setTalentPoints = (state: State, row: number, col: number, step: number):State => {
    if (row === -1 || col === -1 || state.remainingPoints < 1) return state;

    const newTalentLevel = state.prerequisite.map(row => [...row]);
    newTalentLevel[row][col] += step;

    const originalTalent = state.selectedTalent;

    if (!originalTalent) return state;

    const updateSelectedTalent = {
        ...originalTalent,
        level: originalTalent.level + step
    }
    TALENT_MAP.set(updateSelectedTalent.id, updateSelectedTalent);

    console.log("Adding point to:", row, col, "Current level:", state.selectedTalent?.level);
    // console.log(originalTalent.level + step);
    // console.log(newTalentLevel);

    return {
        prerequisite: newTalentLevel,
        remainingPoints: state.remainingPoints - step,
        selectedTalent: updateSelectedTalent
    };
};

const TalentReducer = (state: { prerequisite: number[][]; remainingPoints: number; selectedTalent: Talent | null }, action: TalentAction): State => {
    switch (action.type) {
        case "ADD_POINT":
            return {
                ...state,
                ...setTalentPoints(state, action.row, action.col, 1)
            };
        case "REMOVE_POINT":
            return {
                ...state,
                ...setTalentPoints(state, action.row, action.col, -1)
            };
        case "SELECTED_TALENT":
            return {
                ...state,
                selectedTalent: TALENT_MAP.get(action.id) || null
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