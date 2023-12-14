import { cn } from "#/lib/cn";
import { cva } from "class-variance-authority";
import Link from "next/link";

type Elements = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "a";

interface TextProps<E extends Elements> {
  as?: E;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bold?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: E extends "a" ? string : never;
}

const textStyles = cva("text", {
  variants: {
    bold: {
      true: "font-[600]",
      false: "font-normal",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

export function Text<E extends Elements>({
  as,
  size = "sm",
  bold = false,
  ...props
}: TextProps<E>) {
  // Use the `Link` component if the `as` prop is `a`.
  // Otherwise, use the `as` prop as the component.
  const Component = as === "a" ? Link : as ?? "p";

  return (
    <Component
      {...props}
      className={cn(textStyles({ bold, size }), props.className)}
      href={props.href ?? "/"}
    />
  );
}
