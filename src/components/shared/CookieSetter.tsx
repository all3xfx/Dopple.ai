"use client";

import { useMemo } from "react";
import Cookies from "js-cookie";

export function CookieSetter() {
  useMemo(() => {
    if (Cookies.get("userid")) return;

    const value = Math.random().toString(36).substring(7);

    Cookies.set("userid", value);
  }, []);
  return null;
}
