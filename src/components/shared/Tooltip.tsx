import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

interface IProps {
  content: any;
  children: any;
}

export const Tooltip = ({ content, children }: IProps) => {
  const mode = useInterface(store => store.mode);

  const style = () =>
    mode === 0
      ? " shadow-tooltip-dark bg-nav after:border-t-nav"
      : mode === 1
      ? " shadow-tooltip-light bg-white after:border-t-white"
      : mode === 2
      ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
      : mode === 3
      ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
      : "";

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={cn(
              `TooltipContent text-violet11 select-none rounded-[10px] bg-transparent text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[side=bottom]:animate-slideDownAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade `,
              style(),
            )}
            sideOffset={5}
          >
            <div className={cn("overflow-hidden rounded-[10px]", style())}>
              {content}
            </div>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
