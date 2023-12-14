import { useInterface } from "#/state/interface";
import { useUserSettings } from "#/state/settings";
import { cn } from "#/lib/cn";

export function TextSize() {
  const mode = useInterface(store => store.mode);
  const textSize = useUserSettings(store => store.textSize);
  const setTextSize = useUserSettings(store => store.setTextSize);

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
        Text Size
      </span>
      <div
        className={cn(
          "mt-[10px] flex items-center space-x-[10px] rounded-[5px] px-[15px] pb-[25px] pt-[30px]",
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
        <span
          className={cn(
            "text-[16px] leading-[19px]",
            mode === 1 ? " text-title" : "",
          )}
        >
          A
        </span>
        <div className="relative flex-1">
          <div className="flex items-center space-x-0.5">
            <div
              className={cn(
                "h-1 w-1 rounded-full ",
                mode === 3 ? "bg-[#322995]" : "bg-subtext",
              )}
            />
            <div
              className={cn(
                "h-[2px] flex-1 rounded-[5px] ",
                textSize >= 16
                  ? mode === 0
                    ? "bg-blue2"
                    : mode === 1
                    ? "bg-blue2"
                    : mode === 2
                    ? "bg-[#FF36F7]"
                    : mode === 3
                    ? "bg-[#5200FF]"
                    : ""
                  : mode === 0
                  ? "bg-[#8FCCFF]"
                  : mode === 1
                  ? "bg-[#8FCCFF]"
                  : mode === 2
                  ? "bg-candybuttonhighlight"
                  : mode === 3
                  ? "bg-galaxysubtext"
                  : "",
              )}
            />
            <div
              className={cn(
                "h-1 w-1 rounded-full ",
                mode === 3 ? "bg-[#322995]" : "bg-subtext",
              )}
            />
            <div
              className={cn(
                "h-[2px] flex-1 rounded-[5px] ",
                textSize >= 18
                  ? mode === 0
                    ? "bg-blue2"
                    : mode === 1
                    ? "bg-blue2"
                    : mode === 2
                    ? "bg-[#FF36F7]"
                    : mode === 3
                    ? "bg-[#5200FF]"
                    : ""
                  : mode === 0
                  ? "bg-[#8FCCFF]"
                  : mode === 1
                  ? "bg-[#8FCCFF]"
                  : mode === 2
                  ? "bg-candybuttonhighlight"
                  : mode === 3
                  ? "bg-galaxysubtext"
                  : "",
              )}
            />
            <div
              className={cn(
                "h-1 w-1 rounded-full ",
                mode === 3 ? "bg-[#322995]" : "bg-subtext",
              )}
            />
            <div
              className={cn(
                "h-[2px] flex-1 rounded-[5px] ",
                textSize >= 20
                  ? mode === 0
                    ? "bg-blue2"
                    : mode === 1
                    ? "bg-blue2"
                    : mode === 2
                    ? "bg-[#FF36F7]"
                    : mode === 3
                    ? "bg-[#5200FF]"
                    : ""
                  : mode === 0
                  ? "bg-[#8FCCFF]"
                  : mode === 1
                  ? "bg-[#8FCCFF]"
                  : mode === 2
                  ? "bg-candybuttonhighlight"
                  : mode === 3
                  ? "bg-galaxysubtext"
                  : "",
              )}
            />
            <div
              className={cn(
                "h-1 w-1 rounded-full ",
                mode === 3 ? "bg-[#322995]" : "bg-subtext",
              )}
            />
          </div>
          <input
            type="range"
            min="14"
            max="20"
            step="2"
            className={cn(
              "absolute left-0 top-1/2 h-[30px] w-full -translate-y-1/2 rounded-full",
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
            value={textSize}
            onChange={e => setTextSize(parseInt(e.target.value))}
            onClick={e => setTextSize(parseInt(e.target.value))}
          />
        </div>
        <span
          className={cn(
            "text-[24px] leading-[28px]",
            mode === 1 ? " text-title" : "",
          )}
        >
          A
        </span>
      </div>
    </>
  );
}
