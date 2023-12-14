import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

interface IProps {
  onClick: () => void;
}

export function ButtonLanguageShown({ onClick }: IProps) {
  const mode = useInterface(store => store.mode);

  return (
    <button
      className={cn(
        "absolute left-[20px] top-[27px] flex items-center space-x-[10px] text-[14px] font-bold leading-[17px]",
        mode === 0
          ? " text-blue2"
          : mode === 1
          ? " text-blue2"
          : mode === 2
          ? " text-candybuttonhighlight"
          : mode === 3
          ? " text-galaxybuttonhighlight"
          : "",
      )}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="17"
        viewBox="0 0 19 17"
        stroke="currentColor"
      >
        <path
          d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
