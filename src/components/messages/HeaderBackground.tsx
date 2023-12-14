import { cn } from "#/lib/cn";
import { useInterface } from "#/state/interface";

interface HeaderBackgroundProps {
  children: React.ReactNode;
}

export function HeaderBackground({
  children,
  className = null,
}: HeaderBackgroundProps) {
  const mode = useInterface(store => store.mode);

  return (
    <div
      className={cn(
        "flex min-h-[70px] items-center justify-between space-x-2 border-b px-5",
        {
          "border-button bg-nav": mode === 0,
          "border-[#EDEDF0] bg-white": mode === 1,
          "border-candysubtext bg-candynav": mode === 2,
          "border-galaxybutton bg-[rgba(11,3,16,.75)]": mode === 3,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
