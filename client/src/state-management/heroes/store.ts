import { create } from "zustand";
import HeroEntity from "../../entities/HeroEntity";

interface HeroStore {
    hero: HeroEntity | null,
    setHero: (hero: HeroEntity) => void
}

const useHeroStore = create<HeroStore>((set) => ({
    hero: null,
    setHero: (hero) => set({ hero })
}));

export default useHeroStore;