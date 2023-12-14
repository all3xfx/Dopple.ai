import { categories } from "#/config";
import { TabBarItem } from "./TabBarItem";

import { cn } from "#/lib/cn";

export function ExploreTabBar() {
  return (
    <div
      className={cn(
        "mb-[15px] flex items-center space-x-[12.5px] text-[14px] font-medium leading-[17px] md:mb-[24.4px] md:space-x-[15px]",
      )}
    >
      <div
        className={cn(
          "category-container flex items-center space-x-[5px] overflow-auto pl-5 xl:px-[60px]",
        )}
      >
        <TabBarItem href="/">
          <span>All</span>
        </TabBarItem>
        {categories.map((x, i) => (
          <TabBarItem href={`/category/${i}`} iconKey={x.key} key={i}>
            <span>{x.name}</span>
          </TabBarItem>
        ))}
      </div>
    </div>
  );
}
