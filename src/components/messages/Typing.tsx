import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

export function Typing() {
  const mode = useInterface(store => store.mode);

  return (
    <div className="typing">
      <div
        className={cn(
          "typing__dot",
          mode === 0
            ? " bg-subtext"
            : mode === 1
            ? " bg-subtext"
            : mode === 2
            ? " bg-white"
            : mode === 3
            ? " bg-[#9277FF]"
            : "",
        )}
      ></div>
      <div
        className={cn(
          "typing__dot",
          mode === 0
            ? " bg-subtext"
            : mode === 1
            ? " bg-subtext"
            : mode === 2
            ? " bg-white"
            : mode === 3
            ? " bg-[#9277FF]"
            : "",
        )}
      ></div>
      <div
        className={cn(
          "typing__dot",
          mode === 0
            ? " bg-subtext"
            : mode === 1
            ? " bg-subtext"
            : mode === 2
            ? " bg-white"
            : mode === 3
            ? " bg-[#9277FF]"
            : "",
        )}
      ></div>
    </div>
  );
}
