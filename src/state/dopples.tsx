"use client";

import { create } from "zustand";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

interface IDoppleContext {
  items: DoppleList;
}

const DoppleContext = createContext<IDoppleContext>({ items: [] });

export const useDopples = () => useContext(DoppleContext);

export function DoppleProvider({
  items,
  children,
}: PropsWithChildren<IDoppleContext>) {
  return (
    <DoppleContext.Provider value={{ items }}>
      {children}
    </DoppleContext.Provider>
  );
}

export const useDopple = create<{
  dopple: any;
  setDopple: (dopple: any) => void;
  history: any;
  setHistory: (history: any) => void;
}>(set => ({
  dopple: {},
  setDopple: dopple => set({ dopple }),
  history: [],
  setHistory: history => set({ history }),
}));
