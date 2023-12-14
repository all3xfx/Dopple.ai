import { ChartSlider } from "./ChartSlider";
import { Text } from "../shared/Text";
import { ChartItem } from "./ChartItem";

import { cn } from "#/lib/cn";

interface ChartListProps {
  title?: string;
  items: DoppleList;

  /**
   * Set a limit to limit the visibility of items.
   */
  limit?: number;

  /**
   * Integer defining the size of the groups (vertical)
   */
  groupSize?: number;

  /**
   * Should the list be vertically scrollable on mobile?
   */
  showMobileAsList?: boolean;

  /**
   * Should the link to "show all" been shown?
   */
  showAll?: boolean;
}

export async function ChartList({
  title = "Top Dopples",
  items: intrinsicItems,
  limit,
  groupSize = 3,
  showMobileAsList = false,
  showAll = true,
}: ChartListProps) {
  const items = limit ? intrinsicItems.slice(0, limit) : intrinsicItems;

  return (
    <div className={cn("page-wrapper")}>
      <div className={cn("mb-4 flex items-center justify-between")}>
        <Text as="h4" size="xl" bold>
          {title}
        </Text>
        {showAll ? (
          <Text
            as="a"
            href="/topcharts"
            size="sm"
            bold
            className="text-blue-500"
          >
            See All
          </Text>
        ) : null}
      </div>

      <div className={cn(showMobileAsList ? "hidden lg:block" : "")}>
        <ChartSlider items={items} groupSize={groupSize} />
      </div>

      {showMobileAsList ? (
        <div className={cn("block lg:hidden")}>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn("border-b border-gray-800 py-3 last:border-b-0")}
            >
              <ChartItem index={index} data={item} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
