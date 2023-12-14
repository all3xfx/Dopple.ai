import { create } from "zustand";

type Mode = 0 | 1 | 2 | 3;

export const useInterface = create<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>(set => ({
  mode: 0,
  setMode: mode => set({ mode }),
}));
