import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SubtotalProps = {
    subtotal: number;
    setSubtotalValue: (value: number) => void;
};
export const useSubtotal = create<SubtotalProps>()(
    persist((set) => ({
        subtotal: 0,
        setSubtotalValue: (value: number) => set({ subtotal: value })
    }), {
        name: "subtotal-storage",
        storage: createJSONStorage(() => localStorage)
    }))
    ;
