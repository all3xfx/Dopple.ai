import { create } from "zustand";

export const useModal = create<{
  type: string;
  setModal: (type: string) => void;
  closeModal: () => void;
}>(set => ({
  type: "none",
  setModal: type => set({ type }),
  closeModal: () => set({ type: "none" }),
}));
