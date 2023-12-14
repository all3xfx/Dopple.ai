import { FeaturedList } from "#/components/explore/FeaturedList";
import { ChartList } from "#/components/explore/ChartList";
import { CharactersList } from "#/components/explore/CharactersList";
import { request } from "#/utilities/fetch";
import { categories } from "#/config";

export default async function Page() {
  const items = await request<DoppleList>("/dopple");

  return (
    <>
      <FeaturedList />
      {items && <ChartList limit={9} items={items} />}
      {categories.map(category => (
        <CharactersList
          key={category.key}
          title={category.namePlural}
          items={items.filter(item => item.category === category.index)}
        />
      ))}
    </>
  );
}
