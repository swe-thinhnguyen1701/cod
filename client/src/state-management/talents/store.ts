import { create } from "zustand";
import TALENT_MAP from "./fetchTalent";
import { Talent } from "./fetchTalent";

interface TalentStore {
  remainingPoints: number;
  prerequisite: number[][];
  selectedTalent: Talent | null;
  talentMap: Map<number, Talent>;
  trackingTalent: Map<number, Set<number>>;
  selectedGroup: number;
  modifyTalentPoints: (step: number) => void;
  modifySpecialTalentPoints: () => void;
  selectTalent: (id: number) => void;
  selectGroup: (group: number) => void;
}

const useTalentStore = create<TalentStore>((set) => ({
  remainingPoints: 59,
  prerequisite: Array(5)
    .fill(null)
    .map(() => Array(8).fill(0)),
  selectedTalent: null,
  talentMap: new Map(TALENT_MAP),
  trackingTalent: new Map<number, Set<number>>(),
  selectedGroup: 2,
  modifyTalentPoints: (step: number) => {
    set((store) => {

      if (store.remainingPoints === 0 || store.remainingPoints > 59) return store;

      const group = store.selectedTalent ? store.selectedTalent.group : -1;
      const position = store.selectedTalent ? store.selectedTalent.position : -1;
      if (group === -1 || position === -1) return store;

      const updatePrerequisite = JSON.parse(JSON.stringify(store.prerequisite));
      updatePrerequisite[group][position] += step;

      const updateSelectedTalent = store.selectedTalent as Talent;
      updateSelectedTalent.currentLevel += step;

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
          for (let i = group + 1; i < 19; i++) {
            if (updateTrackingTalent.has(i)) {
              updateTrackingTalent.get(i)?.forEach((id) => {
                const updateTalent = updateTalentMap.get(id) as Talent;
                refundPoints += updateTalent.currentLevel;
                updatePrerequisite[updateTalent.group][updateTalent.position] -=
                  updateTalent.currentLevel;
                updateTalent.currentLevel = 0;
                updateTalentMap.set(id, updateTalent);
              });
              updateTrackingTalent.delete(i);
            }
          }
          const removeList: number[] = [];
          updateTrackingTalent.get(group)?.forEach((id) => {
            const updateTalent = updateTalentMap.get(id) as Talent;
            if (updateTalent.position > position) {
              refundPoints += updateTalent.currentLevel;
              updatePrerequisite[updateTalent.group][updateTalent.position] -=
                updateTalent.currentLevel;
              updateTalent.currentLevel = 0;
              updateTalentMap.set(id, updateTalent);
              removeList.push(id);
            }
          });

          removeList.forEach((id) => {
            updateTrackingTalent.get(0)?.delete(id);
          });
        }
      }

      return {
        prerequisite: updatePrerequisite,
        remainingPoints: store.remainingPoints - step + refundPoints,
        selectedTalent: updateSelectedTalent,
        talentMap: updateTalentMap,
        trackingTalent: updateTrackingTalent,
      };
    });
  },
  modifySpecialTalentPoints: () => {
    set((store) => {
      if (store.remainingPoints === 0) return store;

      const group = store.selectedTalent?.group;
      const position = store.selectedTalent?.position;

      if (!group || !position)
        return store;

      const updateSelectedTalent = store.selectedTalent as Talent;
      updateSelectedTalent.currentLevel = 1;

      const updateTalentMap = new Map(store.talentMap);
      let neiborTalent: Talent;
      if (
        updateTalentMap.has(updateSelectedTalent.id - 1) &&
        updateTalentMap.get(updateSelectedTalent.id - 1)?.position === position
      ) {
        neiborTalent = updateTalentMap.get(
          updateSelectedTalent.id - 1
        ) as Talent;
      } else {
        neiborTalent = updateTalentMap.get(
          updateSelectedTalent.id + 1
        ) as Talent;
      }
      neiborTalent.currentLevel = 0;
      updateTalentMap.set(neiborTalent.id, neiborTalent);
      updateTalentMap.set(updateSelectedTalent.id, updateSelectedTalent);

      const updateTrackingTalent = store.trackingTalent;
      updateTrackingTalent.get(group)?.add(updateSelectedTalent.id);
      updateTrackingTalent.get(group)?.delete(neiborTalent.id);

      const updatePrerequisite = JSON.parse(JSON.stringify(store.prerequisite));
      const updateRemainingPoints = updatePrerequisite[group][position] === 1 ? store.remainingPoints : store.remainingPoints - 1;
      updatePrerequisite[group][position] = 1;

      return {
        remainingPoints: updateRemainingPoints,
        prerequisite: updatePrerequisite,
        selectedTalent: updateSelectedTalent,
        talentMap: updateTalentMap,
        trackingTalent: updateTrackingTalent,
      };
    });
  },
  selectTalent: (id: number) => {
    set((store) => ({
      ...store,
      selectedTalent: store.talentMap.get(id) as Talent,
    }));
  },
  selectGroup: (group: number) => {
    set((store) => ({
      ...store,
      selectedGroup: group,
    }));
  }
}));

const isUpdate = (
  group: number,
  position: number,
  newPrerequisite: number[][]
): boolean => {
  if (group === 0)
    return position === 0 ? true : newPrerequisite[group][position] < 3;
  if (group === 1) return true;
  if (position === 3) return true;
  return newPrerequisite[group][position] < 5;
};

export default useTalentStore;
