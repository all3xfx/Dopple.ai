"use client";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import type { RefObject } from "react";
import { create } from "zustand";

interface SearchStore {
  searchActive: boolean;
  toggle: (ref?: RefObject<HTMLDivElement>) => void;
  activate: () => void;
  deactivate: () => void;

  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

export const useSearch = create<SearchStore>((set, get) => ({
  searchActive: false,
  toggle: ref => {
    const { searchActive } = get();

    if (searchActive) {
      set({ searchActive: false, searchTerm: "" });
      if (ref && ref.current) {
        enableBodyScroll(ref.current);
      }
    } else {
      set({ searchActive: true });
      if (ref && ref.current) {
        disableBodyScroll(ref.current);
      }
    }
  },
  activate: () => set({ searchActive: true }),
  deactivate: () => set({ searchActive: false }),

  searchTerm: "",
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}));
