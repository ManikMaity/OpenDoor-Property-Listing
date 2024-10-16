import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"

const useUserStore = create(persist((set) => {
    return {
        user : {},
        setUser : (user) => set(() => {
            return {
                user : user
            }
        }),
        resetUser : () => set(() => {
            return {
                user : {}
            }
        }),
    }
}, {
    name : "user",
    storage : createJSONStorage(() => localStorage)
}))

export default useUserStore;