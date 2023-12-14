'use client';

import { createContext, useState } from "react";

export const RefContext = createContext(null);

export default function RefContextProvider({ children }) {
  const [isTypingSearch, setIsTypingSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDark, setIsDark] = useState(0);
  const [dopple, setDopple] = useState();
  const [openChatSettings, setOpenChatSettings] = useState(false);
  const [alignment, setAlignment] = useState(1);
  const [language, setLanguage] = useState(0);
  const [textSize, setTextSize] = useState(14);
  const [history, setHistory] = useState([]);
  const [dopples, setDopples] = useState([]);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  return <RefContext.Provider value={{ allUsers, setAllUsers, navCollapsed, setNavCollapsed, history, setHistory, isTyping, setIsTyping, isTypingSearch, setIsTypingSearch, isDark, setIsDark, dopple, setDopple, openChatSettings, setOpenChatSettings, language, setLanguage, alignment, setAlignment, textSize, setTextSize, dopples, setDopples }}>{children}</RefContext.Provider>
};
