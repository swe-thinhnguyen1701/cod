import { ReactNode, useReducer } from "react";
import TalentContext from "./talentContext";
import TALENT_MAP from "./fetchTalent";

export interface Talent {
    id: number;
    name: string;
    description: string[];
    value: string[];
    preview: string;
    level: number;
    maxLevel: number;
    role: number;
    group: number;
}

export interface TalentPointsAction {
    type: "ADD_POINT" | "REMOVE_POINT";
    row: number,
    col: number
}

interface State {
    talentLevel: number[][];
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


const setTalentPoints = (state: State, row: number, col: number, step: number) => {
    if (row === -1 || col === -1 || state.remainingPoints < 1) return state;

    const newTalentLevel = state.talentLevel.map(row => [...row]);
    newTalentLevel[row][col]++;
    
    const originalTalent = state.selectedTalent;

    if(!originalTalent) return;

    const updateSelectedTalent = {
        ...originalTalent,
        level: originalTalent.level + step
    }
    TALENT_MAP.set(updateSelectedTalent.id, updateSelectedTalent);

    console.log("Adding point to:", row, col, "Current level:", state.selectedTalent?.level);

    return {
        talentLevel: newTalentLevel,
        remainingPoints: state.remainingPoints - step,
        selectedTalent: updateSelectedTalent
    };
};

const TalentReducer = (state: { talentLevel: number[][]; remainingPoints: number; selectedTalent: Talent | null }, action: TalentAction): State => {
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
        talentLevel: PREREQUISITE,
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