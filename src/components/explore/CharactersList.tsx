import { Text } from "../shared/Text";
import { CharactersSlider } from "./CharactersSlider";
import { cn } from "#/lib/cn";

export async function CharactersList({
  title,
  items,
  showAll = true,
}: {
  title: string;
  items: DoppleList;
  showAll?: boolean;
}) {
  // Return early without a component, when there are no items to display.
  if (items.length === 0) return null;

  return (
    <div className={cn("page-wrapper")}>
      <div className={cn("mb-4 flex items-center justify-between")}>
        <Text as="h3" size="xl" bold>
          {title}
        </Text>
        {showAll ? (
          <Text
            as="a"
            size="xs"
            bold
            className="text-blue-500"
            href="/category/0"
          >
            See All
          </Text>
        ) : null}
      </div>
      <CharactersSlider items={items} />
    </div>
  );
}
