"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Color, BGColor, isSignedIn } from "#/utilities/helper";
import { useInterface } from "#/state/interface";
import { useModal } from "#/state/modal";
import { useDopple } from "#/state/dopples";

import { cn } from "#/lib/cn";

export const MobileTabBar = () => {
  const dopple = useDopple(store => store.dopple);
  const router = useRouter();
  const mode = useInterface(store => store.mode);
  const setModal = useModal(store => store.setModal);
  const pathname = usePathname();
  const openLoginOrSignup = false;
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);

  const nav = (link: string) => router.push(link);

  const handleAccountClick = () => {
    setNavCollapsed(true);
    isSignedIn() ? nav("/account") : setModal("auth");
  };

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY > 50) {
      setNavCollapsed(true);
    } else {
      setNavCollapsed(false);
    }
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  // hide navbar which is over msg input on mobile
  useEffect(() => {
    if (Object.keys(dopple).length > 0) {
      setNavCollapsed(true);
    }
  }, [dopple]);

  return (
    <nav
      className={cn(
        "duration-800 fixed bottom-0 left-0 block w-full translate-y-0 border-t transition md2:hidden",
        openLoginOrSignup ? "" : " z-[1301]",
        pathname === "/messages" ? "" : " fixed bottom-0 left-0",
        navCollapsed ? " translate-y-[90px]" : " translate-y-0",
        mode === 0
          ? " border-button bg-nav"
          : mode === 1
          ? " border-[#EDEDF0] bg-white"
          : mode === 2
          ? " border-candysubtext bg-candynav"
          : mode === 3
          ? " border-galaxybutton bg-galaxynav"
          : "",
      )}
    >
      <div className="flex items-center justify-center space-x-[22px] py-4 text-[12px] leading-[14px]">
        <Link href="/">
          <button
            className={cn(
              "group flex w-[60px] flex-col items-center space-y-1 transition",
              Color("/"),
            )}
          >
            <div
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-[5px] transition",
                BGColor("/"),
              )}
            >
              {pathname === "/" ? (
                <Image
                  width={21}
                  height={21}
                  src="/images/nav/explore-selected.svg"
                  alt=""
                />
              ) : (
                <>
                  {mode === 0 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/explore.svg"
                      alt=""
                    />
                  )}
                  {mode === 1 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/explore-light.svg"
                      alt=""
                    />
                  )}
                  {mode === 2 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/explore-candy.svg"
                      alt=""
                    />
                  )}
                  {mode === 3 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/explore-galaxy.svg"
                      alt=""
                    />
                  )}
                </>
              )}
            </div>
            <span>Explore</span>
          </button>
        </Link>

        <Link href="/community">
          <button
            className={cn(
              "group flex w-[60px] flex-col items-center space-y-1 transition",
              Color("/community"),
            )}
          >
            <div
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-[5px] transition",
                BGColor("/community"),
              )}
            >
              {pathname === "/community" ? (
                <Image
                  width={21}
                  height={21}
                  src="/images/nav/community-selected.svg"
                  alt=""
                />
              ) : (
                <>
                  {mode === 0 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/community.svg"
                      alt=""
                    />
                  )}
                  {mode === 1 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/community-light.svg"
                      alt=""
                    />
                  )}
                  {mode === 2 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/community-candy.svg"
                      alt=""
                    />
                  )}
                  {mode === 3 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/community-galaxy.svg"
                      alt=""
                    />
                  )}
                </>
              )}
            </div>
            <span>Community</span>
          </button>
        </Link>

        <button
          className={cn(
            "group flex w-[60px] flex-col items-center space-y-1 transition",
            Color("/create"),
          )}
          onClick={() => setModal("waitlist")}
        >
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-[5px] transition",
              BGColor("/create"),
            )}
          >
            {pathname === "/create" ? (
              <Image
                width={21}
                height={21}
                src="/images/nav/create-selected.svg"
                alt=""
              />
            ) : (
              <>
                {mode === 0 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/create.svg"
                    alt=""
                  />
                )}
                {mode === 1 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/create-light.svg"
                    alt=""
                  />
                )}
                {mode === 2 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/create-candy.svg"
                    alt=""
                  />
                )}
                {mode === 3 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/create-galaxy.svg"
                    alt=""
                  />
                )}
              </>
            )}
          </div>
          <span>Create</span>
        </button>
        <Link href="/messages">
          <button
            className={cn(
              "group flex w-[60px] flex-col items-center space-y-1 transition",
              Color("/messages"),
            )}
          >
            <div
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-[5px] transition",
                BGColor("/messages"),
              )}
            >
              {pathname === "/messages" ? (
                <Image
                  width={21}
                  height={21}
                  src="/images/nav/messages-selected.svg"
                  alt=""
                />
              ) : (
                <>
                  {mode === 0 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/messages.svg"
                      alt=""
                    />
                  )}
                  {mode === 1 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/messages-light.svg"
                      alt=""
                    />
                  )}
                  {mode === 2 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/messages-candy.svg"
                      alt=""
                    />
                  )}
                  {mode === 3 && (
                    <Image
                      width={21}
                      height={21}
                      src="/images/nav/messages-galaxy.svg"
                      alt=""
                    />
                  )}
                </>
              )}
            </div>
            <span>Messages</span>
          </button>
        </Link>

        <button
          className={cn(
            "group flex w-[60px] flex-col items-center space-y-1 transition",
            Color("/account"),
          )}
          onClick={() => handleAccountClick()}
        >
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-[5px] transition",
              BGColor("/account"),
            )}
          >
            {pathname === "/account" ? (
              <Image
                width={21}
                height={21}
                src="/images/nav/account-selected.svg"
                alt=""
              />
            ) : (
              <>
                {mode === 0 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/account.svg"
                    alt=""
                  />
                )}
                {mode === 1 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/account-light.svg"
                    alt=""
                  />
                )}
                {mode === 2 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/account-candy.svg"
                    alt=""
                  />
                )}
                {mode === 3 && (
                  <Image
                    width={21}
                    height={21}
                    src="/images/nav/account-galaxy.svg"
                    alt=""
                  />
                )}
              </>
            )}
          </div>
          <span>Account</span>
        </button>
      </div>
    </nav>
  );
};
