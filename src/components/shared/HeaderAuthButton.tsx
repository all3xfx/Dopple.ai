"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useUserProfile } from "#/state/profile";
import { useModal } from "#/state/modal";
import { isSignedIn } from "#/utilities/helper";

import { cn } from "#/lib/cn";

export function HeaderAuthButton() {
  const profile = useUserProfile(store => store.profile);
  const setModal = useModal(store => store.setModal);
  const signOut = useUserProfile(store => store.signOut);

  const login = () => setModal("auth");
  const logout = () => signOut();

  const [dropdownOpened, setDropdownOpened] = useState(false);

  return (
    <>
      {isSignedIn() ? (
        <button
          className={cn(
            "relative ml-[10px] flex h-[45px] items-center justify-center rounded-[5px] bg-button px-[15px] text-white hover:bg-[#34363C]",
          )}
          onClick={() => setDropdownOpened(o => !o)}
        >
          <div
            className={cn(
              "h-[25px] w-[25px] overflow-hidden rounded-full border border-white",
            )}
          >
            {profile.pictures[profile.picture] && (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="h-full w-full object-cover"
                src={profile.pictures[profile.picture]}
                alt=""
              />
            )}
          </div>
          <span className="ml-[5px] max-w-[80px] truncate">
            {profile.username}
          </span>
          <svg
            className={cn(
              "ml-[15px] transition",
              dropdownOpened ? " rotate-[180deg]" : "",
            )}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            stroke="currentColor"
          >
            <path d="M1 1L6 6L11 1" strokeWidth="2" />
          </svg>
          {dropdownOpened && (
            <div
              className={cn(
                "absolute right-0 top-[calc(100%+5px)] z-[2] flex w-full min-w-[125px] flex-col space-y-[10px] rounded-[5px] border border-button bg-[rgba(21,21,24,0.9)] py-[5px] text-[14px] font-semibold leading-[17px] backdrop-blur-[25px]",
              )}
            >
              <Link
                href="/account"
                className={cn(
                  "flex h-[50px] items-center justify-center space-x-[10px] bg-button text-[14px] leading-[17px]",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.39719 3.03031L7.89858 0.431429L9.83599 3.03432C10.6132 2.92104 11.3968 2.92382 12.1619 3.03601L14.1006 0.431396L18.6019 3.03027L17.3159 6.01093C17.5532 6.31219 17.7719 6.63411 17.9693 6.976C18.1667 7.31793 18.3362 7.66834 18.4784 8.02456L21.7028 8.40114V13.5989L18.4776 13.9756C18.1923 14.6942 17.8029 15.3741 17.3162 15.9905L18.6015 18.9695L14.1002 21.5684L12.1629 18.9658C11.3858 19.079 10.6024 19.0763 9.83738 18.9641L7.89898 21.5684L3.39759 18.9695L4.68333 15.9896C4.44586 15.6882 4.22707 15.3661 4.02959 15.0241C3.83214 14.6821 3.66265 14.3316 3.52039 13.9754L0.296875 13.5989L0.296875 8.40113L3.52124 8.02456C3.80661 7.30595 4.19597 6.62601 4.68266 6.0096L3.39719 3.03031ZM12.3432 13.327C13.6285 12.585 14.0688 10.9416 13.3268 9.65636C12.5848 8.37115 10.9414 7.93081 9.65617 8.67282C8.37097 9.41483 7.93062 11.0582 8.67264 12.3434C9.41465 13.6286 11.058 14.069 12.3432 13.327Z"
                  />
                </svg>
                <span>Settings</span>
              </Link>
              <button
                className={cn(
                  "flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px] text-[#E93131]",
                )}
                onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3485_51654)">
                    <path
                      d="M2.85349 3.16406L11.5961 7.29695V24.2986L2.85303 19.5079L2.85349 3.16406Z"
                      fill="#E93131"
                      stroke="#E93131"
                      strokeWidth="1.37476"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.99902 2.39624L16.5817 2.39624L16.5817 5.83704M11.2378 18.5087L16.5817 18.5087L16.5817 14.8454"
                      stroke="#E93131"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M15.5625 10.4399L22.5876 10.4399"
                      stroke="#E93131"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M19.668 6.96094L23.1468 10.4398L19.668 13.9187"
                      stroke="#E93131"
                      strokeWidth="1.3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3485_51654">
                      <rect
                        width="25"
                        height="25"
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>Log out</span>
              </button>
            </div>
          )}
        </button>
      ) : (
        <button
          className={cn(
            "ml-[10px] flex h-[45px] items-center justify-center rounded-[5px] bg-blue2 px-5 text-[14px] font-bold leading-[17px]",
          )}
          onClick={login}
        >
          Login
        </button>
      )}
    </>
  );
}
