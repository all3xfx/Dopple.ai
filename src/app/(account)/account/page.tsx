"use client";

import { useState, useCallback, Fragment, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Collapse, useMediaQuery } from "@mui/material";
import Link from "next/link";

import { cn } from "#/lib/cn";

import { languages } from "../../../config";

import { AvatarCropModal } from "#/components/account/AvatarCropModal";
import { useUserProfile } from "#/state/profile";
import { useInterface } from "#/state/interface";
import { CustomDropzone as Dropzone } from "#/components/account/Dropzone";

import { request } from "#/utilities/fetch";

const Account = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const mode = useInterface(store => store.mode);
  const profile = useUserProfile(store => store.profile);
  const deleteUser = useUserProfile(store => store.deleteUser);
  const signOut = useUserProfile(store => store.signOut);
  const updateUser = useUserProfile(store => store.updateUser);

  const { username, email, picture, pictures } = profile;
  const [newUsername, setNewUsername] = useState(profile.username);
  const [language, setLanguage] = useState(0);
  const [isLanguageShown, setIsLanguageShown] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [languageUnsaved, setLanguageUnsaved] = useState(0);
  const [newAvatar, setNewAvatar] = useState(picture);
  const [indexUnsaved, setIndexUnsaved] = useState(picture);
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [avatarFileUrl, setAvatarFileUrl] = useState("");
  const [avatarPreviews, setAvatarPreviews] = useState(pictures);

  // Update state if profile information is updating
  useEffect(() => {
    setAvatarPreviews(pictures);
    setNewAvatar(picture);
  }, [profile]);

  const checkUsername = () => {
    const resp = request(
      `https://api.dopple.ai/user/username/${newUsername}`,
      {},
      true,
    );

    resp.then(data => {
      setNameExists(data.exists);
    });
  };

  useEffect(() => {
    checkUsername();
  }, [newUsername]);

  const save = () =>
    updateUser({
      username: newUsername,
      picture: newAvatar,
      pictures: avatarPreviews,
    });

  const applyAvatar = () => {
    setOpenAvatarEdit(false);
    setNewAvatar(indexUnsaved);
  };

  const apply = () => null;

  const fetchUploadImage = async file => {
    setOpenAvatarModal(true);
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "Honeywell");

    const resp = request(
      "https://api.cloudinary.com/v1_1/Honeywell/image/upload",
      {
        method: "POST",

        body: data,
      },
      true,
    );

    resp.then(respData => setAvatarFileUrl(respData.url));
  };

  const dropHandler = useCallback(async acceptedFiles => {
    const [File] = acceptedFiles;
    fetchUploadImage(File);
  }, []);

  const handleDeleteUser = () => {
    deleteUser({ email });
    router.push("/");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const validForm =
    nameExists ||
    newUsername === username ||
    newUsername?.length > 15 ||
    newUsername?.length < 5 ||
    indexUnsaved === 0;

  return (
    <>
      {isDesktop && (
        <header
          className={cn(
            "fixed left-0 top-0 z-[2] h-[70px] w-full bg-nav-desktop",
          )}
        >
          <span
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold leading-[21px]",
            )}
          >
            My Account
          </span>
          <Link
            href="/"
            className={cn(
              "absolute left-[62px] top-1/2 flex -translate-y-1/2 items-center space-x-[10px] text-[16px] font-bold leading-[19px] text-blue2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to explore</span>
          </Link>
        </header>
      )}
      {openAvatarEdit && (
        <header
          className={cn(
            "fixed left-0 top-0 z-[2] h-[75px] w-full bg-nav-desktop",
          )}
        >
          <span
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold leading-[21px]",
            )}
          >
            Change Avatar
          </span>
          <button
            className={cn(
              "absolute left-[22px] top-1/2 flex -translate-y-1/2 items-center space-x-[10px] text-[16px] font-bold leading-[19px] text-blue2",
            )}
            onClick={() => setOpenAvatarEdit(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>
      )}
      {isLanguageShown && !isDesktop && (
        <header
          className={cn(
            "fixed left-0 top-0 z-[2] h-[75px] w-full bg-nav-desktop",
          )}
        >
          <span
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold leading-[21px]",
            )}
          >
            Language
          </span>
          <Link
            href="/"
            className={cn(
              "absolute left-[22px] top-1/2 flex -translate-y-1/2 items-center space-x-[10px] text-[16px] font-bold leading-[19px] text-blue2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </header>
      )}
      {openAvatarEdit ? (
        <div
          className={cn(
            "mx-auto flex max-w-[750px] flex-col space-y-[56px] px-5 pb-[50px] pt-[15px] lg:pt-[72px]",
          )}
        >
          <div
            className={cn(
              "grid grid-cols-3 gap-[15px] lg:grid-cols-6 lg:gap-[5px]",
            )}
          >
            <Dropzone dropHandler={dropHandler} />
            <AvatarCropModal
              fileUrl={avatarFileUrl}
              setFileUrl={setAvatarFileUrl}
              open={openAvatarModal}
              setOpen={setOpenAvatarModal}
              previews={avatarPreviews}
              setPreviews={setAvatarPreviews}
            />
            <Fragment>
              {avatarPreviews.map((x: any, i: number) => (
                <button
                  className={cn(
                    "relative h-[119px] w-[119px] overflow-hidden rounded-[5px] border",
                    {
                      "border-3 border-blue2": indexUnsaved === i,
                      "border-button": indexUnsaved !== i,
                    },
                  )}
                  onClick={() => setIndexUnsaved(i)}
                >
                  <div
                    className={cn(
                      "absolute bottom-[5px] right-[5px] flex h-5 w-5 items-center justify-center rounded-full border bg-inputback",
                      {
                        "border-transparent bg-blue2": indexUnsaved === i,
                        "border-[#31333C] bg-inputback": indexUnsaved !== i,
                      },
                    )}
                  >
                    <svg
                      className={cn({
                        "opacity-100": indexUnsaved === 1,
                        "opacity-0": indexUnsaved !== 1,
                      })}
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="8"
                      viewBox="0 0 13 8"
                      fill="none"
                    >
                      <path
                        d="M1.64722 3.14286L5.24722 7L11.6472 1"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {x && (
                    <Image
                      className={cn("h-full w-full object-cover")}
                      width={119}
                      height={119}
                      src={x}
                      alt=""
                    />
                  )}
                </button>
              ))}
            </Fragment>
          </div>
          <button
            className={cn(
              "mx-auto h-[50px] w-full max-w-[491px] rounded-[5px] bg-blue2 text-center text-[16px] font-bold leading-[19px]",
            )}
            onClick={() => applyAvatar()}
          >
            Apply
          </button>
        </div>
      ) : isLanguageShown && !isDesktop ? (
        <div className={cn("flex flex-col space-y-5 px-5 pb-[50px] pt-[15px]")}>
          <div className={cn("langlist flex w-full flex-col rounded-[5px]")}>
            {languages.map((x: any, i: number) => (
              <button
                className={cn(
                  "duration-800 flex items-center justify-between space-x-[10px] border-b p-[15px] text-[16px] leading-[19px] transition",
                  {
                    "border-[#31333C] bg-button text-white hover:bg-[#31333C]":
                      mode === 0,
                    "border-[#C6CED8] bg-[#EDEDF0] text-title hover:bg-[#C6CED8]":
                      mode === 1,
                    "border-candysubtext bg-candybutton text-candytitle hover:bg-candysubtext":
                      mode === 2,
                    "text-galaxytitle border-[rgba(156,116,243,.5)] bg-galaxybutton hover:bg-[rgba(156,116,243,.5)]":
                      mode === 3,
                  },
                )}
                key={i}
                onClick={() => setLanguageUnsaved(i)}
              >
                <div
                  className={cn("flex w-0 flex-1 items-center space-x-[10px]")}
                >
                  {x.flag && (
                    <Image src={x.flag} alt="" width={30} height={30} />
                  )}
                  <span className={cn("w-0 flex-1 truncate text-left")}>
                    {x.name}
                  </span>
                </div>
                {i === languageUnsaved ? (
                  <>
                    {(mode === 0 || mode === 1) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <rect width="30" height="30" rx="15" fill="#048DFF" />
                        <path
                          d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {mode === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <rect width="30" height="30" rx="15" fill="white" />
                        <path
                          d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                          stroke="#DD57AF"
                          strokeWidth="3"
                        />
                      </svg>
                    )}
                    {mode === 3 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <rect width="30" height="30" rx="15" fill="#5200FF" />
                        <path
                          d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                          stroke="white"
                          strokeWidth="3"
                        />
                      </svg>
                    )}
                  </>
                ) : (
                  <div
                    className={cn("h-[30px] w-[30px] rounded-full border", {
                      "border-[#31333C] bg-inputback": mode === 0,
                      "border-[#C4C7CB] bg-white1": mode === 1,
                      "border-candysubtext bg-candynav": mode === 2,
                      "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                    })}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            className={cn(
              "mt-[30px] flex min-h-[50px] w-full items-center justify-center rounded-[5px] text-[16px] font-bold leading-[19px] disabled:opacity-50",
              {
                "bg-blue2": mode === 0 || mode === 1,
                "bg-candysubtext": mode === 2,
                "bg-galaxysubtext": mode === 3,
              },
            )}
            onClick={apply}
          >
            Apply
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "mx-auto flex h-full max-w-[500px] flex-col items-center px-5 pb-[30px] pt-[90px]",
          )}
        >
          {!isDesktop && (
            <span className={cn("text-[24px] font-bold leading-[28px]")}>
              My Account
            </span>
          )}
          <div
            className={cn(
              "relative mt-[15px] h-[150px] w-[150px] overflow-hidden rounded-[10px] bg-button",
            )}
          >
            {avatarPreviews[newAvatar] && (
              <Image
                className={cn("h-full w-full object-cover")}
                src={avatarPreviews[newAvatar]}
                width={150}
                height={150}
                alt=""
              />
            )}
            <button
              className={cn(
                "absolute bottom-[5px] right-[5px] flex h-10 w-10 items-center justify-center rounded-[15px] bg-blue2",
              )}
              onClick={() => setOpenAvatarEdit(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.1454 9.12472L12.3421 13.0624L5.42387 13.9602L6.48436 7.15146L10.7675 3.01205L1.59824 3.01218C1.42845 3.13554 1.7216 2.84239 1.59824 3.01218L1.59724 3.01202V17.5602H1.59847C1.60091 17.5602 1.59724 17.5602 1.59724 17.5602C1.59724 17.5602 1.59604 17.5602 1.59847 17.5602H16.1454C16.022 17.73 16.3152 17.4368 16.1454 17.5602V9.12472Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.4264 0.588867L18.9335 4.08475L16.4958 6.54665L14.7028 4.75351L12.9726 3.02327L15.4264 0.588867ZM11.9966 3.9915L8.29032 7.66844C8.18271 7.77605 8.10719 7.90967 8.07561 8.04835L7.14661 12.3309L11.4867 11.4454C11.6214 11.4123 11.7507 11.338 11.8553 11.2334L15.5286 7.52356L13.7307 5.7256L11.9966 3.9915Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className={cn("mt-[15px] flex w-full flex-col")}>
            <span className={cn("text-[14px] leading-[17px] text-subtext")}>
              Username
            </span>
            <div
              className={cn(
                "relative mt-[5px] flex h-[50px] items-center rounded-[5px] border border-button bg-nav px-5",
                {
                  "border-[#E93131]":
                    (nameExists && username !== profile.username) ||
                    username?.length > 15,
                },
              )}
            >
              <input
                className={cn("w-0 flex-1")}
                placeholder="Username"
                value={newUsername.length > 0 ? newUsername : username}
                onChange={e => setNewUsername(e.target.value)}
              />
              {nameExists ||
              newUsername === username ||
              newUsername?.length > 15 ||
              newUsername?.length < 5 ? (
                <svg
                  className={cn("ml-[10px] cursor-pointer")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  onClick={() => setNewUsername("")}
                >
                  <path
                    d="M2 1.5L17 16.5M2 16.5L17 1.5"
                    stroke="#E93131"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className={cn("ml-[10px]")}
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
              )}
              {nameExists && (
                <span
                  className={cn(
                    "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                  )}
                >
                  Username is already in use
                </span>
              )}
              {newUsername?.length > 15 && (
                <span
                  className={cn(
                    "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                  )}
                >
                  Max character limit reached
                </span>
              )}
            </div>
            <span
              className={cn("mt-[5px] text-[12px] leading-[14px] text-subtext")}
            >
              You can change this at any time
            </span>
            <span
              className={cn(
                "mt-[15px] text-[14px] leading-[17px] text-subtext",
              )}
            >
              My Email
            </span>
            <div
              className={cn(
                "relative mt-[5px] flex h-[50px] items-center space-x-[10px] rounded-[5px] border border-button bg-nav px-5",
              )}
            >
              <input
                className={cn("w-0 flex-1 text-subtext")}
                placeholder="My Email"
                readOnly
                value={profile?.email}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.89453 5.89407C4.89453 4.4857 6.03624 3.34399 7.44461 3.34399C8.85298 3.34399 9.99468 4.4857 9.99468 5.89407V7.27417H4.89453V5.89407ZM2.89453 7.27417V5.89407C2.89453 3.38113 4.93167 1.34399 7.44461 1.34399C9.95755 1.34399 11.9947 3.38113 11.9947 5.89407V7.27417H13.4667V15.5H1.5332V7.27417H2.89453Z"
                  fill="#848D97"
                />
              </svg>
            </div>
            <span
              className={cn(
                "mt-[15px] text-[14px] leading-[17px] text-subtext",
              )}
            >
              Language
            </span>
            <button
              className={cn(
                "relative mt-[5px] flex h-[50px] items-center justify-between space-x-[10px] rounded-[5px] bg-button px-5",
                { "rounded-t-[5px]": isLanguageShown },
              )}
              onClick={() => setIsLanguageShown(!isLanguageShown)}
            >
              <div
                className={cn("flex w-0 flex-1 items-center space-x-[10px]")}
              >
                {languages[language].flag && (
                  <Image
                    className={cn("h-[30px] w-[30px]")}
                    src={languages[language].flag}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <span className={cn("w-0 flex-1 truncate text-left")}>
                  {languages[language].name}
                </span>
              </div>
              <svg
                className={cn("transition", {
                  "rotate-[180deg] transition": !(isLanguageShown && isDesktop),
                })}
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="11"
                viewBox="0 0 17 11"
                fill="none"
              >
                <path
                  d="M1 9.75L8.5 2.25L16 9.75"
                  stroke="#8A939D"
                  strokeWidth="2"
                />
              </svg>
            </button>
            {isDesktop && (
              <Collapse in={isLanguageShown}>
                <div
                  className={cn(
                    "flex w-full flex-col overflow-hidden rounded-b-[5px] bg-[#31333C]",
                  )}
                >
                  {languages.map((x, i) => (
                    <button
                      className={cn(
                        "duration-800 flex items-center justify-between space-x-[10px] border-y border-[#31333C] bg-button px-5 py-[15px] text-[16px] leading-[19px] text-white transition hover:bg-[#31333C]",
                      )}
                      key={i}
                      onClick={() => setLanguage(i)}
                    >
                      <div
                        className={cn(
                          "flex w-0 flex-1 items-center space-x-[10px]",
                        )}
                      >
                        {x.flag && (
                          <Image
                            className={cn("h-[30px] w-[30px]")}
                            width={30}
                            height={30}
                            src={x.flag}
                            alt=""
                          />
                        )}
                        <span className={cn("w-0 flex-1 truncate text-left")}>
                          {x.name}
                        </span>
                      </div>
                      {language === i ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <rect width="30" height="30" rx="15" fill="#048DFF" />
                          <path
                            d="M7.5 13.7143L12.9 19.5L22.5 10.5"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <div
                          className={cn(
                            "h-[30px] w-[30px] rounded-full border border-[#31333C] bg-inputback",
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </Collapse>
            )}
            <button
              className={cn(
                "mt-[15px] flex h-[50px] items-center justify-center rounded-[5px] bg-blue2 text-[16px] font-bold leading-[19px] transition duration-300 disabled:bg-subtext",
              )}
              disabled={validForm}
              onClick={() => save()}
            >
              Save Changes
            </button>
            <div
              className={cn("relative mt-[39.5px] h-[1px] w-full bg-button")}
            >
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black15 px-[11.59px] text-[16px] font-bold leading-[19px]",
                )}
              >
                Account Status
              </div>
            </div>
            <button
              className={cn(
                "mt-[39.5px] flex h-[50px] items-center justify-center rounded-[5px] bg-button text-[16px] font-bold leading-[19px] text-[#E93131] disabled:bg-subtext",
              )}
              onClick={() => handleSignOut()}
            >
              Sign out
            </button>
            <button
              className={cn(
                "mt-[15px] flex h-[50px] items-center justify-center rounded-[5px] bg-[#E93131] text-[16px] font-bold leading-[19px] text-white",
              )}
              onClick={() => handleDeleteUser()}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
