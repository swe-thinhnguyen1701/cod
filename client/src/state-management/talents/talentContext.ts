import React, { Dispatch } from "react";
import { Talent, TalentAction } from "./TalentProvider";

interface TalentContextType {
  talentLevel: number[][];
  remainingPoints: number;
  selectedTalent: Talent | null;
  dispatch: Dispatch<TalentAction>;
}

const TalentContext = React.createContext<TalentContextType>(
  {} as TalentContextType
);

export default TalentContext;
