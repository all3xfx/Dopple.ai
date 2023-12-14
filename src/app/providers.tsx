"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider as StoreProvider } from "react-redux";
import RefContextProvider from "#/contexts/RefContextProvider";

import { store } from "#/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { request } from "#/utilities/fetch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        return request(queryKey[0] as string);
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <GoogleOAuthProvider clientId="906688676122-uh277o8rlmt1pnas9gkgob0fdlsfr8uu.apps.googleusercontent.com">
          <RefContextProvider>{children}</RefContextProvider>
        </GoogleOAuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
