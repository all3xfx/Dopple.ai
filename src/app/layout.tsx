import { Providers } from "./providers";
import { cn } from "#/lib/cn";

// Load the base css file(s).
import "swiper/css";
import "./index.css";
import { request } from "#/utilities/fetch";
import { DoppleProvider } from "#/state/dopples";
import { CookieSetter } from "#/components/shared/CookieSetter";
import { UserProvider } from "#/components/UserProvider";

import { MobileTabBar } from "#/components/shared/MobileTabBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = await request<DoppleList>("/dopple");

  return (
    <html lang="en">
      <head />
      <body>
        <MobileTabBar />
        <Providers>
          <DoppleProvider items={items}>
            <UserProvider>
              <div className={cn("jeans relative min-h-screen bg-black15")}>
                {children}
              </div>
            </UserProvider>
            <CookieSetter />
          </DoppleProvider>
        </Providers>
      </body>
    </html>
  );
}
