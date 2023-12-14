import { ChartList } from "#/components/explore/ChartList";
import { categories } from "#/config";
import { request } from "#/utilities/fetch";

export interface PageProps {
  params: { categoryId?: string };
}

export default async function Page({ params }: PageProps) {
  const categoryId = params.categoryId ? Number(params.categoryId) : undefined;
  const allItems = await request<DoppleList>("/dopple");

  const items = categoryId
    ? allItems.filter(item => item.category === categoryId)
    : allItems;

  return (
    <ChartList
      title={
        // We need to check for undefined, because `0` is also false.
        typeof categoryId !== "undefined"
          ? `Top ${categories[categoryId].namePlural}`
          : undefined
      }
      items={items}
      groupSize={5}
      showAll={false}
      showMobileAsList
    />
  );
}
