"use client";

import { useDopplesData } from "#/utilities/queries/use-dopples-data";
import Cookies from "js-cookie";
import { SidebarItem } from "./SidebarItem";
import { cn } from "#/lib/cn";

export function SidebarList() {
  const { isLoading, data } = useDopplesData({
    variables: { user: Cookies.get("userid") as string },
  });

  return (
    <main
      className={cn(
        "flex flex-auto",
        isLoading || (data?.length === 0 && "justify-content items-center"),
        !isLoading && data && data?.length > 0 && "flex-col",
      )}
    >
      {isLoading ? <span>Loading your chats...</span> : null}

      {!isLoading ? (
        data && data?.length > 0 ? (
          <ul className="list-none p-0">
            {data.map(item => (
              <SidebarItem key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <span>No messages here yet</span>
        )
      ) : null}
    </main>
  );
}
