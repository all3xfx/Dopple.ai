"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInterface } from "#/state/interface";
import { useUserProfile } from "#/state/profile";

import { signInSchema } from "./validation";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { AppleLoginButton } from "./AppleLoginButton";

import { cn } from "#/lib/cn";

type Inputs = {
  emailUsername: string;
  password: string;
};

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const mode = useInterface(store => store.mode);
  const signIn = useUserProfile(store => store.signIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => signIn(data);

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
          Log In to Dopple
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
            "relative mt-[32.5px] h-[1px] bg-button md:mt-[40.5px]",
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
        <div className={cn("mt-[32.5px] flex flex-col md:mt-[39.5px]")}>
          {errors.email?.message && (
            <p className={cn("mb-2 text-right text-[13px] text-red-500")}>
              {errors.email?.message}
            </p>
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
              {...register("emailUsername", { required: true })}
              className={cn(
                "duration-800 h-[45px] rounded-[5px] border px-5 text-[14px] leading-[17px] placeholder-black4 transition hover:border-[#8A939D] focus:border-[#8A939D] md:h-[50px] md:px-4",
              )}
              placeholder="Email / Username"
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
              errors?.password?.message ? " border-red1" : " border-black5",
            )}
          >
            <input
              {...register("password", { required: true })}
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
            className={cn(
              "duration-800 mt-[15px] w-full rounded-[5px] bg-blue2 py-[14px] text-center text-[14px] font-bold leading-[17px] transition hover:bg-white hover:text-blue2 md:py-[16.5px]",
            )}
          >
            Continue
          </button>
          <div
            className={cn(
              "mt-[30px] flex items-center justify-between text-[14px] leading-[17px] md:mt-[15px]",
            )}
          >
            <button
              className={cn("flex items-center space-x-[5px]")}
              onClick={() => setRemember(!remember)}
            >
              <div
                className={cn(
                  "flex h-[20px] w-[20px] items-center justify-center rounded-[5px] border border-black5",
                )}
              >
                {remember && (
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.14286L4.6 7L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span>Remember Me</span>
            </button>
            <button
              className={cn(
                "duration-800 text-blue2 transition hover:text-white",
              )}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
