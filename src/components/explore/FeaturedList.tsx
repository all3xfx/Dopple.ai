import { request } from "#/utilities/fetch";
import { Text } from "../shared/Text";
import { FeaturedSlider } from "./FeaturedSlider";

interface FeaturedListProps {
  title?: string;
  filterByCategory?: number;
}

export async function FeaturedList({
  title = "Featured Dopples",
  filterByCategory,
}: FeaturedListProps) {
  const result = await request<DoppleList>("/dopple/featured");
  const items = result.filter(item => {
    if (!!filterByCategory) {
      return item.category === filterByCategory;
    }

    return true;
  });

  return (
    <div className="page-wrapper">
      <Text as="h3" size="xl" bold className="mb-3">
        {title}
      </Text>

      <FeaturedSlider items={items} />
    </div>
  );
}
