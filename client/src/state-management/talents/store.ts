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
  isQualified: (talentKey: string) => boolean;
  isRollback: (talentKey: string) => boolean;
  setRollbackTalentCore: (talentKey: string) => void;
  reset: () => void;
}

let rollbackMap = new Map<string, TalentEntity>();

/**
 * Generates a structured talent list used for frontend layout and identifying neighboring special talent cores.
 *
 * This method processes raw talent data fetched from the backend, assigns properties such as max level, current
 * level, group, position, and a unique key, then organizes them into a structured list.
 *
 * @param rawTalentList - A 2D array of TalentEntity objects fetched from the backend.
 * @returns A modified 2D array of TalentEntity objects structured for frontend use.
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
        // const flag = rawTalentList[group][idx].extra_prerequisite;
        const talent = {
          ...rawTalentList[group][idx],
          current_level: 0,
          group: group,
          position: position,
          key: keyGenerator(),
          prerequisite_talent_key: null,
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

/**
 * Generates a talent map from the given talent list to facilitate updating talent cores  when adding or removing
 * points, ensuring consistent data on the frontend.
 *
 * This method creates a map where each key corresponds to the unique key of a talent core,  and the value is
 * the corresponding TalentEntity object.
 *
 * @param modifiedTalentList - A 2D array of TalentEntity objects representing the modified talent list.
 * @returns A Map where the key is the unique identifier of a talent core (talent key), and the value is the
 *          corresponding TalentEntity object.
 */
