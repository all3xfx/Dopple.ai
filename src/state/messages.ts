import { create } from "zustand";

export const useMessages = create<{
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}>(set => ({
  searchTerm: "",
  setSearchTerm: searchTerm => set({ searchTerm }),
}));
