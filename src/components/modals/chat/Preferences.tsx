import { useState, Fragment } from "react";
import { useInterface } from "#/state/interface";
import { Tooltip } from "#/components/shared/Tooltip";

import { cn } from "#/lib/cn";

export function Preferences() {
  const mode = useInterface(store => store.mode);
  const [chatFilter, setChatFilter] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);

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
        Chat Preferences
      </span>

      <div
        className={cn(
          "mt-[10px] flex flex-col space-y-[15px] rounded-[5px] px-[15px] py-5",
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
        <div className={cn("flex items-center justify-between space-x-[10px]")}>
          <div
            className={cn(
              "flex items-center space-x-[5px] text-[14px] leading-[17px]",
            )}
          >
            <span
              className={cn(
                mode === 0
                  ? "text-white"
                  : mode === 1
                  ? "text-title"
                  : mode === 2
                  ? "text-candybuttonhighlight"
                  : mode === 3
                  ? "text-white"
                  : "",
              )}
            >
              #NoFilter Mode
            </span>
            <Tooltip
              content={
                <Fragment>
                  <div
                    className={cn(
                      "relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5",
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
                          "font-Inter text-[18px] font-bold leading-[22px]",
                        )}
                      >
                        #NoFilter Mode
                      </span>
                    </div>
                    <div className="flex items-start space-x-[10px]">
                      <span
                        className={cn(
                          "font-Inter max-w-[258px] text-[14px] leading-[17px]",
                          mode === 0
                            ? " text-subtext"
                            : mode === 1
                            ? " text-subtext"
                            : mode === 2
                            ? " text-candysubtext"
                            : mode === 3
                            ? " text-galaxysubtext"
                            : "",
                        )}
                      >
                        Coming soon to Dopple+ Members Only. #NoFilter allows
                        users to toggle off filters for all Dopple chats.
                      </span>
                    </div>
                  </div>
                </Fragment>
              }
            >
              <svg
                className={cn(
                  mode === 0
                    ? "text-blue2"
                    : mode === 1
                    ? "text-blue2"
                    : mode === 2
                    ? "text-[#FF36F7]"
                    : mode === 3
                    ? "text-[#5200FF]"
                    : "",
                )}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.1665 9.15022C9.1665 8.92921 9.2543 8.71725 9.41058 8.56097C9.56686 8.40469 9.77882 8.31689 9.99984 8.31689C10.2209 8.31689 10.4328 8.40469 10.5891 8.56097C10.7454 8.71725 10.8332 8.92921 10.8332 9.15022V14.1502C10.8332 14.3712 10.7454 14.5832 10.5891 14.7395C10.4328 14.8958 10.2209 14.9836 9.99984 14.9836C9.77882 14.9836 9.56686 14.8958 9.41058 14.7395C9.2543 14.5832 9.1665 14.3712 9.1665 14.1502V9.15022ZM9.99984 5.04272C9.77882 5.04272 9.56686 5.13052 9.41058 5.2868C9.2543 5.44308 9.1665 5.65504 9.1665 5.87606C9.1665 6.09707 9.2543 6.30903 9.41058 6.46531C9.56686 6.62159 9.77882 6.70939 9.99984 6.70939C10.2209 6.70939 10.4328 6.62159 10.5891 6.46531C10.7454 6.30903 10.8332 6.09707 10.8332 5.87606C10.8332 5.65504 10.7454 5.44308 10.5891 5.2868C10.4328 5.13052 10.2209 5.04272 9.99984 5.04272Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.99984 1.66675C5.39734 1.66675 1.6665 5.39758 1.6665 10.0001C1.6665 14.6026 5.39734 18.3334 9.99984 18.3334C14.6023 18.3334 18.3332 14.6026 18.3332 10.0001C18.3332 5.39758 14.6023 1.66675 9.99984 1.66675ZM3.33317 10.0001C3.33317 11.7682 4.03555 13.4639 5.28579 14.7141C6.53603 15.9644 8.23173 16.6667 9.99984 16.6667C11.7679 16.6667 13.4636 15.9644 14.7139 14.7141C15.9641 13.4639 16.6665 11.7682 16.6665 10.0001C16.6665 8.23197 15.9641 6.53628 14.7139 5.28604C13.4636 4.03579 11.7679 3.33341 9.99984 3.33341C8.23173 3.33341 6.53603 4.03579 5.28579 5.28604C4.03555 6.53628 3.33317 8.23197 3.33317 10.0001Z"
                />
              </svg>
            </Tooltip>
            <span
              className={cn(
                "text-[14px] leading-[17px]",
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
              (Coming Soon)
            </span>
          </div>
          <button
            className={cn(
              "duration-800 group relative h-[30px] w-[50px] rounded-[22px] transition",
              chatFilter
                ? mode === 0
                  ? " bg-blue2"
                  : mode === 1
                  ? " bg-blue2"
                  : mode === 2
                  ? " bg-candysubtext"
                  : mode === 3
                  ? " bg-galaxybuttonhighlight"
                  : ""
                : mode === 0
                ? " bg-inputback"
                : mode === 1
                ? " bg-inputback"
                : mode === 2
                ? " bg-candynav"
                : mode === 3
                ? " bg-inputback"
                : "",
            )}
            onClick={() => setChatFilter(!chatFilter)}
          >
            <div
              className={cn(
                "duration-800 absolute top-1/2 h-[26px] w-[26px] -translate-y-1/2 rounded-full transition-all",
                chatFilter
                  ? " left-[22px] bg-white group-hover:bg-subtext"
                  : " left-[2px]" +
                      (mode === 0
                        ? " bg-subtext group-hover:bg-white"
                        : mode === 1
                        ? " bg-subtext group-hover:bg-white"
                        : mode === 2
                        ? " bg-candysubtext"
                        : mode === 3
                        ? " bg-[#7747DC]"
                        : ""),
              )}
            />
          </button>
        </div>
        <div
          className={cn(
            "h-[1px] w-full",
            mode === 0
              ? " bg-[#31333C]"
              : mode === 1
              ? " bg-[#C4C7CB]"
              : mode === 2
              ? " bg-candybuttonhighlight"
              : mode === 3
              ? " bg-[rgba(156,116,243,.5)]"
              : "",
          )}
        />
        <div className={cn("flex items-center justify-between space-x-[10px]")}>
          <div
            className={cn(
              "flex items-center space-x-[5px] text-[14px] leading-[17px]",
              mode === 0
                ? " text-white"
                : mode === 1
                ? " text-title"
                : mode === 2
                ? " text-candybuttonhighlight"
                : mode === 3
                ? " text-white"
                : "",
            )}
          >
            <span>Auto-Delete Chat (24hrs)</span>
          </div>
          <button
            className={cn(
              "duration-800 group relative h-[30px] w-[50px] rounded-[22px] transition",
              autoDelete
                ? mode === 0
                  ? " bg-blue2"
                  : mode === 1
                  ? " bg-blue2"
                  : mode === 2
                  ? " bg-candysubtext"
                  : mode === 3
                  ? " bg-galaxybuttonhighlight"
                  : ""
                : mode === 0
                ? " bg-inputback"
                : mode === 1
                ? " bg-inputback"
                : mode === 2
                ? " bg-candynav"
                : mode === 3
                ? " bg-inputback"
                : "",
            )}
            onClick={() => setAutoDelete(!autoDelete)}
          >
            <div
              className={cn(
                "duration-800 absolute top-1/2 h-[26px] w-[26px] -translate-y-1/2 rounded-full transition-all",
                autoDelete
                  ? " left-[22px] bg-white group-hover:bg-subtext"
                  : " left-[2px]" +
                      (mode === 0
                        ? " bg-subtext group-hover:bg-white"
                        : mode === 1
                        ? " bg-subtext group-hover:bg-white"
                        : mode === 2
                        ? " bg-candysubtext"
                        : mode === 3
                        ? " bg-[#7747DC]"
                        : ""),
              )}
            />
          </button>
        </div>
      </div>
    </>
  );
}
