"use client";

import { cn } from "#/lib/cn";
import { useDopples } from "#/state/dopples";
import { useSearch } from "#/state/search";
import { forwardRef, useMemo } from "react";
import { SearchItem } from "./SearchItem";

interface SearchDialogProps {}

export const SearchDialog = forwardRef<HTMLDivElement, SearchDialogProps>(
  (_, ref) => {
    const active = useSearch(store => store.searchActive);
    const searchTerm = useSearch(store => store.searchTerm);

    const { items: allItems } = useDopples();

    const items = useMemo(() => {
      if (searchTerm.length === 0) return [];

      return allItems
        .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort(
          (a, b) =>
            a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) -
            b.name.toLowerCase().indexOf(searchTerm.toLowerCase()),
        );
    }, [allItems, searchTerm]);

    return (
      <div
        className={cn(
          "bg-searchBackground absolute inset-x-0 top-0 z-10 flex h-screen w-full flex-col rounded-sm border border-black12 pb-3 shadow-lg1 backdrop-blur-sm lg:right-auto lg:h-auto",
          items.length === 0 && !active && "hidden",
        )}
      >
        <div className="text-md px-5 pb-3 pt-20 font-bold leading-4 text-black4 lg:pt-[60px] lg:text-xs">
          {searchTerm.length > 0 ? "RESULTS" : "RECENT"}
        </div>
        <div ref={ref} className="overflow-auto lg:h-96">
          {items.map((item, index) => (
            <SearchItem key={index} item={item} />
          ))}
        </div>
      </div>
    );
  },
);
