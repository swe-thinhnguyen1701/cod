import { create } from "zustand";
import TalentEntity from "../../entities/TalentEntity";

interface ModifyTalentPoint {
  prerequisite: number[][];
  talentMap: Map<string, TalentEntity>;
  selectedTalent: TalentEntity;
  trackingTalent: Map<number, Set<string>>;
}

interface AdvanceModifyTalentPoint {
  prerequisite: number[][];
  talentMap: Map<string, TalentEntity>;
  trackingTalent: Map<number, Set<string>>;
  refundPoints: number;
}

/**
 * remainingPoints: total points allow user to use.
 * prerequisite: a list keeps track to determine whether the next Talent Core is activated.
 * talentList: a list of talent cores being used to display on browser.
 * talentMap: a map of talent cores being used to keep track updating of a talent core.
 * trackingTalent: a map keeps tracking when user removes points from a specific talent core.
 * isHeroSelected: id of the hero being selected.
 * selectedTalent: the talent core being selected.
 *
 * initialize():
 * WHEN a method is selected,
 * THEN it initializes the talent map, the talent list, and hero id.
 * THEN it resets remainingPoints back to 59, and refresh trackingTalent.
 */
interface TalentStore {
  remainingPoints: number;
  prerequisite: number[][];
  talentList: TalentEntity[][] | null;
  talentMap: Map<string, TalentEntity> | null;
  trackingTalent: Map<number, Set<string>>;
  isHeroSelected: boolean;
  selectedTalent: TalentEntity | null;

  initialize: (rawTalentList: TalentEntity[][]) => void;
  addPoint: () => void;
  addPointToSpecialTalent: () => void;
  reducePoint: () => void;
  setSelectedTalent: (talentKey: string | null) => void;
  reset: () => void;
}

/**
 * helper method to generate a talent list which is used for frontend layout
 *
 * @param rawTalentList that fetched from backend
 * @returns a modified talent list
 */
const setTalentList = (rawTalentList: TalentEntity[][]): TalentEntity[][] => {
  const talentList: TalentEntity[][] = [];

  // console.log(rawTalentList);

  let arr: TalentEntity[] = [];
  let idx = 0;

  for (let i = 0; i < 3; i++) {
    for (let position = 0; position < i + 1; position++) {
      const talent = {
        ...rawTalentList[0][idx],
        max_level: 3,
        current_level: 0,
        group: 0,
        position: i,
        key: keyGenerator(),
      };
      idx++;
      arr.push(talent);
    }

    talentList.push(arr);
    arr = [];
  }

  arr.push({
    ...rawTalentList[1][0],
    current_level: 0,
    group: 1,
    position: 0,
    key: keyGenerator(),
  });
  talentList.push(arr);
  arr = [];

  for (let group = 2; group < 5; group++) {
    idx = 0;
    for (let position = 0; position < 8; position++) {
      const length = idx === 0 ? 1 : idx === 7 || idx === 18 ? 2 : 3;
      for (let j = 0; j < length; j++) {
        const talent = {
          ...rawTalentList[group][idx],
          current_level: 0,
          group: group,
          position: position,
          key: keyGenerator(),
        };

        idx++;
        arr.push(talent);
      }

      talentList.push(arr);
      arr = [];
    }
  }

  return talentList;
};

const setTalentMap = (
  modifiedTalentList: TalentEntity[][]
): Map<string, TalentEntity> => {
  const talentMap = new Map<string, TalentEntity>();

  for (let i = 0; i < modifiedTalentList.length; i++) {
    for (let j = 0; j < modifiedTalentList[i].length; j++) {
      talentMap.set(modifiedTalentList[i][j].key, modifiedTalentList[i][j]);
    }
  }

  return talentMap;
};

const resetPrerequisiteHelper = (): number[][] => {
  const arr = Array(5)
    .fill(null)
    .map(() => Array(8).fill(0));

  return arr;
};

const modifyTalentPointHelper = (
  point: number,
  data: ModifyTalentPoint
): ModifyTalentPoint => {
  const { selectedTalent, talentMap, prerequisite, trackingTalent } = data;

  const updatedPrerequisite = prerequisite.map((row, rowIdx) =>
    rowIdx === selectedTalent.group
      ? row.map((val, colIdx) =>
          colIdx === selectedTalent.position ? val + point : val
        )
      : row
  );

  const updatedSelectedTalent = {
    ...selectedTalent,
    current_level: selectedTalent.current_level + point,
  };

  const updatedTalentMap = new Map(talentMap);
  updatedTalentMap.set(updatedSelectedTalent.key, updatedSelectedTalent);

  const updateTrackingTalent = new Map(trackingTalent);
  if (updateTrackingTalent.has(selectedTalent.group))
    updateTrackingTalent.get(selectedTalent.group)?.add(selectedTalent.key);
  else
    updateTrackingTalent.set(
      selectedTalent.group,
      new Set([selectedTalent.key])
    );

  return {
    prerequisite: updatedPrerequisite,
    talentMap: updatedTalentMap,
    selectedTalent: updatedSelectedTalent,
    trackingTalent: updateTrackingTalent,
  };
};

