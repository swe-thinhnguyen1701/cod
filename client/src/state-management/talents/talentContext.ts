import React, { Dispatch } from "react";
import { TalentAction } from "./TalentProvider";
import TalentEntity from "../../entities/TalentEntity";

interface TalentContextType {
  prerequisite: number[][];
  remainingPoints: number;
  selectedTalent: TalentEntity | null;
  dispatch: Dispatch<TalentAction>;
}

const TalentContext = React.createContext<TalentContextType>(
  {} as TalentContextType
);

export default TalentContext;
