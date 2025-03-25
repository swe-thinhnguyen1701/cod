import { create } from "zustand";
import TalentEnitity from "../../entities/TalentEntity";
import TALENT_MAP from "./fetchTalent";

interface TalentStore {
  remainingPoints: number;
  prerequisite: number[][];
  selectedTalent: TalentEnitity | null;
  talentMap: Map<number, TalentEnitity>;
  trackingTalent: Map<number, Set<number>>;
  modifyTalentPoints: (group: number, position: number, step: number) => void;
  selectTalent: (id: number) => void;
}

const useTalentStore = create<TalentStore>((set) => ({
  remainingPoints: 59,
  prerequisite: Array(19)
    .fill(null)
    .map(() => Array(8).fill(0)),
  selectedTalent: null,
  talentMap: TALENT_MAP,
  trackingTalent: new Map<number, Set<number>>(),
  modifyTalentPoints: (group: number, position: number, step: number) => {
    set((store) => {
      const updatePrerequisite = JSON.parse(JSON.stringify(store.prerequisite));
      updatePrerequisite[group][position] += step;

      const updateSelectedTalent = store.selectedTalent as TalentEnitity;
      updateSelectedTalent.level += step;

      const updateTalentMap = new Map(store.talentMap);
      updateTalentMap.set(updateSelectedTalent.id, updateSelectedTalent);

      const updateTrackingTalent = store.trackingTalent;

      let refundPoints = 0;

      if (step > 0) {
        if (updateTrackingTalent.has(group))
          updateTrackingTalent.get(group)?.add(updateSelectedTalent.id);
        else
          updateTrackingTalent.set(group, new Set([updateSelectedTalent.id]));
      } else {
        if (isUpdate(group, position, updatePrerequisite)) {
          for (let i = 2; i < 19; i++) {
            if (updateTrackingTalent.has(i)) {
              updateTrackingTalent.get(i)?.forEach((id) => {
                const updateTalent = updateTalentMap.get(id) as TalentEnitity;
                refundPoints += updateTalent.level;
                updatePrerequisite[updateTalent.group][updateTalent.position] -=
                  updateTalent.level;
                updateTalent.level = 0;
                updateTalentMap.set(id, updateTalent);
              });
              updateTrackingTalent.delete(i);
            }
          }

          if (group === 0) {
            const removeList: number[] = [];
            updateTrackingTalent.get(0)?.forEach((id) => {
              const updateTalent = updateTalentMap.get(id) as TalentEnitity;
              if (updateTalent.position > position) {
                refundPoints += updateTalent.level;
                updatePrerequisite[updateTalent.group][updateTalent.position] -=
                  updateTalent.level;
                updateTalent.level = 0;
                updateTalentMap.set(id, updateTalent);
                removeList.push(id);
              }
            });

            removeList.forEach((id) => {
              updateTrackingTalent.get(0)?.delete(id);
            });
          }
        }
      }

      return {
        ...store,
        prerequisite: updatePrerequisite,
        remainingPoints: store.remainingPoints - step + refundPoints,
        selectedTalent: updateSelectedTalent,
        talentMap: updateTalentMap,
        trackingTalent: updateTrackingTalent,
      };
    });
  },
  selectTalent: (id: number) => {
    set((store) => ({
      ...store,
      selectedTalent: store.talentMap.get(id) as TalentEnitity,
    }));
  },
}));

const isUpdate = (
  group: number,
  position: number,
  newPrerequisite: number[][]
): boolean => {
  // console.log(`Checking update for group ${group} and position ${position}`);

  if (group === 0)
    return position === 0 ? true : newPrerequisite[group][position] < 3;
  if (group === 1) return true;
  if (position === 3) return true;
  return newPrerequisite[group][position] < 5;
};

export default useTalentStore;
