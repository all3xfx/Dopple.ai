"use client";

import { cn } from "#/lib/cn";
import { useSearch } from "#/state/search";
import { useRef } from "react";
import { SearchDialog } from "./SearchDialog";

/**
 * TODO: Implement history
 */

export function SearchBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { searchActive, toggle, searchTerm, setSearchTerm } = useSearch(
    store => ({
      searchActive: store.searchActive,
      toggle: store.toggle,
      searchTerm: store.searchTerm,
      setSearchTerm: store.setSearchTerm,
    }),
  );

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 lg:relative lg:basis-1/4",
        searchActive && "flex-auto",
        !searchActive && "lg:flex-auto",
      )}
    >
      {/* Input for activating the search on desktop breakpoints */}
      <div
        className={cn(
          "duration-800 z-20 h-[45px] flex-auto items-center gap-x-3 rounded-[5px] border border-black12 bg-button px-[19px] leading-[17px] text-black4 transition",
          "focus-within:border-blue2 hover:bg-black5",
          { "hidden lg:flex": !searchActive },
          { flex: searchActive },
        )}
      >
        <svg
          className="min-h-[16px] min-w-[16px]"
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1167 13.1167L10.2559 10.2508M11.8413 6.42064C11.8413 7.85828 11.2702 9.23704 10.2536 10.2536C9.23704 11.2702 7.85828 11.8413 6.42064 11.8413C4.98299 11.8413 3.60423 11.2702 2.58767 10.2536C1.5711 9.23704 1 7.85828 1 6.42064C1 4.98299 1.5711 3.60423 2.58767 2.58767C3.60423 1.5711 4.98299 1 6.42064 1C7.85828 1 9.23704 1.5711 10.2536 2.58767C11.2702 3.60423 11.8413 4.98299 11.8413 6.42064Z"
            stroke={searchTerm.length > 0 ? "white" : "#6A7179"}
            strokeWidth="1.66194"
            strokeLinecap="round"
          />
        </svg>
        <input
          /**
           * Read more: https://gist.github.com/kiding/72721a0553fa93198ae2bb6eefaa3299
           */
          onFocus={e => {
            e.target.style.opacity = "0";
            setTimeout(() => (e.target.style.opacity = "1"));
          }}
          className="flex-1 text-[16px] text-white placeholder-black4 caret-blue2 lg:text-[14px]"
          placeholder="Search Dopples"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Button for activating the search on mobile breakpoints */}
      <button
        className="relative z-30 flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-black12 lg:hidden"
        onClick={() => toggle(ref)}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {searchActive ? (
            <path
              d="M1.6665 1.16667L13.3332 12.8333M1.6665 12.8333L13.3332 1.16667"
              stroke="#048DFF"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M13.1167 13.1167L10.2559 10.2508M11.8413 6.42064C11.8413 7.85828 11.2702 9.23704 10.2536 10.2536C9.23704 11.2702 7.85828 11.8413 6.42064 11.8413C4.98299 11.8413 3.60423 11.2702 2.58767 10.2536C1.5711 9.23704 1 7.85828 1 6.42064C1 4.98299 1.5711 3.60423 2.58767 2.58767C3.60423 1.5711 4.98299 1 6.42064 1C7.85828 1 9.23704 1.5711 10.2536 2.58767C11.2702 3.60423 11.8413 4.98299 11.8413 6.42064Z"
              stroke="#048DFF"
              strokeWidth="1.66194"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <SearchDialog ref={ref} />
    </div>
  );
}
