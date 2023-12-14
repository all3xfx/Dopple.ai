import { create } from "zustand";

import { languages as data } from "#/config";

type Lang = {
  flag: string;
  lang: string;
  name: string;
};

const currentLang = {
  name: "German",
  flag: "/images/messages/flags/german.svg",
};

export const useUserSettings = create<{
  currentLang: Lang;
  languages: any;
  textSize: number;
  alignment: string;
  setAlignment: (alignment: string) => void;
  setTextSize: (textSize: number) => void;
  setLanguages: (languages: Array[Lang]) => void;
  setCurrentLang: (currentLang: Lang) => void;
}>(set => ({
  currentLang: currentLang,
  languages: data,
  textSize: 14,
  alignment: "right",
  setAlignment: alignment => set({ alignment }),
  setTextSize: textSize => set({ textSize }),
  setLanguages: languages => set({ languages }),
  setCurrentLang: currentLang => set({ currentLang }),
}));
