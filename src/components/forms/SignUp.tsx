"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useInterface } from "#/state/interface";

import { signUpSchema } from "./validation";
import { useUserProfile } from "#/state/profile";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { AppleLoginButton } from "./AppleLoginButton";

import { cn } from "#/lib/cn";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const mode = useInterface(store => store.mode);
  const signUp = useUserProfile(store => store.signUp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => signUp(data);

  const nameExists = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(
          "relative flex flex-col overflow-hidden px-[15px] pb-[30px] lg:px-[30px] lg:pb-[103px]",
        )}
      >
        <span
          className={cn("text-center text-[24px] font-semibold leading-[28px]")}
        >
          Create an Account
        </span>
        <div
          className={cn(
            "mt-[30px] flex flex-col space-y-[10px] md:space-y-[15px]",
          )}
        >
          <GoogleLoginButton />
          <AppleLoginButton />
        </div>
        <div
          className={cn(
            "relative mt-[32.5px] h-[1px] bg-black5 md:mt-[40.5px]",
          )}
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-nav px-[11.58px] text-[14px] font-bold leading-[17px] text-button md:px-[10px]",
            )}
          >
            OR
          </div>
        </div>
        <div
          className={cn(
            "mt-[32.5px] flex flex-col space-y-[15px] md:mt-[39.5px]",
          )}
        >
          <div
            className={cn(
              "duration-800 relative flex h-[45px] w-full items-center rounded-[5px] rounded-[5px] border px-5 text-[14px] leading-[17px] transition focus-within:border-[#8A939D] hover:border-[#8A939D] md:h-[50px] md:px-4",
              mode === 0
                ? " bg-inputback"
                : mode === 1
                ? " bg-[#F7F7FA]"
                : mode === 2
                ? " bg-[#F7F7FA]"
                : mode === 3
                ? " bg-inputback"
                : "",
              nameExists
                ? " border-[#E93131]"
                : mode === 0
                ? " border-black5"
                : mode === 1
                ? " border-[#C4C7CB]"
                : mode === 2
                ? " border-[#C4C7CB]"
                : mode === 3
                ? " text-button"
                : "",
              errors.username?.message ? " border-red1" : " border-black5",
            )}
          >
            <input
              className={cn(
                "w-0 flex-1 placeholder-black4",
                mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-title"
                  : mode === 3
                  ? " text-white"
                  : "",
              )}
              placeholder="Choose username"
              {...register("username", { required: true })}
            />
            {nameExists || errors.username?.message ? (
              <svg
                className="ml-[10px] cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
              >
                <path
                  d="M2 1.5L17 16.5M2 16.5L17 1.5"
                  stroke="#E93131"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            ) : errors.username?.message ? (
              <svg
                className="ml-[10px]"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
              >
                <path
                  d="M2 4.72363L7.40001 10.4673L17 1.53271"
                  stroke="#048DFF"
                  strokeWidth="2.97819"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
            {nameExists && (
              <span
                className={cn(
                  "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                )}
              >
                Username is already in use
              </span>
            )}
            {errors.username?.message && (
              <span
                className={cn(
                  "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                )}
              >
                {errors.username?.message}
              </span>
            )}
          </div>
          {errors.email && (
            <span
              className={cn(
                "bottom-[calc(100%+5px)] right-0 h-[25px] text-right text-[14px] leading-[17px] text-[#E93131]",
              )}
            >
              {errors?.email?.message}
            </span>
          )}
          <div
            className={cn(
              "duration-800 relative flex h-[45px] w-full items-center rounded-[5px] rounded-[5px] border text-[14px] leading-[17px] transition focus-within:border-[#8A939D] hover:border-[#8A939D] md:h-[50px]",
              mode === 0
                ? " bg-inputback"
                : mode === 1
                ? " bg-[#F7F7FA]"
                : mode === 2
                ? " bg-[#F7F7FA]"
                : mode === 3
                ? " bg-inputback"
                : "",
              errors.email?.message
                ? " border-[#E93131]"
                : mode === 0
                ? " border-black5"
                : mode === 1
                ? " border-[#C4C7CB]"
                : mode === 2
                ? " border-[#C4C7CB]"
                : mode === 3
                ? " text-button"
                : "",
              errors.email?.message ? " border-red1" : " border-black5",
            )}
          >
            <input
              className={cn(
                "duration-800 h-[45px] w-full rounded-[5px] border px-5 text-[14px] leading-[17px] placeholder-black4 transition hover:border-[#8A939D] focus:border-[#8A939D] md:h-[50px] md:px-4",
                errors.email?.message ? " border-red1" : " border-black5",
              )}
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div
            className={cn(
              "duration-800 relative mt-[15px] flex h-[45px] w-full items-center rounded-[5px] rounded-[5px] border px-5 text-[14px] leading-[17px] transition focus-within:border-[#8A939D] hover:border-[#8A939D] md:h-[50px] md:px-4",
              mode === 0
                ? " bg-inputback"
                : mode === 1
                ? " bg-[#F7F7FA]"
                : mode === 2
                ? " bg-[#F7F7FA]"
                : mode === 3
                ? " bg-inputback"
                : "",
              mode === 0
                ? " border-black5"
                : mode === 1
                ? " border-[#C4C7CB]"
                : mode === 2
                ? " border-[#C4C7CB]"
                : mode === 3
                ? " text-button"
                : "",
              errors.password?.message ? " border-red1" : " border-black5",
            )}
          >
            <input
              className={cn(
                "w-0 flex-1 placeholder-black4",
                mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-title"
                  : mode === 3
                  ? " text-white"
                  : "",
              )}
              placeholder="Password"
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
            />
            <button
              className="text-subtext"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.0001 15.8333C10.7884 15.8333 11.5084 15.7474 12.1651 15.5991L10.7009 14.1349C10.4734 14.1524 10.2426 14.1666 10.0001 14.1666C5.54094 14.1666 3.81344 10.9616 3.3951 9.99993C3.70923 9.29894 4.13348 8.65272 4.65177 8.08577L3.48677 6.92077C2.2051 8.30993 1.71927 9.7091 1.7101 9.7366C1.65262 9.90774 1.65262 10.093 1.7101 10.2641C1.7276 10.3191 3.63927 15.8333 10.0001 15.8333ZM10.0001 4.1666C8.46927 4.1666 7.21177 4.4966 6.16344 4.9841L3.08927 1.91077L1.91094 3.0891L16.9109 18.0891L18.0893 16.9108L15.3234 14.1449C17.5018 12.5191 18.2793 10.2991 18.2909 10.2641C18.3484 10.093 18.3484 9.90774 18.2909 9.7366C18.2726 9.68077 16.3609 4.1666 10.0001 4.1666ZM14.1434 12.9649L12.2434 11.0649C12.4018 10.7399 12.5001 10.3824 12.5001 9.99993C12.5001 8.63243 11.3676 7.49993 10.0001 7.49993C9.6176 7.49993 9.2601 7.59827 8.93594 7.75743L7.42927 6.25077C8.25637 5.96694 9.12569 5.82577 10.0001 5.83327C14.4593 5.83327 16.1868 9.03827 16.6051 9.99993C16.3534 10.5766 15.6334 11.9516 14.1434 12.9649Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.99967 7.5C10.6627 7.5 11.2986 7.76339 11.7674 8.23223C12.2363 8.70107 12.4997 9.33696 12.4997 10C12.4997 10.663 12.2363 11.2989 11.7674 11.7678C11.2986 12.2366 10.6627 12.5 9.99967 12.5C9.33663 12.5 8.70075 12.2366 8.23191 11.7678C7.76307 11.2989 7.49967 10.663 7.49967 10C7.49967 9.33696 7.76307 8.70107 8.23191 8.23223C8.70075 7.76339 9.33663 7.5 9.99967 7.5ZM9.99967 3.75C14.1663 3.75 17.7247 6.34167 19.1663 10C17.7247 13.6583 14.1663 16.25 9.99967 16.25C5.83301 16.25 2.27467 13.6583 0.833008 10C2.27467 6.34167 5.83301 3.75 9.99967 3.75ZM2.64967 10C3.32322 11.3753 4.3691 12.534 5.66841 13.3444C6.96772 14.1548 8.46834 14.5844 9.99967 14.5844C11.531 14.5844 13.0316 14.1548 14.3309 13.3444C15.6303 12.534 16.6761 11.3753 17.3497 10C16.6761 8.62474 15.6303 7.46604 14.3309 6.65562C13.0316 5.8452 11.531 5.41557 9.99967 5.41557C8.46834 5.41557 6.96772 5.8452 5.66841 6.65562C4.3691 7.46604 3.32322 8.62474 2.64967 10Z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className={cn(
              "duration-800 w-full rounded-[5px] bg-blue2 py-[14px] text-center text-[14px] font-bold leading-[17px] transition hover:enabled:bg-white hover:enabled:text-blue2 disabled:opacity-50 md:py-[16.5px]",
            )}
            disabled={
              nameExists || errors.email?.message || errors.username?.message
            }
          >
            Create Account
          </button>
        </div>
        <span
          className={cn("mt-[30px] text-center text-[14px] leading-[17px]")}
        >
          By joining, I agree to the
          <Link href="/terms" className="font-bold text-blue2">
            {" "}
            Terms and Conditions
          </Link>
        </span>
      </div>
    </form>
  );
}
