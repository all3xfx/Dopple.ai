"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { useInterface } from "#/state/interface";

import { SignInForm } from "../forms/SignIn";
import { SignUpForm } from "../forms/SignUp";

import { cn } from "#/lib/cn";

export const AuthModal = () => {
  const [openLoginOrSignup, setOpenLoginOrSignup] = useState(true);
  const mode = useInterface(store => store.mode);

  return (
    <div
      className={cn("relative h-full w-full bg-menuback backdrop-blur-[5px]")}
    >
      <div
        className={cn(
          "login-modal fixed left-1/2 top-16 w-[calc(100vw-20px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[5px] border shadow-lg outline-none tiny:w-[388px]",
          mode === 0
            ? " border-button bg-nav"
            : mode === 1
            ? " border-[#EDEDF0] bg-white"
            : mode === 2
            ? " bg-candynav "
            : mode === 3
            ? " border-galaxybutton bg-galaxynav"
            : "",
        )}
      >
        <div
          className={cn(
            "mb-[30px] flex w-full border-b text-[14px] leading-[17px]",
            mode === 0
              ? " border-button"
              : mode === 1
              ? " border-[#EDEDF0]"
              : mode === 2
              ? " border-candybutton"
              : mode === 3
              ? " border-galaxybutton"
              : "",
          )}
        >
          <button
            className={cn(
              "flex h-[65px] flex-1 items-center justify-center space-x-[5px]",
              !openLoginOrSignup ? " border-b-2 font-bold" : "",
              !openLoginOrSignup
                ? mode === 0
                  ? " border-blue2 text-white"
                  : mode === 1
                  ? " border-blue2 text-title"
                  : mode === 2
                  ? " border-candybuttonhighlight text-candytitle"
                  : mode === 3
                  ? " text-galaxytitle border-[#5200FF]"
                  : ""
                : mode === 0
                ? " text-subtext"
                : mode === 1
                ? " text-subtext"
                : mode === 2
                ? " text-candybuttonhighlight"
                : mode === 3
                ? " text-galaxysubtext"
                : "",
            )}
            onClick={() => setOpenLoginOrSignup(false)}
          >
            <span>Signup</span>
          </button>
          <button
            className={cn(
              "flex h-[65px] flex-1 items-center justify-center space-x-[5px]",
              openLoginOrSignup ? " border-b-2 font-bold" : "",
              openLoginOrSignup
                ? mode === 0
                  ? " border-blue2 text-white"
                  : mode === 1
                  ? " border-blue2 text-title"
                  : mode === 2
                  ? " border-candybuttonhighlight text-candytitle"
                  : mode === 3
                  ? " text-galaxytitle border-[#5200FF]"
                  : ""
                : mode === 0
                ? " text-subtext"
                : mode === 1
                ? " text-subtext"
                : mode === 2
                ? " text-candybuttonhighlight"
                : mode === 3
                ? " text-galaxysubtext"
                : "",
            )}
            onClick={() => setOpenLoginOrSignup(true)}
          >
            <span>Login</span>
          </button>
        </div>

        <Dialog.Close>
          <button
            className={cn(
              "rounded-tr-0 duration-800 absolute right-[-1px] top-[-2px] flex h-[35px] w-[35px] items-center justify-center rounded-[5px] transition",
              mode === 0
                ? " bg-button text-subtext hover:text-blue2"
                : mode === 1
                ? " bg-[#EDEDF0] text-blue2 hover:text-subtext"
                : mode === 2
                ? " bg-candybutton text-candysubtext"
                : mode === 3
                ? " bg-galaxybutton text-[#9277FF]"
                : "",
            )}
            onClick={close}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Dialog.Close>

        {openLoginOrSignup ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};
