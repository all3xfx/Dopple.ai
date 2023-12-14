import { usePathname, useRouter } from "next/navigation";

import { useInterface } from "#/state/interface";

import Cookies from "js-cookie";

export function Color(path) {
  const mode = useInterface(store => store.mode);
  const pathname = usePathname();

  if (pathname === path)
    return (
      " font-bold" +
      (mode === 0
        ? " text-white"
        : mode === 1
        ? " text-title"
        : mode === 2
        ? " text-candytitle"
        : mode === 3
        ? " text-white"
        : "")
    );
  else
    return mode === 0
      ? " text-subtext"
      : mode === 1
      ? " text-subtextlight"
      : mode === 2
      ? " text-candysubtext"
      : mode === 3
      ? " text-galaxysubtext"
      : "";
}

export function BGColor(path) {
  const mode = useInterface(store => store.mode);
  const pathname = usePathname();

  if (pathname === path)
    return mode === 0
      ? " bg-button"
      : mode === 1
      ? " bg-blue2"
      : mode === 2
      ? " bg-candysubtext"
      : mode === 3
      ? " bg-[#5200FF]"
      : "";
  else
    return mode === 0
      ? " bg-nav"
      : mode === 1
      ? " bg-white"
      : mode === 2
      ? " bg-candynav"
      : mode === 3
      ? " bg-galaxynav"
      : "";
}

export function NextLink(link) {
  const router = useRouter();
  return router.push(link);
}

export function isSignedIn() {
  const signedIn = Cookies.get("token");
  if (signedIn === undefined) return false;
  return true;
}
