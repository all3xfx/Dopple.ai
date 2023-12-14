import { ExploreTabBar } from "#/components/explore/TabBar";
import { cn } from "#/lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("space-y-7 pt-[15px] md:pt-[30px]")}>
      <ExploreTabBar />

      {children}
    </div>
  );
}
