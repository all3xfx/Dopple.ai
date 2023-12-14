import { useState, Fragment } from "react";
import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

import { Tooltip } from "#/components/shared/Tooltip";

export function VoiceMessages() {
  const mode = useInterface(store => store.mode);
  const [voiceFrequency, setVoiceFrequency] = useState(0);

  return (
    <>
      <span
        className={cn(
          "mt-[15px] pl-[15px] text-[14px] leading-[17px]",
          mode === 0
            ? " text-subtext"
            : mode === 1
            ? " text-subtext"
            : mode === 2
            ? " text-candybuttonhighlight"
            : mode === 3
            ? " text-galaxysubtext"
            : "",
        )}
      >
        Voice Messages
      </span>
      <div
        className={cn(
          "mt-[10px] flex flex-col space-y-5 rounded-[5px] px-[15px] pb-[30px] pt-5",
          mode === 0
            ? " bg-button"
            : mode === 1
            ? " bg-[#EDEDF0] text-title"
            : mode === 2
            ? " bg-candybutton text-candytitle"
            : mode === 3
            ? " bg-galaxybutton text-white"
            : "",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between text-[14px] leading-[17px]",
            mode === 0
              ? " text-subtext"
              : mode === 1
              ? " text-subtextlight"
              : mode === 2
              ? " text-candybuttonhighlight"
              : mode === 3
              ? " text-galaxysubtext"
              : "",
          )}
        >
          <span
            className={cn(
              "duration-800 transition",
              voiceFrequency === 0
                ? mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-candytitle"
                  : mode === 3
                  ? " text-white"
                  : ""
                : "",
            )}
          >
            Never
          </span>
          <span
            className={cn(
              "duration-800 transition",
              voiceFrequency === 1
                ? mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-candytitle"
                  : mode === 3
                  ? " text-white"
                  : ""
                : "",
            )}
          >
            Sometimes
          </span>
          <span
            className={cn(
              "duration-800 transition",
              voiceFrequency === 2
                ? mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-candytitle"
                  : mode === 3
                  ? " text-white"
                  : ""
                : "",
            )}
          >
            Always
          </span>
        </div>
        <Tooltip
          content={
            <Fragment>
              <div
                className={cn(
                  "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5",
                  mode === 0
                    ? " shadow-tooltip-dark bg-nav after:border-t-nav"
                    : mode === 1
                    ? " shadow-tooltip-light bg-white after:border-t-white"
                    : mode === 2
                    ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
                    : mode === 3
                    ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "flex items-center space-x-[5px]",
                    mode === 0
                      ? " text-white"
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-candytitle"
                      : mode === 3
                      ? " text-galaxytitle"
                      : "",
                  )}
                >
                  <span
                    className={cn(
                      "font-Inter text-[14px] font-bold leading-[17px]",
                    )}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            </Fragment>
          }
        >
          <div
            className={cn(
              "relative h-[2px] w-full",
              mode === 0
                ? " bg-subtext"
                : mode === 1
                ? " bg-subtext"
                : mode === 2
                ? " bg-candysubtext"
                : mode === 3
                ? " bg-galaxysubtext"
                : "",
            )}
          >
            <div
              className={cn(
                "absolute left-0 top-1/2 h-[6px] w-[2px] -translate-y-1/2 rounded-full",
                mode === 0
                  ? " bg-subtext"
                  : mode === 1
                  ? " bg-subtext"
                  : mode === 2
                  ? " bg-candysubtext"
                  : mode === 3
                  ? " bg-galaxysubtext"
                  : "",
              )}
            />
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              className={cn(
                "absolute left-0 top-1/2 z-[1] h-[30px] w-full -translate-y-1/2 rounded-full",
                mode === 0
                  ? " range-desktop-dark"
                  : mode === 1
                  ? " range-desktop-light"
                  : mode === 2
                  ? " range-desktop-candy"
                  : mode === 3
                  ? " range-desktop-galaxy"
                  : "",
              )}
              value={voiceFrequency}
              onChange={e => setVoiceFrequency(parseInt(e.target.value))}
              disabled
            />
            <div
              className={cn(
                "absolute right-0 top-1/2 h-[6px] w-[2px] -translate-y-1/2 rounded-full",
                mode === 0
                  ? " bg-subtext"
                  : mode === 1
                  ? " bg-subtext"
                  : mode === 2
                  ? " bg-candysubtext"
                  : mode === 3
                  ? " bg-galaxysubtext"
                  : "",
              )}
            />
          </div>
        </Tooltip>
      </div>
    </>
  );
}