const advanceModifyTalentPointHelper = (
  group: number,
  position: number,
  data: ModifyTalentPoint
): AdvanceModifyTalentPoint => {
  const updateTrackingTalent = new Map(data.trackingTalent);
  const updatePrerequisite = JSON.parse(JSON.stringify(data.prerequisite));
  const updateTalentMap = new Map(data.talentMap);

  let refundPoints = 0;
  if (isUpdatable(group, position, updatePrerequisite)) {
    for (let i = group + 1; i < 5; i++) {
      if (updateTrackingTalent.has(i)) {
        updateTrackingTalent.get(i)?.forEach((key) => {
          const talent = updateTalentMap.get(key) as TalentEntity;

          refundPoints += talent.current_level;
          updatePrerequisite[talent.group][talent.position] -=
            talent.current_level;
          talent.current_level = 0;

          updateTalentMap.set(key, talent);
        });

        updateTrackingTalent.delete(i);
      }
    }

    const removeList: string[] = [];
    updateTrackingTalent.get(group)?.forEach((key) => {
      const talent = updateTalentMap.get(key) as TalentEntity;
      if (talent.position > position) {
        refundPoints += talent.current_level;
        updatePrerequisite[talent.group][talent.position] -=
          talent.current_level;
        talent.current_level = 0;
        updateTalentMap.set(key, talent);
        removeList.push(key);
      }
    });

    removeList.forEach((key) => updateTrackingTalent.get(group)?.delete(key));
  }

  return {
    prerequisite: updatePrerequisite,
    trackingTalent: updateTrackingTalent,
    talentMap: updateTalentMap,
    refundPoints: refundPoints,
  };
};

const keyGenerator = (): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";

  for (let i = 0; i < 6; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }

  return key;
};

const isUpdatable = (
  group: number,
  position: number,
  prerequisite: number[][]
): boolean => {
  if (group === 0)
    return position === 0 ? true : prerequisite[group][position] < 3;
  if (group === 1) return true;
  if (position === 3) return true;
  return prerequisite[group][position] < 5;
};

const initTalentGrid = (): number[][] => {
  const arr = Array(5)
    .fill(null)
    .map(() => Array(8).fill(0));

  // 2: 3: 7 + 4(0)
  // 2: 7: 7 + 4(1)
  // 3: 3: 7 + 4(2)
  // 3: 7: 7 + 4(3)
  // 4: 3: 7 + 4(4)
  // 4: 7: 7 + 4(5)
  let step = 0;
  for (let i = 2; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      const col = j === 0 ? 3 : 7;
      arr[i][col] = 7 + 4 * step;
      step++;
    }
  }

  return arr;
};

const isPositionExisted = (
  group: number,
  position: number,
  talentList: TalentEntity[][],
  talentMap: Map<string, TalentEntity>
): boolean => {
  const arr = initTalentGrid();

  for (let i = 0; i < 2; i++) {
    const row = arr[group][position];

    if (talentMap.get(talentList[row][i].key)?.current_level !== 0)
      return false;
  }

  return true;
};

const getNeighborTalent = (
  group: number,
  position: number,
  key: string,
  talentList: TalentEntity[][]
): TalentEntity => {
  const arr = initTalentGrid();
  const row = arr[group][position];

  return talentList[row][0].key === key ? {...talentList[row][1]} : {...talentList[row][0]}
};

