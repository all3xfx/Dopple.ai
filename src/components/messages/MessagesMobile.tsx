import { useState } from "react";

import { ClickAwayListener } from "@mui/material";

import { useInterface } from "#/state/interface";

import { AudioPlayer } from "#/components/messages/AudioPlayer";
import { CopyButtonMobile } from "#/components/messages/CopyButton";

import { cn } from "#/lib/cn";

export const MessageFromBotMobile = ({
  alignment,
  textSize,
  x,
  i,
  editedIndexes,
  setEditIndex,
}: any) => {
  const [open, setOpen] = useState(false);
  const mode = useInterface(store => store.mode);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        className={cn(
          "msg-para group min-w-[40px] max-w-[70%] rounded-[20px] rounded-bl-[0px] rounded-tl-[15px] border p-[10px]",
          {
            "mr-[10px]": alignment === 0 && x?.message?.type === "human",
            "ml-[10px]": !(alignment === 0 && x?.message?.type === "human"),
            "text-center": x?.message?.data.content?.length <= 7,
            "border-[#363941] bg-button": mode === 0,
            "border-[#C4C7CB] bg-[#EDEDF0] text-title": mode === 1,
            "border-[#FF71CE] bg-candysubtext": mode === 2,
            "border-[#453CB9] bg-[#322995]": mode === 3,
            "max-w-full": x?.message?.data?.url,
          },
        )}
        style={{ fontSize: textSize + "px", lineHeight: textSize + 3 + "px" }}
        onClick={() => setOpen(true)}
      >
        {x?.message?.data?.url ? (
          <AudioPlayer src={x?.message?.data?.url} />
        ) : (
          <>
            <div className={cn("flex contents items-end space-x-[5px]")}>
              <span
                style={{
                  fontSize: textSize + "px",
                  lineHeight: textSize + 3 + "px",
                }}
              >
                {x?.message?.data.content}
              </span>
              {editedIndexes.some(x => x === i) && (
                <span
                  className="italic"
                  style={{
                    fontSize: textSize - 2 + "px",
                    lineHeight: textSize + 1 + "px",
                  }}
                >
                  edited
                </span>
              )}
            </div>
            {open && (
              <div
                className={cn(
                  "dopple-tooltip1 absolute left-1/2 top-[-60px] flex -translate-x-1/2 items-center space-x-[5px] rounded-[10px] p-[10px]",
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
                <CopyButtonMobile txt={x?.message?.data?.content} />
                <button
                  className={cn(
                    "flex h-[35px] w-[35px] items-center justify-center rounded-[5.83px]",
                    mode === 0
                      ? " bg-button text-subtext"
                      : mode === 1
                      ? " bg-[#EDEDF0] text-subtext"
                      : mode === 2
                      ? " bg-candybutton text-candysubtext"
                      : mode === 3
                      ? " bg-galaxybutton text-galaxysubtext"
                      : "",
                  )}
                  onClick={() => setEditIndex(i)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 20H19C19.2652 20 19.5196 20.1054 19.7071 20.2929C19.8946 20.4804 20 20.7348 20 21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21C4 20.7348 4.10536 20.4804 4.29289 20.2929C4.48043 20.1054 4.73478 20 5 20ZM4 15L14 5L17 8L7 18H4V15ZM15 4L17 2L20 5L17.999 7.001L15 4Z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};

export const MessageFromYouMobile = ({
  alignment,
  textSize,
  x,
  i,
  editedIndexes,
  setEditIndex,
}: any) => {
  const [open, setOpen] = useState(false);
  const mode = useInterface(store => store.mode);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        className={cn(
          "msg-para min-w-[40px] rounded-[20px] border p-[10px]",
          alignment === 0
            ? " rounded-rounded-tr-[15px] br-[0px] mr-[10px] "
            : " ml-[10px] rounded-bl-[0px] rounded-tl-[15px]",
          mode === 0 || mode === 1
            ? (i % 4 === 0
                ? " border-chatbord1 bg-chatback1"
                : i % 4 === 1
                ? " border-chatbord2 bg-chatback2"
                : i % 4 === 2
                ? " border-chatbord3 bg-chatback3"
                : " border-chatbord4 bg-chatback4") +
                (x?.message?.data.content?.length <= 7 ? " text-center" : "")
            : mode === 2
            ? " border-[#D171FF] bg-[#BD32FF]"
            : mode === 3
            ? " border-[#9277FF] bg-[#7747DC]"
            : "",
          x?.message?.data.content?.length <= 7 ? " text-center" : "",
          x?.message?.data?.url ? " max-w-full" : " max-w-[70%]",
        )}
        style={{ fontSize: textSize + "px", lineHeight: textSize + 3 + "px" }}
        onClick={() => setOpen(true)}
      >
        <div className={cn("contents items-end space-x-[5px]")}>
          <span
            style={{
              fontSize: textSize + "px",
              lineHeight: textSize + 3 + "px",
            }}
          >
            {x?.message?.data.content}
          </span>
          {editedIndexes.some(x => x === i) && (
            <span
              className="italic"
              style={{
                fontSize: textSize - 2 + "px",
                lineHeight: textSize + 1 + "px",
              }}
            >
              edited
            </span>
          )}
        </div>
        {open && (
          <div
            className={cn(
              "dopple-tooltip1 absolute left-1/2 top-[-60px] flex -translate-x-1/2 items-center space-x-[5px] rounded-[10px] p-[10px]",
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
            <CopyButtonMobile txt={x?.message?.data?.content} />
            <button
              className={cn(
                "flex h-[35px] w-[35px] items-center justify-center rounded-[5.83px]",
                mode === 0
                  ? " bg-button text-subtext"
                  : mode === 1
                  ? " bg-[#EDEDF0] text-subtext"
                  : mode === 2
                  ? " bg-candybutton text-candysubtext"
                  : mode === 3
                  ? " bg-galaxybutton text-galaxysubtext"
                  : "",
              )}
              onClick={() => setEditIndex(i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 20H19C19.2652 20 19.5196 20.1054 19.7071 20.2929C19.8946 20.4804 20 20.7348 20 21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21C4 20.7348 4.10536 20.4804 4.29289 20.2929C4.48043 20.1054 4.73478 20 5 20ZM4 15L14 5L17 8L7 18H4V15ZM15 4L17 2L20 5L17.999 7.001L15 4Z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
