import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createUser from './create.user.jsx'

export const useAppStore = create()(devtools((...a) => ({
    ...createUser(...a),
    // ...createRegisterSlice(...a),
}))) 