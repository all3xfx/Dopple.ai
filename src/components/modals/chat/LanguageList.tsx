import { useState } from "react";
import { useInterface } from "#/state/interface";
import { useUserSettings } from "#/state/settings";

import { cn } from "#/lib/cn";

interface ILang {
  flag: string;
  lang: string;
  name: string;
}

export function LanguageList() {
  const [languageUnsaved, setLanguageUnsaved] = useState<ILang>(Object);
  const mode = useInterface(store => store.mode);
  const languages = useUserSettings(store => store.languages);
  const setCurrentLang = useUserSettings(store => store.setCurrentLang);

  const save = () => {
    setCurrentLang(languageUnsaved);
  };

  return (
    <>
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-[5px] bg-[#31333C]",
        )}
      >
        {languages.map((x: ILang, i: number) => (
          <button
            className={cn(
              "duration-800 flex items-center justify-between space-x-[10px] border-b p-[15px] text-[16px] leading-[19px] transition",
              mode === 0
                ? " border-[#31333C] bg-button text-white hover:bg-[#31333C]"
                : mode === 1
                ? " border-[#C6CED8] bg-[#EDEDF0] text-title hover:bg-[#C6CED8]"
                : mode === 2
                ? " border-candysubtext bg-candybutton text-candytitle hover:bg-candysubtext"
                : mode === 3
                ? " text-galaxytitle border-[rgba(156,116,243,.5)] bg-galaxybutton hover:bg-[rgba(156,116,243,.5)]"
                : "",
            )}
            key={i}
            onClick={() => setLanguageUnsaved(languages[i])}
          >
            <div className={cn("flex w-0 flex-1 items-center space-x-[10px]")}>
              <img src={x.flag} alt="" />
              <span className={cn("w-0 flex-1 truncate text-left")}>
                {x.name}
              </span>
            </div>
            {languages[i] === languageUnsaved ? (
              <>
                {(mode === 0 || mode === 1) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <rect width="30" height="30" rx="15" fill="#048DFF" />
                    <path
                      d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {mode === 2 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <rect width="30" height="30" rx="15" fill="white" />
                    <path
                      d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                      stroke="#DD57AF"
                      strokeWidth="3"
                    />
                  </svg>
                )}
                {mode === 3 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <rect width="30" height="30" rx="15" fill="#5200FF" />
                    <path
                      d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                      stroke="white"
                      strokeWidth="3"
                    />
                  </svg>
                )}
              </>
            ) : (
              <div
                className={cn("h-[30px] w-[30px] rounded-full border", {
                  "border-[#31333C] bg-inputback": mode === 0,
                  "border-[#C4C7CB] bg-white1": mode === 1,
                  "border-candysubtext bg-candynav": mode === 2,
                  "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                })}
              />
            )}
          </button>
        ))}
      </div>

      <button
        className={cn(
          "mt-[30px] flex h-[50px] w-full items-center justify-center rounded-[5px] text-[16px] font-bold leading-[19px] disabled:opacity-50",
          mode === 0
            ? " bg-blue2"
            : mode === 1
            ? " bg-blue2"
            : mode === 2
            ? " bg-candysubtext"
            : mode === 3
            ? " bg-galaxysubtext"
            : "",
        )}
        onClick={() => save()}
      >
        Apply
      </button>
    </>
  );
}
