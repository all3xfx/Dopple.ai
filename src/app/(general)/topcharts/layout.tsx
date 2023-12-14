import { ChartsTabBar } from "#/components/charts/TabBar";
import { cn } from "#/lib/cn";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={cn("space-y-7 pt-2 md:pt-[30px]")}>
      <ChartsTabBar />
      {children}
    </div>
  );
}
