import { create } from "zustand";
import  RoleEntity  from "../../entities/RoleEntity";

interface RoleStore {
    roles: RoleEntity[] | null;
    setRoles: (roles: RoleEntity[]) => void;
}

const useRoleStore = create<RoleStore>((set) => ({
    roles: null,
    setRoles: (roles) => set({ roles })
}));

export default useRoleStore;