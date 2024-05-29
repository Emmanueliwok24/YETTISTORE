import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SubtotalProps = {
    subtotal: number;
    setSubtotalValue: (value: number) => void;
    clearSubtotal: () => void;
};
export const useSubtotal = create<SubtotalProps>()(
    persist((set) => ({
        subtotal: 0,
        setSubtotalValue: (value: number) => set({ subtotal: value }),
        clearSubtotal: () => set({ subtotal: 0 })
    }), {
        name: "subtotal-storage",
        storage: createJSONStorage(() => localStorage)
    }))
    ;
