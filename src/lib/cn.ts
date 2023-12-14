import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: Parameters<typeof clsx>): string {
  return twMerge(clsx(...classNames));
}
