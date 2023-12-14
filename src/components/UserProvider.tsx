"use client";
import { useUserProfile } from "#/state/profile";

export function UserProvider({ children }) {
  const refreshUser = useUserProfile(store => store.refreshUser);

  refreshUser();

  return children;
}
