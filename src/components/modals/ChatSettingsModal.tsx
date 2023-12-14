import React, { useRef, useState } from "react";

import { useInterface } from "#/state/interface";

import { Close } from "./chat/Close";
import { LanguageList } from "./chat/LanguageList";
import { Appereance } from "./chat/Appereance";
import { Alignment } from "./chat/Alignment";
import { TextSize } from "./chat/TextSize";
import { VoiceMessages } from "./chat/VoiceMessages";
import { Preferences } from "./chat/Preferences";
import { LanguagesAlt } from "./chat/LanguagesAlt";
import { ButtonLanguageShown } from "./chat/ButtonLanguageShown";
import { RemixTooltip } from "./chat/RemixTooltip";

import { cn } from "#/lib/cn";

export const ChatSettingsModal = () => {
  const mode = useInterface(store => store.mode);
  const [tab, setTab] = useState(0);
  const container = useRef();

  return (
    <div
      className={cn(
        "z-[1300] h-full w-full bg-menuback backdrop-blur-[5px] transition duration-300",
        mode === 1 ? " dark" : "",
      )}
    >
      <div className="bottom-0 right-0 h-full" ref={container}>
        <div>
          <div
            className={cn(
              "h-full	w-[400px] max-w-full outline-none",
              mode === 0
                ? " bg-[#17181C]"
                : mode === 1
                ? " bg-white"
                : mode === 2
                ? " bg-candynav"
                : mode === 3
                ? " border-l border-galaxybutton bg-galaxynav"
                : "",
            )}
          >
            <div className="relative max-h-full overflow-auto px-5 py-[25px]">
              <Close />

              {tab === 1 && <ButtonLanguageShown onClick={() => setTab(0)} />}
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "mb-[26px] text-[18px] font-bold leading-[22px]",
                    mode === 0
                      ? ""
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-candytitle"
                      : "",
                  )}
                >
                  {tab === 1 ? "Language" : "Settings"}
                </span>
                <RemixTooltip />
                {tab === 0 ? (
                  <>
                    <div className="flex w-full flex-col">
                      <Appereance />
                      <Alignment />
                      <TextSize />
                      <VoiceMessages />
                      <Preferences />
                      <LanguagesAlt onClick={() => setTab(1)} />
                    </div>
                  </>
                ) : (
                  <>
                    <LanguageList />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
