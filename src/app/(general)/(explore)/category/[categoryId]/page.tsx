import { FeaturedList } from "#/components/explore/FeaturedList";
import { ChartList } from "#/components/explore/ChartList";
import { CharactersList } from "#/components/explore/CharactersList";
import { request } from "#/utilities/fetch";
import { categories, subcategories } from "#/config";

interface PageProps {
  params: { categoryId: number };
}

export default async function Page({ params }: PageProps) {
  const categoryId = Number(params.categoryId);
  const category = categories[categoryId];
  const subs = subcategories[categoryId];

  const result = await request<DoppleList>("/dopple");
  const items = result.filter(item => item.category === category.index);

  return (
    <>
      <FeaturedList
        title={`Featured ${category.namePlural}`}
        filterByCategory={categoryId}
      />
      <ChartList title={`Top ${category.namePlural}`} items={items} limit={9} />
      {subs.map((subCategory: string, index: number) => (
        <CharactersList
          key={subCategory}
          title={subCategory}
          items={items.filter(item => item.subcategory === index)}
        />
      ))}
    </>
  );
}