const useTalentStore = create<TalentStore>((set) => ({
  remainingPoints: 59,
  prerequisite: resetPrerequisiteHelper(),
  talentList: null,
  talentMap: null,
  trackingTalent: new Map(),
  isHeroSelected: false,
  selectedTalent: null,

  initialize: (rawTalentList: TalentEntity[][]) => {
    const talentList = setTalentList(rawTalentList);
    const talentMap = setTalentMap(talentList);
    const resetPrerequisite = resetPrerequisiteHelper();
    set({
      remainingPoints: 59,
      prerequisite: resetPrerequisite,
      talentList,
      talentMap,
      trackingTalent: new Map(),
      isHeroSelected: true,
      selectedTalent: null,
    });
  },
  addPoint: () => {
    set((store) => {
      if (
        store.remainingPoints < 1 ||
        !store.selectedTalent ||
        !store.talentMap
      )
        return store;

      const data: ModifyTalentPoint = {
        prerequisite: store.prerequisite,
        talentMap: store.talentMap,
        selectedTalent: store.selectedTalent,
        trackingTalent: store.trackingTalent,
      };

      const updateData = modifyTalentPointHelper(1, data);

      return {
        ...store,
        remainingPoints: store.remainingPoints - 1,
        prerequisite: updateData.prerequisite,
        talentMap: updateData.talentMap,
        trackingTalent: updateData.trackingTalent,
        selectedTalent: updateData.selectedTalent,
      };
    });
  },
  reducePoint: () => {
    set((store) => {
      if (
        !store.talentMap ||
        !store.selectedTalent ||
        store.selectedTalent.current_level === 0 ||
        store.remainingPoints > 59
      )
        return store;

      const data: ModifyTalentPoint = {
        prerequisite: store.prerequisite,
        talentMap: store.talentMap,
        selectedTalent: store.selectedTalent,
        trackingTalent: store.trackingTalent,
      };

      const updateData = modifyTalentPointHelper(-1, data);
      const group = updateData.selectedTalent.group;
      const position = updateData.selectedTalent.position;
      const advanceUpdateData = advanceModifyTalentPointHelper(
        group,
        position,
        updateData
      );

      return {
        ...store,
        remainingPoints:
          store.remainingPoints + 1 + advanceUpdateData.refundPoints,
        prerequisite: advanceUpdateData.prerequisite,
        talentMap: advanceUpdateData.talentMap,
        trackingTalent: advanceUpdateData.trackingTalent,
        selectedTalent: updateData.selectedTalent,
      };
    });
  },
  addPointToSpecialTalent: () => {
    set((store) => {
      if (
        store.remainingPoints === 0 ||
        !store.selectedTalent ||
        !store.talentList ||
        !store.talentMap
      )
        return store;

      const group = store.selectedTalent.group;
      const position = store.selectedTalent.position;
      if (
        isPositionExisted(group, position, store.talentList, store.talentMap)
      ) {
        const data: ModifyTalentPoint = {
          prerequisite: store.prerequisite,
          talentMap: store.talentMap,
          trackingTalent: store.trackingTalent,
          selectedTalent: store.selectedTalent,
        };

        const updateData = modifyTalentPointHelper(1, data);

        return {
          ...store,
          remainingPoints: store.remainingPoints - 1,
          prerequisite: updateData.prerequisite,
          talentMap: updateData.talentMap,
          trackingTalent: updateData.trackingTalent,
          selectedTalent: updateData.selectedTalent,
        };
      }

      // STEP 1: selectedTalen.current_level = 1;
      const updateSelectedTalent = store.selectedTalent;
      updateSelectedTalent.current_level = 1;

      // STEP 2: update in the talentMap
      const updateTalentMap = new Map(store.talentMap);
      updateTalentMap.set(updateSelectedTalent.key, updateSelectedTalent);

      // STEP 3: add selectedTalent into the tracking talent
      const updateTrackingTalent = new Map(store.trackingTalent);
      updateTrackingTalent
        .get(updateSelectedTalent.group)
        ?.add(updateSelectedTalent.key);

      // STEP 4: find neighbor talent
      const neiborTalent = getNeighborTalent(
        group,
        position,
        store.selectedTalent.key,
        store.talentList
      );

      // STEP 5: reset its current_level = 0
      neiborTalent.current_level = 0;

      // STEP 6: update in the talentMap
      updateTalentMap.set(neiborTalent.key, neiborTalent);

      // STEP 7: remove neighbor talent from tracking talent.
      updateTrackingTalent.get(group)?.delete(neiborTalent.key);

      return {
        ...store,
        talentMap: updateTalentMap,
        trackingTalent: updateTrackingTalent,
        selectedTalent: updateSelectedTalent,
      };
    });
  },
  setSelectedTalent: (talentKey) => {
    set((store) => {
      if (!talentKey)
        return {
          ...store,
          selectedTalent: null,
        };

      return {
        ...store,
        selectedTalent: store.talentMap?.get(talentKey),
      };
    });
  },
  reset: () => {
    set({
      remainingPoints: 59,
      prerequisite: resetPrerequisiteHelper(),
      talentList: null,
      talentMap: null,
      trackingTalent: new Map(),
      isHeroSelected: false,
      selectedTalent: null,
    });
  },
}));

export default useTalentStore;