const setTalentMap = (
  modifiedTalentList: TalentEntity[][]
): Map<string, TalentEntity> => {
  const talentMap = new Map<string, TalentEntity>();

  for (let i = 0; i < modifiedTalentList.length; i++) {
    for (let j = 0; j < modifiedTalentList[i].length; j++) {
      if (modifiedTalentList[i][j].extra_prerequisite) {
        modifiedTalentList[i][j] = {
          ...modifiedTalentList[i][j],
          prerequisite_talent_key: modifiedTalentList[i - 1][j].key,
        };
      }
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
  const trackingTalent = data.trackingTalent; //new Map();
  const prerequisite = data.prerequisite; //JSON.parse(JSON.stringify());
  const talentMap = data.talentMap; //new Map();

  if (
    !isUpdatable(group, position, prerequisite) &&
    prerequisite[group][position] > 4
  ) {
    return {
      prerequisite: prerequisite,
      trackingTalent: trackingTalent,
      talentMap: talentMap,
      refundPoints: 0,
    };
  }

  let refundPoints = 0;
  if (isUpdatable(group, position, prerequisite)) {
    for (let i = group + 1; i < 5; i++) {
      if (trackingTalent.has(i)) {
        trackingTalent.get(i)?.forEach((key) => {
          const talent = talentMap.get(key) as TalentEntity;

          refundPoints += talent.current_level;
          prerequisite[talent.group][talent.position] -= talent.current_level;
          talent.current_level = 0;

          talentMap.set(key, talent);
        });

        trackingTalent.delete(i);
      }
    }

    rollbackMap = new Map<string, TalentEntity>();
  }

  const removeList: string[] = [];
  trackingTalent.get(group)?.forEach((key) => {
    const talent = talentMap.get(key) as TalentEntity;
    if (talent.position > position) {
      refundPoints += talent.current_level;
      prerequisite[talent.group][talent.position] -= talent.current_level;
      talent.current_level = 0;
      talentMap.set(key, talent);
      removeList.push(key);
    }
  });

  removeList.forEach((key) => trackingTalent.get(group)?.delete(key));

  return {
    prerequisite: prerequisite,
    trackingTalent: trackingTalent,
    talentMap: talentMap,
    refundPoints: refundPoints,
  };
};

/**
 * Generates a unique 6-character key consisting of lowercase letters [a-z], uppercase letters [A-Z], and
 * digits [0-9].
 *
 * This method creates a random string that can be used as a unique key, typically for identifying a talent
 * core in the system.
 *
 * @returns A 6-character string composed of randomly selected characters from [a-z], [A-Z], and [0-9].
 */
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
  return group === 1;
  // if (group === 1) return true;
  // if (position === 3) return true;
  // return prerequisite[group][position] < 5;
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

/**
 * Finds a neighbor talent core in the same group
 *
 * This method finds a neighbor talent core with given group and position. Since there is only talent cores
 *
 * @param group
 * @param position
 * @param key
 * @param talentList
 * @returns
 */
const getNeighborTalent = (
  group: number,
  position: number,
  key: string,
  talentList: TalentEntity[][]
): TalentEntity => {
  const arr = initTalentGrid();
  const row = arr[group][position];

  return talentList[row][0].key === key
    ? { ...talentList[row][1] }
    : { ...talentList[row][0] };
};

const rollback = (talent: TalentEntity, data: AdvanceModifyTalentPoint): AdvanceModifyTalentPoint => {
  let refundPoints = talent.current_level;
  const updateTalent = {
    ...talent,
    current_level: 0,
  };

  const group = talent.group;
  const position = talent.position;

  const updatePrerequisite = JSON.parse(JSON.stringify(data.prerequisite));
  updatePrerequisite[group][position] -= refundPoints;

  const updateTalentMap = new Map(data.talentMap);
  updateTalentMap.set(talent.key, updateTalent);

  const updateTrackingTalent = new Map(data.trackingTalent);
  updateTrackingTalent.get(group)?.delete(talent.key);

  if(updatePrerequisite[group][position] > 4) {
    return {
      prerequisite: updatePrerequisite,
      trackingTalent: updateTrackingTalent,
      talentMap: updateTalentMap,
      refundPoints: data.refundPoints +  refundPoints,
    }
  }

  const removeList: string[] = [];
  updateTrackingTalent.get(group)?.forEach((key) => {
    const talent = updateTalentMap.get(key) as TalentEntity;
    if (talent.position > position) {
      refundPoints += talent.current_level;
      updatePrerequisite[talent.group][talent.position] -= talent.current_level;
      talent.current_level = 0;
      updateTalentMap.set(key, talent);
      removeList.push(key);
    }
  });

  removeList.forEach((key) => updateTrackingTalent.get(group)?.delete(key));

  return {
    prerequisite: updatePrerequisite,
    trackingTalent: updateTrackingTalent,
    talentMap: updateTalentMap,
    refundPoints: data.refundPoints +  refundPoints,
  };
}

const useTalentStore = create<TalentStore>((set, get) => ({
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
    rollbackMap = new Map<string, TalentEntity>();
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

      if (
        updateData.selectedTalent.group !== 0 &&
        updateData.selectedTalent.group !== 1 &&
        rollbackMap.has(updateData.selectedTalent.key)
      ) {
        const talent = rollbackMap.get(updateData.selectedTalent.key) as TalentEntity;
        rollbackMap.delete(updateData.selectedTalent.key);

        const rollbackData = rollback(talent, advanceUpdateData);

        return {
          ...store,
          remainingPoints: store.remainingPoints + 1 + rollbackData.refundPoints,
          prerequisite: rollbackData.prerequisite,
          talentMap: rollbackData.talentMap,
          trackingTalent: rollbackData.trackingTalent,
          selectedTalent: updateData.selectedTalent,
        };
      }

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
  isQualified: (talentKey: string): boolean => {
    const { talentMap } = get();
    const talent = talentMap?.get(talentKey) as TalentEntity;
    if (!talent.extra_prerequisite) return true;

    const prerequisiteTalentCore = talentMap?.get(
      talent.prerequisite_talent_key as string
    );

    // console.log(talent);

    return (
      prerequisiteTalentCore?.current_level ===
      prerequisiteTalentCore?.max_level
    );
  },
  isRollback: (talentKey: string): boolean => {
    const { talentMap } = get();
    const talent = talentMap?.get(talentKey);

    if (!talent) return false;

    const prerequisiteTalentCore = talentMap?.get(
      talent.prerequisite_talent_key as string
    );

    if (!prerequisiteTalentCore) return false;

    if (prerequisiteTalentCore.current_level < 5) return false;

    return talent.current_level !== 0;
  },
  setRollbackTalentCore: (talentKey) => {
    const { talentMap } = get();
    const talent = talentMap?.get(talentKey) as TalentEntity;
    if (!talent) return;

    const prerequisiteTalentCore = talentMap?.get(
      talent.prerequisite_talent_key as string
    ) as TalentEntity;
    if (!prerequisiteTalentCore) return;

    rollbackMap.set(prerequisiteTalentCore.key, talent);
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
