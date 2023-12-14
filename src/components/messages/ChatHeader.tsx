"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { useInterface } from "#/state/interface";
import { Tooltip } from "../shared/Tooltip";
import { HeaderBackground } from "./HeaderBackground";
import { Modal } from "../shared/Modal";
import { ChatSettingsButton } from "./ChatSettingsButton";
import { useUserProfile } from "#/state/profile";

export function ChatHeader() {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const mode = useInterface(store => store.mode);
  const dopple = null;
  const profile = useUserProfile(store => store.profile);
  const login = null;
  const logout = null;

  return (
    <HeaderBackground className="justify-between space-x-2">
      <div className="flex flex-1 items-center space-x-[10px]">
        {dopple ? (
          <Tooltip
            content={
              <Fragment>
                <div
                  className={
                    "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-[15px] rounded-[10px] p-5" +
                    (mode === 0
                      ? " shadow-tooltip-dark bg-nav after:border-t-nav"
                      : mode === 1
                      ? " shadow-tooltip-light bg-white after:border-t-white"
                      : mode === 2
                      ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
                      : mode === 3
                      ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
                      : "")
                  }
                >
                  <div className="flex items-center space-x-[15px]">
                    {dopple?.avatarURL && (
                      <Image
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] rounded-[15px]"
                        src={dopple?.avatarURL + "?tr=w-400,h-400"}
                        alt=""
                      />
                    )}
                    <div className="flex flex-col space-y-[5px]">
                      <div className="flex items-center space-x-[5px]">
                        <span
                          className={
                            "text-[18px] font-bold leading-[21px]" +
                            (mode === 0
                              ? ""
                              : mode === 1
                              ? " text-title"
                              : mode === 2
                              ? " text-candytitle"
                              : mode === 3
                              ? " text-galaxytitle"
                              : "")
                          }
                        >
                          {dopple?.name}
                        </span>
                        <svg
                          className={
                            mode === 0
                              ? " text-white"
                              : mode === 1
                              ? " text-blue2"
                              : mode === 2
                              ? " text-[#FF36F7]"
                              : mode === 3
                              ? " text-[#5200FF]"
                              : ""
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z"
                          />
                        </svg>
                      </div>
                      <div
                        className={
                          "flex w-full items-center space-x-[10px] text-[14px] font-bold leading-[17px]" +
                          (mode === 0
                            ? " text-subtext"
                            : mode === 1
                            ? " text-subtext"
                            : mode === 2
                            ? " text-candysubtext"
                            : mode === 3
                            ? " text-galaxysubtext"
                            : "")
                        }
                      >
                        <span className="truncate leading-[120%]">
                          {dopple?.tagLine}
                        </span>
                      </div>
                      <span
                        className={
                          "text-[12px] leading-[15px]" +
                          (mode === 0
                            ? " text-subtext"
                            : mode === 1
                            ? " text-subtext"
                            : mode === 2
                            ? " text-candysubtext"
                            : mode === 3
                            ? " text-galaxysubtext"
                            : "")
                        }
                      >
                        {dopple?.bio.length > 120
                          ? dopple?.bio.slice(0, 120) + "..."
                          : dopple?.bio}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full space-x-[10px]">
                    <button
                      className={
                        "flex h-[45px] flex-1 items-center justify-center space-x-[5px] rounded-[5px] text-[14px] font-bold leading-[17px]" +
                        (mode === 0
                          ? " bg-blue2"
                          : mode === 1
                          ? " bg-blue2"
                          : mode === 2
                          ? " bg-candysubtext"
                          : mode === 3
                          ? " bg-[#7747DC]"
                          : "")
                      }
                      onClick={() => openProfile(dopple)}
                    >
                      View Profile
                    </button>
                    <button className="relative flex-1 overflow-hidden rounded-[5px]">
                      <div
                        className={
                          "absolute left-0 top-0 h-[5px] w-full" +
                          (mode === 0
                            ? " bg-[rgba(4,141,255,.50)]"
                            : mode === 1
                            ? " bg-[rgba(4,141,255,.50)]"
                            : mode === 2
                            ? " bg-[rgba(221,87,175,.5)]"
                            : mode === 3
                            ? " bg-[rgba(119,71,220,.5)]"
                            : "")
                        }
                      >
                        <div
                          className={
                            "h-full w-[30%]" +
                            (mode === 0
                              ? " bg-blue2"
                              : mode === 1
                              ? " bg-blue2"
                              : mode === 2
                              ? " bg-candysubtext"
                              : mode === 3
                              ? " bg-[#7747DC]"
                              : "")
                          }
                        />
                      </div>
                      <div
                        className={
                          "flex h-[45px] w-full items-center justify-center space-x-[5px] text-[14px] font-bold leading-[17px]" +
                          (mode === 0
                            ? " bg-button text-blue2"
                            : mode === 1
                            ? " bg-[#EDEDF0] text-subtextlight"
                            : mode === 2
                            ? " bg-candybutton text-candysubtext"
                            : mode === 3
                            ? " text-galaxytitle bg-galaxybutton"
                            : "")
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="currentColor"
                        >
                          <rect x="0.75" width="6" height="15" />
                          <rect x="9.75" width="6" height="15" />
                        </svg>
                        <span>Stop Playing</span>
                      </div>
                    </button>
                  </div>
                </div>
              </Fragment>
            }
          >
            {dopple?.avatarURL && (
              <Image
                width={45}
                height={45}
                className="h-[45px] w-[45px] rounded-[5px]"
                src={dopple?.avatarURL + "?tr=w-200,h-200"}
                alt=""
              />
            )}
          </Tooltip>
        ) : (
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[5px] bg-button text-subtext">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="currentColor"
            >
              <path
                opacity="0.1"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z"
              />
            </svg>
          </div>
        )}
        <div className="flex w-0 flex-1 flex-col items-start space-y-[5px]">
          <div className="flex w-full items-center space-x-[5px] text-[18px] font-bold leading-[22px]">
            <span
              className={
                "truncate leading-[120%]" +
                (mode === 0
                  ? ""
                  : mode === 1
                  ? " text-title"
                  : mode === 2
                  ? " text-candytitle"
                  : mode === 3
                  ? " text-galaxytitle"
                  : "")
              }
            >
              {dopple ? (
                dopple.name
              ) : (
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={10}
                  sx={{ bgcolor: "#363941" }}
                />
              )}
            </span>
            <svg
              className={
                mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-blue2"
                  : mode === 2
                  ? " text-[#FF36F7]"
                  : mode === 3
                  ? " text-[#5200FF]"
                  : ""
              }
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z"
              />
            </svg>
            <Tooltip
              content={
                <Fragment>
                  <div
                    className={
                      "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5" +
                      (mode === 0
                        ? " shadow-tooltip-dark bg-nav after:border-t-nav"
                        : mode === 1
                        ? " shadow-tooltip-light bg-white after:border-t-white"
                        : mode === 2
                        ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
                        : mode === 3
                        ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
                        : "")
                    }
                  >
                    <div
                      className={
                        "flex items-center space-x-[5px]" +
                        (mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-candytitle"
                          : mode === 3
                          ? " text-galaxytitle"
                          : "")
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="15"
                        viewBox="0 0 13 15"
                        fill="currentColor"
                      >
                        <path d="M3.79927 6.81818H9.20154V4.77273C9.20154 4.01989 8.93776 3.37713 8.41019 2.84446C7.88263 2.31179 7.24603 2.04545 6.5004 2.04545C5.75478 2.04545 5.11818 2.31179 4.59062 2.84446C4.06305 3.37713 3.79927 4.01989 3.79927 4.77273V6.81818ZM12.578 7.84091V13.9773C12.578 14.2614 12.4795 14.5028 12.2825 14.7017C12.0856 14.9006 11.8464 15 11.565 15H1.43578C1.15441 15 0.915246 14.9006 0.718288 14.7017C0.52133 14.5028 0.422852 14.2614 0.422852 13.9773V7.84091C0.422852 7.55682 0.52133 7.31534 0.718288 7.11648C0.915246 6.91761 1.15441 6.81818 1.43578 6.81818H1.77342V4.77273C1.77342 3.46591 2.23768 2.34375 3.16619 1.40625C4.09471 0.46875 5.20611 0 6.5004 0C7.7947 0 8.9061 0.46875 9.83462 1.40625C10.7631 2.34375 11.2274 3.46591 11.2274 4.77273V6.81818H11.565C11.8464 6.81818 12.0856 6.91761 12.2825 7.11648C12.4795 7.31534 12.578 7.55682 12.578 7.84091Z" />
                      </svg>
                      <span className="font-Inter text-[18px] font-bold leading-[22px]">
                        Encrypted Chat
                      </span>
                    </div>
                    <div className="flex items-start space-x-[10px]">
                      <span
                        className={
                          "font-Inter max-w-[258px] text-[14px] leading-[17px]" +
                          (mode === 0
                            ? " text-subtext"
                            : mode === 1
                            ? " text-subtext"
                            : mode === 2
                            ? " text-candysubtext"
                            : mode === 3
                            ? " text-galaxysubtext"
                            : "")
                        }
                      >
                        Dopple chats are secured with AES 256-bit end-to-end
                        encryption.
                        <br />
                        <Link
                          href="/terms"
                          className={
                            "font-bold" +
                            (mode === 0
                              ? " text-blue2"
                              : mode === 1
                              ? " text-blue2"
                              : mode === 2
                              ? " text-[#FF36F7]"
                              : mode === 3
                              ? " text-[#5200FF]"
                              : "")
                          }
                        >
                          Learn more.
                        </Link>
                      </span>
                    </div>
                  </div>
                </Fragment>
              }
            >
              <Image
                width={15}
                height={15}
                className="h-[15px] w-[15px]"
                src="/images/explore/lock-green.svg"
                alt=""
              />
            </Tooltip>
          </div>
          <div
            className={
              "flex w-full items-center space-x-[10px] text-[14px] leading-[17px]" +
              (mode === 0
                ? " text-subtext"
                : mode === 1
                ? " text-subtext"
                : mode === 2
                ? " text-candysubtext"
                : mode === 3
                ? " text-galaxysubtext"
                : "")
            }
          >
            <span className="truncate leading-[120%]">
              {dopple ? (
                dopple.tagLine
              ) : (
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={10}
                  sx={{ bgcolor: "#363941" }}
                />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-[10px]">
        <Modal
          type="chat"
          className="DialogContent--Right"
          trigger={
            <ChatSettingsButton
              mode={mode}
              onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
            />
          }
        />
        {profile ? (
          <button
            className={
              "relative flex h-[45px] items-center justify-center rounded-[5px] px-[15px]" +
              (mode === 0
                ? " bg-button text-white hover:bg-[#34363C]"
                : mode === 1
                ? " bg-[#EDEDF0] text-title hover:bg-[#DCDCE0]"
                : mode === 2
                ? " bg-candybutton text-candytitle hover:bg-[#DD14D5]"
                : mode === 3
                ? " bg-galaxybutton text-white hover:bg-[#5200FF]"
                : "")
            }
            onClick={() => setOpenProfileMenu(!openProfileMenu)}
          >
            <div className="h-[25px] w-[25px] overflow-hidden rounded-full border border-white">
              {profile?.pictures[profile?.picture] && (
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="h-full w-full object-cover"
                  src={
                    profile?.pictures[profile?.picture] ??
                    "/images/blank-profile.svg"
                  }
                  alt=""
                />
              )}
            </div>
            <span className="ml-[5px]">{profile.username}</span>
            <svg
              className={
                "ml-[15px] transition" +
                (openProfileMenu ? " rotate-[180deg]" : "")
              }
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              stroke="currentColor"
            >
              <path d="M1 1L6 6L11 1" strokeWidth="2" />
            </svg>
            {openProfileMenu && (
              <div
                className={
                  "absolute right-0 top-[calc(100%+5px)] z-[2] flex w-[125px] w-full flex-col space-y-[10px] rounded-[5px] border py-[5px] text-[14px] font-semibold leading-[17px] backdrop-blur-[25px]" +
                  (mode === 0
                    ? " border-button bg-[rgba(21,21,24,0.9)]"
                    : mode === 1
                    ? " border-[#EDEDF0] bg-[rgba(255,255,255,0.9)]"
                    : mode === 2
                    ? " border-candysubtext bg-candynav"
                    : mode === 3
                    ? " border-galaxybutton bg-galaxynav"
                    : "")
                }
              >
                <Link
                  href="/account"
                  className={
                    "flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px]" +
                    (mode === 0
                      ? " bg-button"
                      : mode === 1
                      ? " bg-[#EDEDF0] text-title"
                      : mode === 2
                      ? " bg-candysubtext"
                      : mode === 3
                      ? " bg-galaxybutton"
                      : "")
                  }
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
                  className="flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px] text-[#E93131]"
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
            className={
              "flex h-[45px] items-center justify-center rounded-[5px] px-5 text-[14px] font-bold leading-[17px]" +
              (mode === 0
                ? " bg-blue2"
                : mode === 1
                ? " bg-blue2 text-white"
                : mode === 2
                ? " bg-candysubtext"
                : mode === 3
                ? " bg-galaxysubtext"
                : "")
            }
            onClick={login}
          >
            Login
          </button>
        )}
      </div>
    </HeaderBackground>
  );
}
