import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarList } from "./SidebarList";

import { cn } from "#/lib/cn";

export function Sidebar() {
  return (
    <aside
      className={cn(
        "flex hidden h-full w-chatSidebar flex-col border-r border-button bg-nav lg:flex",
      )}
    >
      <SidebarHeader />
      <SidebarList />
      <SidebarFooter />
    </aside>
  );
}
