import {create} from "zustand";
import ArtifactEntity from "../../entities/ArtifactEntity";

interface ArtifactStore {
    artifact: ArtifactEntity | null,
    setArtifact: (artifact: ArtifactEntity) => void
}

const useArtifactStore = create<ArtifactStore>((set) => ({
    artifact: null,
    setArtifact: (artifact) => set({ artifact })
}));

export default useArtifactStore;