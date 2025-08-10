"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

import { Tooltip } from "#/components/shared/Tooltip";
import { ClickAwayListener, Skeleton, useMediaQuery } from "@mui/material";

import { useInterface } from "#/state/interface";
import { SidebarFooter } from "#/components/messages/SidebarFooter";
import { languages } from "#/config";
import { Typing } from "#/components/messages/Typing";
import { getLastMsgDate, threadDate } from "#/utilities/format";

import { AudioPlayer } from "#/components/messages/AudioPlayer";
import { CopyButton } from "#/components/messages/CopyButton";
import { Modal } from "#/components/shared/Modal";
import {
  MessageFromBotMobile,
  MessageFromYouMobile,
} from "#/components/messages/MessagesMobile";
import { HeaderAuthButton } from "#/components/shared/HeaderAuthButton";
import { isSignedIn } from "#/utilities/helper";
import { useUserProfile } from "#/state/profile";
import { useDopple } from "#/state/dopples";

import { ChatSettingsButton } from "#/components/messages/ChatSettingsButton";

import { request } from "#/utilities/fetch";
import axios from "#/utilities/axiosConfig";

import { useUserSettings } from "#/state/settings";

import { cn } from "#/lib/cn";

const Messages = () => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const pathname = usePathname();

  const userId = useUserProfile(store => store.profile.userId);
  const profile = useUserProfile(store => store.profile);
  const mode = useInterface(store => store.mode);
  const setMode = useInterface(store => store.setMode);
  const dopple = useDopple(store => store.dopple);
  const setDopple = useDopple(store => store.setDopple);
  const history = useDopple(store => store.history);
  const setHistory = useDopple(store => store.setHistory);
  const textSize = useUserSettings(store => store.textSize);
  const setTextSize = useUserSettings(store => store.setTextSize);
  const alignment = useUserSettings(store => store.alignment);
  const setAlignment = useUserSettings(store => store.setAlignment);

  const setIsTypingSearch = null;
  const language = null;
  const setLanguage = null;
  const openChatSettings = null;
  const setOpenChatSettings = null;

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isLanguageShown, setIsLanguageShown] = useState(false);
  const [chatFilter, setChatFilter] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedIndexes, setEditedIndexes] = useState<number[]>([]);
  const [sending, setSending] = useState(false);
  const [loadedDopples, setLoadedDopples] = useState(false);
  const [loadedMsgs, setLoadedMsgs] = useState(false);
  const [msg, setMsg] = useState("");
  const [dopples, setDopples] = useState([]);
  const [filteredDopples, setFilteredDopples] = useState([]);
  const [voiceFrequency, setVoiceFrequency] = useState("1");
  const [languageUnsaved, setLanguageUnsaved] = useState(language);
  const messageContainer = useRef();
  const sendRef = useRef();
  const typeRef = useRef();
  const msgRef = useRef();

  const setIsTyping = () => null;

  const [openAvatarDetailMobile, setOpenAvatarDetailMobile] = useState(false);
  const [openRemixMobile, setOpenRemixMobile] = useState(false);

  const setTheme = i => {
    if (isSignedIn()) {
      setMode(i);
    } else login();
  };

  const setNewAlignment = i => {
    if (isSignedIn()) setAlignment(i);
    else login();
  };

  const _setIsLanguageShown = () => {
    if (isSignedIn()) setIsLanguageShown(true);
    else login();
  };

  const login = () => null;

  const logout = () => null;

  const apply = () => null;

  const openProfile = data => null;

  const edit = async () => {
    setEditing(true);
    let tmp = [...history];
    tmp[editIndex].message.data.content = msg;
    setHistory(tmp);
    setMsg("");
    setEditIndex(-1);
    setEditing(false);

    let tmp1 = [...editedIndexes];
    tmp1.push(editIndex);
    setEditedIndexes(tmp1);

    try {
      await axios.post("/firebase/updateMessage", {
        index: editIndex,
        newContent: msg,
        user: cookies?.userid,
        sender: dopple?.sender,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const send = async () => {
    setSending(true);
    setMsg("");
    try {
      const tmp = [...history];
      tmp.push({
        message: {
          data: {
            url: "",
            additional_kwargs: {},
            content: msg,
            example: false,
          },
          type: "human",
        },
        timestamp: new Date() / 1000,
      });
      setHistory(tmp);

      const _dopples = [...dopples];
      if (dopples.some(x => x._id === dopple._id)) {
        _dopples[
          _dopples.findIndex(x => x._id === dopple._id)
        ].chat_history.push({
          message: {
            data: {
              url: "",
              additional_kwargs: {},
              content: msg,
              example: false,
            },
            type: "human",
          },
          timestamp: new Date() / 1000,
        });
        console.log(
          _dopples[_dopples.findIndex(x => x._id === dopple._id)].chat_history,
        );
        setDopples(
          _dopples.sort(
            (a, b) =>
              b.chat_history[b.chat_history.length - 1].timestamp -
              a.chat_history[a.chat_history.length - 1].timestamp,
          ),
        );
      } else {
        _dopples.push({
          ...dopple,
          chat_history: [
            {
              message: {
                data: {
                  url: "",
                  additional_kwargs: {},
                  content: msg,
                  example: false,
                },
                type: "human",
              },
              timestamp: new Date() / 1000,
            },
          ],
        });
        setDopples(
          _dopples.sort(
            (a, b) =>
              b.chat_history[b.chat_history.length - 1].timestamp -
              a.chat_history[a.chat_history.length - 1].timestamp,
          ),
        );
      }

      const { content, attachments } = await request("/dopple/send_msg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: profile.email,
          dopple_name: dopple.sender,
          user_query: msg,
          id: dopple._id,
        }),
      });

      console.log("SEND DATA", content, attachments);

      const tmp1 = [...tmp];
      tmp1.push({
        message: {
          data: {
            additional_kwargs: {},
            content: content,
            url: attachments.length > 0 ? attachments[0] : undefined,
            example: false,
          },
          type: "ai",
        },
        timestamp: new Date() / 1000,
      });
      setHistory(tmp1);

      if (dopples.some(x => x._id === dopple._id)) {
        // Update dopples threads when users chatted with friends known before
        _dopples[
          _dopples.findIndex(x => x._id === dopple._id)
        ].chat_history.push({
          message: {
            data: {
              additional_kwargs: {},
              content: content,
              url: attachments.length > 0 ? attachments[0] : undefined,
              example: false,
            },
            type: "ai",
          },
          timestamp: new Date() / 1000,
        });
        setDopples(
          _dopples.sort(
            (a, b) =>
              b.chat_history[b.chat_history.length - 1].timestamp -
              a.chat_history[a.chat_history.length - 1].timestamp,
          ),
        );
      } else {
        // Update dopples threads when users start to chat
        const data = await request("/firebase/getDopplesDataByUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: profile.email }),
        });

        setDopples(
          data.sort(
            (a, b) =>
              b.chat_history[b.chat_history.length - 1].timestamp -
              a.chat_history[a.chat_history.length - 1].timestamp,
          ),
        );
      }
    } catch (e) {
      console.log(e);
    }
    setSending(false);
  };

  const keyDown = async e => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      sendRef?.current.click();
    }
  };

  useMemo(async () => {
    if (isSignedIn()) {
      const data = await request("/firebase/getDopplesDataByUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: profile.email }),
      });

      console.log(data);

      if (data) {
        setDopples(
          data.sort(
            (a, b) =>
              b.chat_history[b.chat_history.length - 1].timestamp -
              a.chat_history[a.chat_history.length - 1].timestamp,
          ),
        );
        setFilteredDopples(data);
        setEditedIndexes([]);
        setEditIndex(-1);
      }
      setLoadedDopples(true);
    } else setLoadedDopples(true);
  }, [userId, dopple, profile]);

  useMemo(async () => {
    setFilteredDopples(
      dopples.filter(x =>
        x.name.toLowerCase().includes(searchTxt.toLowerCase()),
      ),
    );
  }, [searchTxt, dopples]);
  // useEffect(() => {
  //     if (messageContainer?.current && history.length > 0) messageContainer?.current.scrollIntoView({ behavior: "smooth" })
  // }, [history.length]);
  useEffect(() => {
    if (messageContainer?.current) messageContainer?.current.scrollIntoView();
  }, [history.length, messageContainer?.current]);

  useMemo(async () => {
    if (dopple) {
      setLoadedMsgs(false);
      if (dopple?.chat_history?.length > 0) setHistory(dopple.chat_history);
      setLoadedMsgs(true);
    }
    if (document.getElementById("message-container"))
      document.getElementById("message-container").scrollTop =
        document.getElementById("message-container")?.scrollHeight;
  }, [dopple]);

  useMemo(() => {
    if (editIndex >= 0) setMsg(history[editIndex]?.message?.data?.content);
  }, [editIndex]);

  return (
    <div
      className={cn(
        "messages relative flex h-screen flex-col overflow-hidden lg:flex-row",
      )}
    >
      {!isDesktop ? (
        <>
          {pathname === "/messages" && (
            <header
              className={cn("absolute z-[3] w-full border-b", {
                "border-button bg-nav": mode === 0,
                "border-[#EDEDF0] bg-white": mode === 1,
                "border-candysubtext bg-candynav": mode === 2,
                "border-galaxybutton bg-[rgba(11,3,16,.75)] backdrop-blur-[25px]":
                  mode === 3 && Object.keys(dopple).length,
                "border-galaxybutton bg-galaxynav":
                  mode === 3 && Object.keys(dopple).length === 0,
              })}
            >
              {Object.keys(dopple).length === 0 ? (
                <div
                  className={cn(
                    "flex h-[75px] items-center space-x-[10px] px-5",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-[45px] w-0 flex-1 items-center space-x-[10px] rounded-[5px] px-[10px]",
                      {
                        "bg-button text-subtext focus-within:text-white hover:bg-black5":
                          mode === 0,
                        "bg-[#EDEDF0] text-subtext focus-within:text-title hover:bg-[#DDD]":
                          mode === 1,
                        "bg-candybutton text-candysubtext focus-within:text-candytitle":
                          mode === 2,
                        "bg-galaxybutton text-galaxysubtext focus-within:text-white":
                          mode === 3,
                      },
                    )}
                  >
                    <svg
                      className={cn("min-w-[21px]")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="currentColor"
                    >
                      <path d="M20.1714 18.5942L16.3949 14.8287C17.6134 13.2764 18.2745 11.3595 18.2721 9.38603C18.2721 7.62854 17.7509 5.91052 16.7745 4.44922C15.7981 2.98792 14.4103 1.84897 12.7866 1.17641C11.1629 0.50385 9.37617 0.327877 7.65245 0.670746C5.92873 1.01362 4.34539 1.85993 3.10266 3.10266C1.85993 4.34539 1.01362 5.92873 0.670746 7.65245C0.327877 9.37617 0.50385 11.1629 1.17641 12.7866C1.84897 14.4103 2.98792 15.7981 4.44922 16.7745C5.91052 17.7509 7.62854 18.272 9.38603 18.272C11.3595 18.2745 13.2764 17.6134 14.8287 16.3949L18.5942 20.1714C18.6974 20.2755 18.8203 20.3582 18.9556 20.4146C19.091 20.471 19.2362 20.5 19.3828 20.5C19.5294 20.5 19.6746 20.471 19.81 20.4146C19.9453 20.3582 20.0682 20.2755 20.1714 20.1714C20.2755 20.0682 20.3582 19.9453 20.4146 19.81C20.471 19.6746 20.5 19.5294 20.5 19.3828C20.5 19.2362 20.471 19.091 20.4146 18.9556C20.3582 18.8203 20.2755 18.6974 20.1714 18.5942ZM2.72151 9.38603C2.72151 8.06791 3.11238 6.77939 3.84468 5.68342C4.57699 4.58745 5.61785 3.73324 6.83563 3.22882C8.05341 2.72439 9.39342 2.59241 10.6862 2.84957C11.979 3.10672 13.1665 3.74145 14.0986 4.6735C15.0306 5.60555 15.6653 6.79305 15.9225 8.08584C16.1796 9.37863 16.0477 10.7186 15.5432 11.9364C15.0388 13.1542 14.1846 14.1951 13.0886 14.9274C11.9927 15.6597 10.7041 16.0505 9.38603 16.0505C7.61849 16.0505 5.92334 15.3484 4.6735 14.0986C3.42366 12.8487 2.72151 11.1536 2.72151 9.38603Z" />
                    </svg>
                    <input
                      className={cn(
                        "w-0 flex-1 text-[14px] leading-[17px] caret-blue2 dark:text-black",
                        {
                          "placeholder-subtext": mode === 0 || mode === 1,
                          "placeholder-candysubtext": mode === 2,
                          "placeholder-galaxysubtext": mode === 3,
                        },
                      )}
                      placeholder="Search message..."
                      value={searchTxt}
                      onChange={e => setSearchTxt(e.target.value)}
                      onFocus={() => setIsTypingSearch(true)}
                      onBlur={() => setIsTypingSearch(false)}
                    />
                    {searchTxt?.length > 0 && (
                      <button
                        className={cn({
                          "text-blue2": mode === 0 || mode === 1,
                          "text-candysubtext": mode === 2,
                          "text-[#9277FF]": mode === 3,
                        })}
                        onClick={() => setSearchTxt("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M2 2L17 17M2 17L17 2"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ) : openChatSettings ? (
                <div
                  className={cn(
                    "fixed left-0 top-0 z-[3] h-[75px] w-full border-b",
                    {
                      "border-transparent bg-nav": mode === 0,
                      "border-[#EDEDF0] bg-white": mode === 1,
                      "border-candysubtext bg-candynav": mode === 2,
                      "border-galaxybutton bg-galaxynav": mode === 3,
                    },
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold leading-[21px]",
                      {
                        "text-title": mode === 1,
                        "text-candytitle": mode === 2,
                      },
                    )}
                  >
                    Settings
                  </span>
                  <button
                    className={cn(
                      "absolute left-[22px] top-1/2 flex -translate-y-1/2 items-center space-x-[10px] text-[14px] font-bold leading-[17px]",
                      {
                        "text-blue2": mode === 0 || mode === 1,
                        "text-candybuttonhighlight": mode === 2,
                        "text-galaxybuttonhighlight": mode === 3,
                      },
                    )}
                    onClick={() => setOpenChatSettings(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-[75px] items-center justify-between space-x-5 px-5",
                  )}
                  id="topnav"
                >
                  <div className={cn("flex flex-1 items-center space-x-5")}>
                    <svg
                      className={cn("cursor-pointer", {
                        "text-title": mode === 1,
                        "text-candysubtext": mode === 2,
                      })}
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      stroke="currentColor"
                      onClick={() => setDopple({})}
                    >
                      <path
                        d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      className={cn("flex flex-1 items-center space-x-[10px]")}
                    >
                      <ClickAwayListener
                        onClickAway={() => setOpenAvatarDetailMobile(false)}
                      >
                        <div>
                          <Tooltip
                            content={
                              <Fragment>
                                <div
                                  className={cn(
                                    "dopple-tooltip relative z-[999999] flex w-[343px] flex-col items-center space-y-[15px] rounded-[10px] p-5",
                                    {
                                      "shadow-tooltip-dark bg-nav after:border-t-nav":
                                        mode === 0,
                                      "shadow-tooltip-light bg-white after:border-t-white":
                                        mode === 1,
                                      "shadow-tooltip-candy bg-candynav after:border-t-candynav":
                                        mode === 2,
                                      "shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav":
                                        mode === 3,
                                    },
                                  )}
                                >
                                  <Image
                                    className={cn(
                                      "h-[100px] w-[100px] rounded-[15px]",
                                    )}
                                    height={100}
                                    width={100}
                                    src={dopple?.avatarURL + "?tr=w-400,h-400"}
                                    alt=""
                                  />
                                  <div
                                    className={cn(
                                      "flex flex-col items-center space-y-[5px]",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "flex items-center space-x-[5px]",
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "text-[18px] font-bold leading-[21px]",
                                          {
                                            "text-title": mode === 1,
                                            "text-candytitle": mode === 2,
                                            "text-galaxytitle": mode === 3,
                                          },
                                        )}
                                      >
                                        {dopple?.name}
                                      </span>
                                      <svg
                                        className={cn({
                                          "text-white": mode === 0,
                                          "text-blue2": mode === 1,
                                          "text-[#FF36F7]": mode === 2,
                                          "text-galaxytitle": mode === 3,
                                        })}
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
                                      className={cn(
                                        "flex w-full items-center justify-center space-x-[10px] text-[14px] font-bold leading-[17px]",
                                        {
                                          "text-subtext":
                                            mode === 0 || mode === 1,
                                          "text-candysubtext": mode === 2,
                                          "text-galaxysubtext": mode === 3,
                                        },
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "truncate leading-[120%]",
                                        )}
                                      >
                                        {dopple?.tagLine}
                                      </span>
                                    </div>
                                    <span
                                      className={cn(
                                        "text-[12px] leading-[15px]",
                                        {
                                          "text-subtext":
                                            mode === 0 || mode === 1,
                                          "text-candysubtext": mode === 2,
                                          "text-galaxysubtext": mode === 3,
                                        },
                                      )}
                                    >
                                      {dopple?.bio?.length > 120
                                        ? dopple?.bio?.slice(0, 120) + "..."
                                        : dopple?.bio}
                                    </span>
                                  </div>
                                  <div
                                    className={cn("flex w-full space-x-[10px]")}
                                  >
                                    <button
                                      className={cn(
                                        "flex h-[45px] flex-1 items-center justify-center space-x-[5px] rounded-[5px] text-[14px] font-bold leading-[17px]",
                                        {
                                          "bg-blue2": mode === 0 || mode === 1,
                                          "bg-candysubtext": mode === 2,
                                          "bg-[#7747DC]": mode === 3,
                                        },
                                      )}
                                      onClick={() => openProfile(dopple)}
                                    >
                                      View Profile
                                    </button>
                                    <button
                                      className={cn(
                                        "relative flex-1 overflow-hidden rounded-[5px]",
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "absolute left-0 top-0 h-[5px] w-full",
                                          {
                                            "bg-[rgba(4,141,255,.50)]":
                                              mode === 0,
                                            "bg-[rgba(4,141,255,.50)]":
                                              mode === 1,
                                            "bg-[rgba(221,87,175,.5)]":
                                              mode === 2,
                                            "bg-[rgba(119,71,220,.5)]":
                                              mode === 3,
                                          },
                                        )}
                                      >
                                        <div
                                          className={cn("h-full w-[30%]", {
                                            "bg-blue2":
                                              mode === 0 || mode === 1,
                                            "bg-candysubtext": mode === 2,
                                            "bg-[#7747DC]": mode === 3,
                                          })}
                                        />
                                      </div>
                                      <div
                                        className={cn(
                                          "flex h-[45px] w-full items-center justify-center space-x-[5px] text-[14px] font-bold leading-[17px]",
                                          {
                                            "bg-button text-blue2": mode === 0,
                                            "bg-[#EDEDF0] text-subtextlight":
                                              mode === 1,
                                            "bg-candybutton text-candysubtext":
                                              mode === 2,
                                            "text-galaxytitle bg-galaxybutton":
                                              mode === 3,
                                          },
                                        )}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="15"
                                          viewBox="0 0 16 15"
                                          fill="currentColor"
                                        >
                                          <rect
                                            x="0.75"
                                            width="6"
                                            height="15"
                                          />
                                          <rect
                                            x="9.75"
                                            width="6"
                                            height="15"
                                          />
                                        </svg>
                                        <span>Stop Playing</span>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </Fragment>
                            }
                          >
                            <Image
                              className={cn("h-[45px] w-[45px] rounded-[5px]")}
                              src={dopple.avatarURL + "?tr=w-200,h-200"}
                              height={45}
                              width={45}
                              alt=""
                              onClick={() => setOpenAvatarDetailMobile(true)}
                            />
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                      <div
                        className={cn(
                          "flex w-0 flex-1 flex-col items-start space-y-[5px]",
                        )}
                      >
                        <div
                          className={cn(
                            "flex w-full items-center space-x-[5px] text-[16px] font-bold leading-[19px]",
                          )}
                        >
                          <span
                            className={cn("truncate leading-[120%]", {
                              "text-title": mode === 1,
                              "text-candytitle": mode === 2,
                              "text-galaxytitle": mode === 3,
                            })}
                          >
                            {dopple.name}
                          </span>
                          <svg
                            className={cn("min-w-[15px]", {
                              "text-white": mode === 0,
                              "text-blue2": mode === 1,
                              "text-[#FF36F7]": mode === 2,
                              "text-[#5200FF]": mode === 3,
                            })}
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
                                  className={cn(
                                    "flex flex-col items-start space-y-3",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "flex items-center space-x-[5px] dark:text-title",
                                    )}
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
                                    <span
                                      className={cn(
                                        "font-Inter text-[18px] font-bold leading-[22px]",
                                      )}
                                    >
                                      Encrypted Chat
                                    </span>
                                  </div>
                                  <div
                                    className={cn(
                                      "flex items-start space-x-[10px]",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "font-Inter max-w-[258px] text-[14px] leading-[17px] text-subtext",
                                      )}
                                    >
                                      Dopple chats are secured with AES 256-bit
                                      end-to-end encryption.
                                      <br />
                                      <Link
                                        href="/terms"
                                        className={cn("font-bold text-blue2")}
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
                              className={cn("h-[15px] w-[15px]")}
                              src="/images/explore/lock-green.svg"
                              width={15}
                              height={15}
                              alt=""
                            />
                          </Tooltip>
                        </div>
                        <div
                          className={cn(
                            "flex w-full items-center space-x-[10px] text-[14px] leading-[17px] text-subtext",
                            { "text-candysubtext": mode === 2 },
                          )}
                        >
                          <span className={cn("truncate leading-[120%]")}>
                            {dopple.tagLine}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn("flex items-center space-x-[10px]")}>
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
                    {isSignedIn() ? (
                      <button
                        className={cn(
                          "relative flex h-[45px] items-center justify-center rounded-[5px] px-[10px]",
                          {
                            "bg-button hover:bg-[#34363C]": mode === 0,
                            "bg-[#EDEDF0] hover:bg-[#DCDCE0]": mode === 1,
                            "bg-candybutton hover:bg-[#DD14D5]": mode === 2,
                            "bg-galaxybutton hover:bg-[#5200FF]": mode === 3,
                          },
                        )}
                        onClick={() => setOpenProfileMenu(!openProfileMenu)}
                      >
                        <div
                          className={cn(
                            "h-[25px] w-[25px] overflow-hidden rounded-full border border-subtext",
                          )}
                        >
                          <Image
                            className={cn("h-full w-full object-cover")}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src={
                              profile?.pictures[profile?.picture] ??
                              "/images/blank-profile.svg"
                            }
                            alt=""
                          />
                        </div>
                        <svg
                          className={cn("ml-[5px]", {
                            "text-subtext": mode === 1,
                            "text-candytitle": mode === 2,
                          })}
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
                            className={cn(
                              "absolute right-0 top-[calc(100%+10px)] z-[2] flex w-full min-w-[150px] max-w-[150px] flex-col space-y-[10px] rounded-[5px] border py-[10px] text-[14px] font-semibold leading-[17px] backdrop-blur-[25px]",
                              {
                                "border-button bg-[rgba(21,21,24,0.9)]":
                                  mode === 0,
                                "border-[#EDEDF0] bg-[rgba(255,255,255,0.9)]":
                                  mode === 1,
                                "border-candysubtext bg-candynav": mode === 2,
                                "border-galaxybutton bg-galaxynav": mode === 3,
                              },
                            )}
                          >
                            <Link
                              href="/account"
                              className={cn(
                                "flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px]",
                                {
                                  "bg-button": mode === 0,
                                  "bg-[#EDEDF0] text-title": mode === 1,
                                  "bg-candysubtext": mode === 2,
                                  "bg-galaxybutton": mode === 3,
                                },
                              )}
                            >
                              <span>Settings</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.39719 3.03031L7.89858 0.431429L9.83599 3.03432C10.6132 2.92104 11.3968 2.92382 12.1619 3.03601L14.1006 0.431396L18.6019 3.03027L17.3159 6.01093C17.5532 6.31219 17.7719 6.63411 17.9693 6.976C18.1667 7.31793 18.3362 7.66834 18.4784 8.02456L21.7028 8.40114V13.5989L18.4776 13.9756C18.1923 14.6942 17.8029 15.3741 17.3162 15.9905L18.6015 18.9695L14.1002 21.5684L12.1629 18.9658C11.3858 19.079 10.6024 19.0763 9.83738 18.9641L7.89898 21.5684L3.39759 18.9695L4.68333 15.9896C4.44586 15.6882 4.22707 15.3661 4.02959 15.0241C3.83214 14.6821 3.66265 14.3316 3.52039 13.9754L0.296875 13.5989L0.296875 8.40113L3.52124 8.02456C3.80661 7.30595 4.19597 6.62601 4.68266 6.0096L3.39719 3.03031ZM12.3432 13.327C13.6285 12.585 14.0688 10.9416 13.3268 9.65636C12.5848 8.37115 10.9414 7.93081 9.65617 8.67282C8.37097 9.41483 7.93062 11.0582 8.67264 12.3434C9.41465 13.6286 11.058 14.069 12.3432 13.327Z"
                                />
                              </svg>
                            </Link>
                            <button
                              className={cn(
                                "flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px] text-[#E93131] hover:bg-button",
                              )}
                              onClick={logout}
                            >
                              <span>Sign out</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
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
                            </button>
                          </div>
                        )}
                      </button>
                    ) : (
                      <button
                        className={cn(
                          "flex h-[45px] items-center justify-center rounded-[5px] px-5 text-[14px] font-bold leading-[17px]",
                          {
                            "bg-blue2": mode === 0,
                            "bg-blue2 text-white": mode === 1,
                            "bg-candysubtext": mode === 2,
                            "bg-galaxysubtext": mode === 3,
                          },
                        )}
                        onClick={login}
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              )}
            </header>
          )}
          {!openChatSettings ? (
            <div
              className={cn("relative flex-1 overflow-auto", {
                "bg-[rgba(11,3,16,.75)] backdrop-blur-[25px]": mode === 3,
              })}
              id="message-container"
              ref={msgRef}
            >
              {loadedDopples && filteredDopples.length === 0 && (
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6",
                    {
                      "bg-nav-desktop": mode === 0,
                      "bg-[#EDEDF0] text-title": mode === 1,
                      "bg-candynav text-candytitle": mode === 2,
                      "text-galaxytitle bg-[rgba(11,3,16,.75)]": mode === 3,
                    },
                  )}
                >
                  No chats yet
                </div>
              )}
              {Object.keys(dopple).length === 0 ? (
                <div className={cn("flex w-full flex-col pt-[75px]")}>
                  {loadedDopples
                    ? filteredDopples.map((x, i) => (
                        <button
                          className={cn(
                            "group flex items-center justify-between space-x-2 px-5 py-[15px]",
                            {
                              "hover:bg-button": mode === 0,
                              "hover:bg-[#E7F2FF]": mode === 1,
                              "bg-candybutton hover:bg-candysubtext":
                                mode === 2,
                              "hover:bg-galaxybutton": mode === 3,
                            },
                          )}
                          key={i}
                          onClick={() => {
                            if (x._id !== dopple?._id) setDopple(x);
                          }}
                        >
                          <div
                            className={cn(
                              "flex w-[0px] flex-1 items-center space-x-[10px]",
                            )}
                          >
                            <Image
                              className={cn("h-[50px] w-[50px] rounded-[10px]")}
                              src={x.avatarURL + "?tr=w-50,h-50"}
                              width={50}
                              height={50}
                              alt=""
                            />
                            <div
                              className={cn(
                                "flex w-[0px] flex-1 flex-col items-start space-y-[8.61px]",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex w-full items-center space-x-[5px] text-[16px] font-bold leading-[19px]",
                                  {
                                    "text-title": mode === 1,
                                    "text-candytitle group-hover:text-white":
                                      mode === 2,
                                    "text-galaxytitle": mode === 3,
                                  },
                                )}
                              >
                                <span className={cn("truncate")}>{x.name}</span>
                                <svg
                                  className={cn("min-w-[15px]", {
                                    "text-white": mode === 0,
                                    "text-blue2": mode === 1,
                                    "text-[#FF36F7] group-hover:text-white":
                                      mode === 2 && x?._id !== dopple?._id,
                                    "text-white":
                                      mode === 2 && x?._id === dopple?._id,
                                    "text-[#5200FF]": mode === 3,
                                  })}
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
                                className={cn(
                                  "flex w-full items-center space-x-[5px] text-[14px] leading-[17px]",
                                  {
                                    "text-subtext": mode === 0 || mode === 1,
                                    "text-candysubtext group-hover:text-white":
                                      mode === 2,
                                    "text-galaxysubtext": mode === 3,
                                  },
                                )}
                              >
                                <span
                                  className={cn("flex-1 truncate text-left")}
                                >
                                  {
                                    x.chat_history[x.chat_history.length - 1]
                                      ?.message?.data?.content
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col items-end space-y-[10.55px]",
                            )}
                          >
                            <span
                              className={cn("text-[12px] leading-[14px]", {
                                "text-subtext": mode === 0 || mode === 1,
                                "text-candysubtext group-hover:text-white":
                                  mode === 2,
                                "text-galaxysubtext": mode === 3,
                              })}
                            >
                              {getLastMsgDate(
                                x.chat_history[x.chat_history.length - 1]
                                  ?.timestamp * 1000,
                              )}
                            </span>
                            <div
                              className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full text-[14px] leading-[17px] opacity-0",
                                mode === 0
                                  ? " bg-blue2"
                                  : mode === 1
                                  ? " bg-blue2"
                                  : mode === 2
                                  ? " bg-[#FF36F7] group-hover:bg-white"
                                  : mode === 3
                                  ? " bg-[#5200FF]"
                                  : "",
                              )}
                            >
                              <span
                                className={cn(
                                  mode === 0
                                    ? ""
                                    : mode === 1
                                    ? ""
                                    : mode === 2
                                    ? "group-hover:text-[#FF36F7]"
                                    : mode === 3
                                    ? ""
                                    : "",
                                )}
                              >
                                2
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    : Array(10)
                        .fill("")
                        .map((x, i) => (
                          <div
                            className={cn(
                              "group flex w-full items-center justify-between space-x-2 px-5 py-[15px]",
                            )}
                            key={i}
                          >
                            <div
                              className={cn(
                                "flex w-[0px] flex-1 items-center space-x-[10px]",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-[45px] w-[45px] items-center justify-center rounded-[5px]",
                                  mode === 0
                                    ? " border-[#363941] bg-button"
                                    : mode === 1
                                    ? " border-[#C4C7CB] bg-[#EDEDF0] text-title"
                                    : mode === 2
                                    ? " border-[#FF71CE] bg-candysubtext"
                                    : mode === 3
                                    ? " border-[#453CB9] bg-[#322995]"
                                    : "",
                                )}
                              >
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
                              <div className={cn("flex flex-col space-y-3")}>
                                <div
                                  className={cn(
                                    "flex items-center space-x-[5px]",
                                  )}
                                >
                                  <Skeleton
                                    variant="rounded"
                                    width={74}
                                    height={10}
                                    sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                                  />
                                  <Skeleton
                                    variant="circular"
                                    width={15}
                                    height={15}
                                    sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                                  />
                                </div>
                                <Skeleton
                                  variant="rounded"
                                  width={166}
                                  height={10}
                                  sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                                />
                              </div>
                            </div>
                            <div
                              className={cn(
                                "flex flex-col items-end space-y-[10.55px]",
                              )}
                            >
                              <Skeleton
                                variant="rounded"
                                width={74}
                                height={10}
                                sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                              />
                              <Skeleton
                                variant="circular"
                                width={20}
                                height={20}
                                sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                              />
                            </div>
                          </div>
                        ))}
                </div>
              ) : (
                <>
                  <div className={cn("relative h-full flex-1")}>
                    {mode === 2 && (
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        className={cn("absolute h-full w-full object-cover")}
                        src="/images/messages/backs/candy.webp"
                        alt=""
                      />
                    )}
                    {mode === 3 && (
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        className={cn("absolute h-full w-full object-cover")}
                        src="/images/messages/backs/galaxy.webp"
                        alt=""
                      />
                    )}
                    {history?.length === 0 && dopple && (
                      <div
                        className={cn(
                          "absolute left-1/2 top-1/2 z-[1] w-max -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6",
                          mode === 0
                            ? " bg-nav-desktop"
                            : mode === 1
                            ? " bg-[#EDEDF0] text-title"
                            : mode === 2
                            ? " bg-candynav text-candytitle"
                            : mode === 3
                            ? " text-galaxytitle bg-[rgba(11,3,16,.75)]"
                            : "",
                        )}
                      >
                        No messages here yet
                      </div>
                    )}
                    <div
                      className={cn(
                        "relative z-[1] flex h-full flex-col space-y-[15px] overflow-auto px-5 pb-[75px] pt-[90px]",
                      )}
                    >
                      {Object.keys(dopple).length ? (
                        <>
                          {history &&
                            history.map((x, i) => (
                              <Fragment>
                                {i === 0 && (
                                  <>
                                    <div
                                      className={cn(
                                        "mx-auto w-fit max-w-[80%] rounded-[10px] px-[10px] py-[5px] text-center text-[12px] leading-[14px]",
                                        mode === 0
                                          ? " bg-nav-desktop shadow-lg6"
                                          : mode === 1
                                          ? " bg-[#EDEDF0] text-title"
                                          : mode === 2
                                          ? " bg-candynav text-candytitle shadow-lg6"
                                          : mode === 3
                                          ? " text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6"
                                          : "",
                                      )}
                                    >
                                      Please be aware: Dopples are
                                      community-created AI parodies; all chats,
                                      statements, and claims are fictional and
                                      don't reflect the views or realities of
                                      the actual person or character.
                                    </div>
                                    <div
                                      className={cn(
                                        "mx-auto w-fit rounded-[20px] px-[10px] py-[5px] text-[14px] leading-[17px]",
                                        mode === 0
                                          ? " bg-nav-desktop shadow-lg6"
                                          : mode === 1
                                          ? " bg-[#EDEDF0] text-title"
                                          : mode === 2
                                          ? " bg-candynav text-candytitle shadow-lg6"
                                          : mode === 3
                                          ? " text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6"
                                          : "",
                                      )}
                                    >
                                      {threadDate(
                                        new Date(history[0].timestamp * 1000),
                                      )}
                                    </div>
                                  </>
                                )}
                                {i > 0 &&
                                  (new Date(
                                    history[i].timestamp * 1000,
                                  ).getTime() -
                                    new Date(
                                      history[i - 1].timestamp * 1000,
                                    ).getTime()) /
                                    (1000 * 3600 * 24) >=
                                    1 && (
                                    <div
                                      className={cn(
                                        "mx-auto w-fit rounded-[20px] px-[10px] py-[5px] text-[14px] leading-[17px]",
                                        mode === 0
                                          ? " bg-nav-desktop shadow-lg6"
                                          : mode === 1
                                          ? " bg-[#EDEDF0] text-title"
                                          : mode === 2
                                          ? " bg-candynav text-candytitle shadow-lg6"
                                          : mode === 3
                                          ? " text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6"
                                          : "",
                                      )}
                                    >
                                      {threadDate(
                                        new Date(history[i].timestamp * 1000),
                                      )}
                                    </div>
                                  )}
                                <div
                                  className={cn(
                                    "bubble flex items-end",
                                    alignment === 0 &&
                                      x?.message?.type === "human"
                                      ? " flex-row-reverse"
                                      : "",
                                  )}
                                >
                                  {x?.message?.type === "ai" && (
                                    <>
                                      <Image
                                        className={cn(
                                          "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                                        )}
                                        width={35}
                                        height={35}
                                        src={
                                          dopple.avatarURL + "?tr=w-200,h-200"
                                        }
                                        alt=""
                                      />
                                      {editedIndexes.some(x => x === i) && (
                                        <span
                                          className="italic"
                                          style={{
                                            fontSize: textSize - 2 + "px",
                                            lineHeight: textSize + 1 + "px",
                                          }}
                                        >
                                          edited
                                        </span>
                                      )}
                                      <MessageFromBotMobile
                                        mode={mode}
                                        alignment={alignment}
                                        textSize={textSize}
                                        x={x}
                                        i={i}
                                        editedIndexes={editedIndexes}
                                        setEditIndex={setEditIndex}
                                      />
                                    </>
                                  )}
                                  {x?.message?.type === "human" && (
                                    <>
                                      <Image
                                        className={cn(
                                          "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                                          history[i + 1]?.message?.type ===
                                            history[i]?.message?.type
                                            ? " opacity-0"
                                            : " opacity-1",
                                        )}
                                        width={35}
                                        height={35}
                                        src={
                                          profile?.pictures[profile?.picture] ??
                                          "/images/blank-profile.svg"
                                        }
                                        alt=""
                                      />
                                      <MessageFromYouMobile
                                        mode={mode}
                                        alignment={alignment}
                                        textSize={textSize}
                                        x={x}
                                        i={i}
                                        editedIndexes={editedIndexes}
                                        setEditIndex={setEditIndex}
                                      />
                                    </>
                                  )}
                                </div>
                              </Fragment>
                            ))}
                          {history[history.length - 1]?.message?.type ===
                            "human" && (
                            <div className={cn("bubble flex items-end")}>
                              <Image
                                className={cn(
                                  "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                                )}
                                width={35}
                                height={35}
                                src={dopple.avatarURL + "?tr=w-100,h-100"}
                                alt=""
                              />
                              <div
                                className={cn(
                                  "ml-[10px] rounded-[10px] rounded-bl-[0px] border px-[10px] py-4 text-[16px] leading-[19px]",
                                  mode === 0
                                    ? " border-[#363941] bg-button"
                                    : mode === 1
                                    ? " border-[#C4C7CB] bg-[#EDEDF0] text-title"
                                    : mode === 2
                                    ? " border-[#FF71CE] bg-candysubtext"
                                    : mode === 3
                                    ? " border-[#453CB9] bg-[#322995]"
                                    : "",
                                )}
                              >
                                <Typing mode={mode} />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <MessageLoader mode={mode} alignment={alignment} />
                      )}
                      <div ref={messageContainer} />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "duration-800 absolute bottom-0 left-0 z-[999] w-full transition",
                    )}
                    ref={typeRef}
                  >
                    {editIndex >= 0 && (
                      <div
                        className={cn(
                          "flex h-[60px] items-center space-x-[10px] border-b px-5" +
                            (mode === 0
                              ? " border-button bg-nav-desktop"
                              : mode === 1
                              ? " border-[#EDEDF0] bg-white"
                              : mode === 2
                              ? " border-candysubtext bg-candynav"
                              : mode === 3
                              ? " border-galaxybutton bg-[rgba(11,3,16,.75)] backdrop-blur-[25px]"
                              : ""),
                        )}
                      >
                        <div className={cn("flex w-0 flex-1 items-center")}>
                          <svg
                            className={cn(
                              mode === 0
                                ? " text-blue2"
                                : mode === 1
                                ? " text-blue2"
                                : mode === 2
                                ? " text-[#FF36F7]"
                                : mode === 3
                                ? " text-[#5200FF]"
                                : "",
                            )}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="26"
                            viewBox="0 0 20 26"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.25 23H18.75C19.0815 23 19.3995 23.1317 19.6339 23.3661C19.8683 23.6005 20 23.9185 20 24.25C20 24.5815 19.8683 24.8995 19.6339 25.1339C19.3995 25.3683 19.0815 25.5 18.75 25.5H1.25C0.918479 25.5 0.600537 25.3683 0.366117 25.1339C0.131696 24.8995 0 24.5815 0 24.25C0 23.9185 0.131696 23.6005 0.366117 23.3661C0.600537 23.1317 0.918479 23 1.25 23ZM0 16.75L12.5 4.25L16.25 8L3.75 20.5H0V16.75ZM13.75 3L16.25 0.5L20 4.25L17.4988 6.75125L13.75 3Z"
                            />
                          </svg>
                          <div
                            className={cn(
                              "ml-[15px] h-10 w-[2px]",
                              mode === 0
                                ? " bg-blue2"
                                : mode === 1
                                ? " bg-blue2"
                                : mode === 2
                                ? " bg-[#FF36F7]"
                                : mode === 3
                                ? " bg-[#5200FF]"
                                : "",
                            )}
                          />
                          <div
                            className={cn(
                              "ml-[10px] flex w-0 flex-1 flex-col space-y-[5px]",
                            )}
                          >
                            <span
                              className={cn(
                                "text-[14px] font-bold leading-[17px]" +
                                  (mode === 0
                                    ? " text-blue2"
                                    : mode === 1
                                    ? " text-blue2"
                                    : mode === 2
                                    ? " text-[#FF36F7]"
                                    : mode === 3
                                    ? " text-[#5200FF]"
                                    : ""),
                              )}
                            >
                              Edit Message
                            </span>
                            <span
                              className={cn(
                                "truncate text-[16px] leading-[19px]",
                                mode === 0
                                  ? ""
                                  : mode === 1
                                  ? " text-title"
                                  : mode === 2
                                  ? " text-candytitle"
                                  : mode === 3
                                  ? " text-white"
                                  : "",
                              )}
                            >
                              {history[editIndex]?.message?.data?.content}
                            </span>
                          </div>
                        </div>
                        <button
                          className={cn(
                            "duration-800 flex h-10 w-10 items-center justify-center rounded-[5px] transition",
                            mode === 0
                              ? " bg-button text-blue2 hover:bg-[#34363C]"
                              : mode === 1
                              ? " bg-[#EDEDF0] text-blue2 hover:bg-[#DCDCE0]"
                              : mode === 2
                              ? " bg-candybutton text-candysubtext"
                              : mode === 3
                              ? " bg-galaxybutton text-[#5200FF]"
                              : "",
                          )}
                          onClick={() => setEditIndex(-1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M3 2.5L18 17.5M3 17.5L18 2.5"
                              strokeWidth="3"
                              strokeLinecap="square"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div
                      className={cn(
                        "flex space-x-[10px] px-[30px] py-[10px]",
                        mode === 0
                          ? " bg-nav-desktop"
                          : mode === 1
                          ? " bg-white"
                          : mode === 2
                          ? " bg-candynav"
                          : mode === 3
                          ? " bg-[rgba(11,3,16,.75)] backdrop-blur-[25px]"
                          : "",
                      )}
                    >
                      <input
                        className={cn(
                          "h-10 w-0 flex-1 text-[16px] leading-[19px] caret-blue2",
                          mode === 0
                            ? " text-white placeholder-subtext"
                            : mode === 1
                            ? " text-title placeholder-subtext"
                            : mode === 2
                            ? " text-candytitle placeholder-candysubtext"
                            : mode === 3
                            ? " text-white placeholder-subtext"
                            : "",
                        )}
                        placeholder={
                          "Message " + (dopple.name ? dopple.name : "") + "..."
                        }
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        onKeyDown={e => keyDown(e)}
                        onFocus={() => {
                          setIsTyping(true);
                          setTimeout(() => window.scrollTo(0, -10000), 100);
                        }}
                        onBlur={() => setIsTyping(false)}
                      />
                      {editIndex >= 0 ? (
                        <button
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-[5px] disabled:cursor-not-allowed disabled:bg-subtext",
                            mode === 0
                              ? " bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext"
                              : mode === 1
                              ? " bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext"
                              : mode === 2
                              ? " bg-candysubtext hover:enabled:bg-candybutton disabled:bg-[#D171FF]"
                              : mode === 3
                              ? " bg-[#322995] hover:enabled:bg-galaxybuttonhighlight disabled:bg-galaxysubtext"
                              : "",
                          )}
                          disabled={msg?.length === 0 || editing}
                          onClick={edit}
                          ref={sendRef}
                          onTouchStart={
                            /iPhone|iPad|iPod/.test(
                              window.navigator.userAgent,
                            ) && msg?.length > 0
                              ? edit
                              : null
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="20"
                            viewBox="0 0 23 20"
                            fill="none"
                          >
                            <path
                              d="M1.5 9.66667L8.16667 16.3333L21.5 3"
                              stroke="white"
                              strokeWidth="3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-[5px] disabled:cursor-not-allowed disabled:bg-subtext",
                            mode === 0
                              ? " bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext"
                              : mode === 1
                              ? " bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext"
                              : mode === 2
                              ? " bg-candysubtext hover:enabled:bg-candybutton disabled:bg-[#D171FF]"
                              : mode === 3
                              ? " bg-[#322995] hover:enabled:bg-galaxybuttonhighlight disabled:bg-galaxysubtext"
                              : "",
                          )}
                          disabled={msg?.length === 0 || sending || !loadedMsgs}
                          onClick={send}
                          ref={sendRef}
                          onTouchStart={
                            /iPhone|iPad|iPod/.test(
                              window.navigator.userAgent,
                            ) && msg?.length > 0
                              ? send
                              : null
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                            fill="none"
                          >
                            <path
                              d="M19.6334 11.2445L1.00718 21.0566C0.506231 21.3205 -0.0808646 20.8988 0.00922768 20.3399L0.923452 14.6674C1.03761 13.959 1.53668 13.3732 2.21786 13.1479L9.88014 10.6135L2.27321 8.43817C1.56187 8.23475 1.03035 7.64121 0.906362 6.91181L0.0145865 1.66581C-0.079124 1.11455 0.490114 0.688399 0.99265 0.933604L19.6144 10.0198C20.1197 10.2664 20.1308 10.9825 19.6334 11.2445Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : isLanguageShown ? (
            <>
              <div
                className={cn(
                  "fixed left-0 top-0 z-[3] h-[75px] w-full border-b",
                  mode === 0
                    ? " border-transparent bg-[#17181C]"
                    : mode === 1
                    ? " border-[#EDEDF0] bg-white"
                    : mode === 2
                    ? " border-candysubtext bg-candynav"
                    : mode === 3
                    ? " border-galaxybutton bg-galaxynav"
                    : "",
                )}
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold leading-[21px]",
                    mode === 0
                      ? ""
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-candytitle"
                      : "",
                  )}
                >
                  Language
                </span>
                <button
                  className={cn(
                    "absolute left-[22px] top-1/2 flex -translate-y-1/2 items-center space-x-[10px] text-[14px] font-bold leading-[17px]",
                    mode === 0
                      ? " text-blue2"
                      : mode === 1
                      ? " text-blue2"
                      : mode === 2
                      ? " text-candybuttonhighlight"
                      : mode === 3
                      ? " text-galaxybuttonhighlight"
                      : "",
                  )}
                  onClick={() => setIsLanguageShown(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={cn(
                  "flex h-full max-h-screen flex-col items-center overflow-auto p-5 pt-[105px]",
                  mode === 0
                    ? " bg-[#141518]"
                    : mode === 1
                    ? " bg-white"
                    : mode === 2
                    ? " bg-candynav"
                    : mode === 3
                    ? " bg-galaxynav"
                    : "",
                )}
              >
                <div
                  className={cn("langlist flex w-full flex-col rounded-[5px]")}
                >
                  {languages.map((x, i) => (
                    <button
                      className={cn(
                        "duration-800 flex items-center justify-between space-x-[10px] border-b p-[15px] text-[16px] leading-[19px] transition",
                        mode === 0
                          ? " border-[#31333C] bg-button text-white hover:bg-[#31333C]"
                          : mode === 1
                          ? " border-[#C6CED8] bg-[#EDEDF0] text-title hover:bg-[#C6CED8]"
                          : mode === 2
                          ? " border-candysubtext bg-candybutton text-candytitle hover:bg-candysubtext"
                          : mode === 3
                          ? " text-galaxytitle border-[rgba(156,116,243,.5)] bg-galaxybutton hover:bg-[rgba(156,116,243,.5)]"
                          : "",
                      )}
                      key={i}
                      onClick={() => setLanguageUnsaved(i)}
                    >
                      <div
                        className={cn(
                          "flex w-0 flex-1 items-center space-x-[10px]",
                        )}
                      >
                        <Image src={x.flag} alt="" width={25} height={25} />
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
                              <rect
                                width="30"
                                height="30"
                                rx="15"
                                fill="#048DFF"
                              />
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
                              <rect
                                width="30"
                                height="30"
                                rx="15"
                                fill="white"
                              />
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
                              <rect
                                width="30"
                                height="30"
                                rx="15"
                                fill="#5200FF"
                              />
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
                          className={cn(
                            "h-[30px] w-[30px] rounded-full border",
                            {
                              "border-[#31333C] bg-inputback": mode === 0,
                              "border-[#C4C7CB] bg-white1": mode === 1,
                              "border-candysubtext bg-candynav": mode === 2,
                              "border-[#5200FF] bg-[rgba(11,3,16,.5)]":
                                mode === 3,
                            },
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  className={cn(
                    "mt-[30px] flex min-h-[50px] w-full items-center justify-center rounded-[5px] text-[16px] font-bold leading-[19px] disabled:opacity-50",
                    mode === 0
                      ? " bg-blue2"
                      : mode === 1
                      ? " bg-blue2"
                      : mode === 2
                      ? " bg-candysubtext"
                      : mode === 3
                      ? " bg-galaxysubtext"
                      : "",
                  )}
                  onClick={apply}
                >
                  Apply
                </button>
              </div>
            </>
          ) : (
            <div
              className={cn(
                "flex max-h-screen flex-col overflow-auto p-5 pt-[75px]",
                mode === 0
                  ? " bg-[#141518]"
                  : mode === 1
                  ? " bg-white"
                  : mode === 2
                  ? " bg-candynav"
                  : mode === 3
                  ? " bg-galaxynav"
                  : "",
              )}
            >
              <div
                className={cn(
                  "mb-[15px] flex w-full border-b text-[14px] leading-[17px]",
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
                <div
                  className={cn(
                    "flex h-[60px] flex-1 items-center justify-center space-x-[5px] border-b-2 font-bold",
                    mode === 0
                      ? " border-blue2 text-white"
                      : mode === 1
                      ? " border-blue2 text-title"
                      : mode === 2
                      ? " border-candybuttonhighlight text-candytitle"
                      : mode === 3
                      ? " text-galaxytitle border-[#5200FF]"
                      : "",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="currentColor"
                  >
                    <path d="M16.8118 9.12488L13.8844 12.1558C13.4993 12.5545 13.3067 12.7538 13.0733 12.8916C12.9959 12.9373 12.9155 12.9777 12.8327 13.0126C12.5828 13.1178 12.308 13.1535 11.7583 13.2248L8.46977 13.6516C7.50765 13.7764 7.02659 13.8389 6.70846 13.6152C6.60703 13.5439 6.51974 13.4544 6.45105 13.3512C6.2356 13.0275 6.31025 12.5482 6.45956 11.5895L6.96474 8.3461C7.04661 7.82049 7.08754 7.55769 7.19232 7.31904C7.22706 7.2399 7.26689 7.16311 7.31157 7.08913C7.4463 6.86602 7.63756 6.68118 8.02006 6.31151L11.4339 3.01221H5.86367C4.36378 3.01221 3.61383 3.01221 3.0881 3.39417C2.91831 3.51753 2.769 3.66685 2.64564 3.83664C2.26367 4.36237 2.26367 5.11231 2.26367 6.61221V13.9604C2.26367 15.4603 2.26367 16.2102 2.64564 16.7359C2.769 16.9057 2.91831 17.055 3.0881 17.1784C3.61383 17.5604 4.36378 17.5604 5.86367 17.5604H13.2118C14.7117 17.5604 15.4617 17.5604 15.9874 17.1784C16.1572 17.055 16.3065 16.9057 16.4299 16.7359C16.8118 16.2102 16.8118 15.4603 16.8118 13.9604V9.12488Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.5817 1.04245C15.8501 0.774014 16.2448 0.733445 16.4632 0.951839L19.2373 3.7259C19.4557 3.9443 19.4151 4.33895 19.1466 4.60739L17.1844 6.56963L15.3684 4.75361L13.6195 3.00464L15.5817 1.04245ZM12.6474 3.97674L8.95511 7.66905C8.8475 7.77666 8.77198 7.91028 8.7404 8.04896L7.90708 11.7085C7.86247 11.9045 7.90972 12.0914 8.03478 12.2137C8.15983 12.336 8.34829 12.3796 8.5441 12.3315L12.1515 11.446C12.2862 11.4129 12.4155 11.3386 12.52 11.234L16.2123 7.54174L14.3963 5.7257L12.6474 3.97674Z"
                    />
                  </svg>
                  <span>Chat Preferences</span>
                </div>
                <ClickAwayListener
                  onClickAway={() => setOpenRemixMobile(false)}
                >
                  <div className={cn("h-[60px] flex-1")}>
                    <Tooltip
                      content={
                        <Fragment>
                          <div
                            className={cn(
                              "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5",
                              mode === 0
                                ? " shadow-tooltip-dark bg-nav after:border-t-nav"
                                : mode === 1
                                ? " shadow-tooltip-light bg-white after:border-t-white"
                                : mode === 2
                                ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
                                : mode === 3
                                ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
                                : "",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center space-x-[5px]",
                                mode === 0
                                  ? " text-white"
                                  : mode === 1
                                  ? " text-title"
                                  : mode === 2
                                  ? " text-candytitle"
                                  : mode === 3
                                  ? " text-galaxytitle"
                                  : "",
                              )}
                            >
                              <span
                                className={cn(
                                  "font-Inter text-[14px] font-bold leading-[17px]",
                                )}
                              >
                                Coming Soon for Dopple+ members.
                              </span>
                            </div>
                          </div>
                        </Fragment>
                      }
                    >
                      <div
                        className={cn(
                          "flex h-full items-center justify-center space-x-[5px]",
                          {
                            "text-subtext": mode === 0 || mode === 1,
                            "text-candybuttonhighlight": mode === 2,
                            "text-galaxysubtext": mode === 3,
                          },
                        )}
                        onClick={() => setOpenRemixMobile(true)}
                      >
                        {mode === 0 || mode === 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M3.02734 14.2283L5.99263 14.2283C6.75163 14.2283 7.44523 13.7986 7.78329 13.1191L11.0154 6.62206C11.3534 5.9425 12.047 5.51286 12.806 5.51286L17.6376 5.51286M17.6376 5.51286L15.2094 7.94101M17.6376 5.51286L15.2094 3.08471"
                              stroke="#848D97"
                              strokeWidth="1.5"
                              strokeLinecap="square"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.27039 8.7722L7.11179 6.44325C6.9005 6.01852 6.467 5.75 5.99263 5.75L3.02734 5.75L2.27734 5.75V4.25H3.02734H5.99263C7.03625 4.25 7.98995 4.84075 8.45479 5.77514L9.10807 7.08834L8.27039 8.7722ZM9.94575 12.1399L10.3439 12.9403C10.8087 13.8747 11.7624 14.4654 12.806 14.4654L15.8269 14.4654L14.6791 15.6132L14.1488 16.1436L15.2094 17.2042L15.7397 16.6739L18.1679 14.2457C18.4608 13.9528 18.4608 13.478 18.1679 13.1851L15.7397 10.7569L15.2094 10.2266L14.1487 11.2873L14.6791 11.8176L15.8269 12.9654L12.806 12.9654C12.3317 12.9654 11.8982 12.6969 11.6869 12.2722L10.7834 10.4561L9.94575 12.1399Z"
                              fill="#848D97"
                            />
                          </svg>
                        ) : mode === 2 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.44531 13.4783L7.18489 13.4783L11.3137 5.17881L11.5206 4.76286H11.9852L16.2449 4.76286L15.097 3.61504L14.5667 3.08471L15.6274 2.02405L16.1577 2.55438L18.5859 4.98253L19.1162 5.51286L18.5859 6.04319L16.1577 8.47134L15.6274 9.00167L14.5667 7.94101L15.097 7.41068L16.2449 6.26286L12.4497 6.26286L8.32096 14.5623L8.11404 14.9783H7.64946L3.44531 14.9783H2.69531V13.4783H3.44531ZM2.69531 4.33471H3.44531H7.64946H8.11404L8.32096 4.75066L9.40226 6.92424L8.5771 8.63327L7.18489 5.83471H3.44531H2.69531V4.33471ZM10.5316 12.5621L11.3577 10.8549L12.4497 13.0501H16.2449L15.097 11.9023L14.5667 11.372L15.6274 10.3113L16.1577 10.8416L18.5859 13.2698L19.1162 13.8001L18.5859 14.3305L16.1577 16.7586L15.6274 17.2889L14.5667 16.2283L15.097 15.6979L16.2449 14.5501H11.9851H11.5206L11.3137 14.1342L10.5316 12.5621Z"
                              fill="#DD57AF"
                            />
                          </svg>
                        ) : mode === 3 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.44531 13.4784L7.18489 13.4784L11.3137 5.17893L11.5206 4.76298H11.9852L16.2449 4.76298L15.097 3.61516L14.5667 3.08483L15.6274 2.02417L16.1577 2.5545L18.5859 4.98265L19.1162 5.51298L18.5859 6.04331L16.1577 8.47146L15.6274 9.00179L14.5667 7.94113L15.097 7.4108L16.2449 6.26298L12.4497 6.26298L8.32096 14.5624L8.11404 14.9784H7.64946L3.44531 14.9784H2.69531V13.4784H3.44531ZM2.69531 4.33483H3.44531H7.64946H8.11404L8.32096 4.75078L9.40226 6.92436L8.5771 8.63339L7.18489 5.83483H3.44531H2.69531V4.33483ZM10.5316 12.5622L11.3577 10.855L12.4497 13.0502H16.2449L15.097 11.9024L14.5667 11.3721L15.6274 10.3114L16.1577 10.8418L18.5859 13.2699L19.1162 13.8002L18.5859 14.3306L16.1577 16.7587L15.6274 17.2891L14.5667 16.2284L15.097 15.6981L16.2449 14.5502H11.9851H11.5206L11.3137 14.1343L10.5316 12.5622Z"
                              fill="#9277FF"
                            />
                          </svg>
                        ) : null}
                        <span>Dopple Remix</span>
                      </div>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </div>
              <span
                className={cn("pl-[15px] text-[14px] leading-[17px]", {
                  "text-subtext": mode === 0 || mode === 1,
                  "text-candybuttonhighlight": mode === 2,
                  "text-galaxysubtext": mode === 3,
                })}
              >
                Chat Appearance
              </span>
              <div
                className={cn(
                  "mt-[10px] flex items-center justify-between rounded-[5px] py-5",
                  mode === 0
                    ? " bg-button"
                    : mode === 1
                    ? " bg-[#EDEDF0] text-title"
                    : mode === 2
                    ? " bg-candybutton text-candytitle"
                    : mode === 3
                    ? " bg-galaxybutton text-white"
                    : "",
                )}
              >
                <div />
                <button
                  className={cn(
                    "duration-800 flex flex-col items-center space-y-[5px] text-[16px] leading-[19px] transition",
                    mode === 0 ? " text-blue2" : "",
                  )}
                  onClick={() => setTheme(0)}
                >
                  <div
                    className={cn(
                      "duration-800 rounded-[5px] border transition",
                      mode === 0
                        ? " border-blue2 group-hover:border-blue2"
                        : mode === 1
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 2
                        ? " border-candysubtext group-hover:border-candybuttonhighlight"
                        : mode === 3
                        ? " border-[#8A939D] group-hover:border-[#5200FF]"
                        : "",
                    )}
                  >
                    <Image
                      className="w-[60px]"
                      width={60}
                      height={60}
                      src="/images/account/darktheme.svg"
                      alt=""
                    />
                  </div>
                  <span>Dark</span>
                  {mode === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        width="20"
                        height="20"
                        rx="10"
                        fill="#048DFF"
                      />
                      <path
                        d="M5.5 9.14286L9.1 13L15.5 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
                <button
                  className={cn(
                    "duration-800 flex flex-col items-center space-y-[5px] text-[16px] leading-[19px] transition",
                    mode === 1 ? " text-blue2" : "",
                  )}
                  onClick={() => setTheme(1)}
                >
                  <div
                    className={cn(
                      "duration-800 rounded-[5px] border transition",
                      mode === 0
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 1
                        ? " border-blue2 group-hover:border-blue2"
                        : mode === 2
                        ? " border-candysubtext group-hover:border-candybuttonhighlight"
                        : mode === 3
                        ? " border-[#8A939D] group-hover:border-[#5200FF]"
                        : "",
                    )}
                  >
                    <Image
                      className="w-[60px]"
                      height={60}
                      width={60}
                      src="/images/account/lighttheme.svg"
                      alt=""
                    />
                  </div>
                  <span>Light</span>
                  {mode === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        width="20"
                        height="20"
                        rx="10"
                        fill="#048DFF"
                      />
                      <path
                        d="M5.5 9.14286L9.1 13L15.5 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
                <button
                  className={cn(
                    "duration-800 group flex flex-col items-center space-y-[5px] text-[16px] leading-[19px] transition",
                    mode === 2 ? " text-[#FF36F7]" : "",
                  )}
                  onClick={() => setTheme(2)}
                >
                  <div
                    className={cn(
                      "duration-800 rounded-[5px] border transition",
                      mode === 0
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 1
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 2
                        ? " border-[#FF36F7] group-hover:border-[#FF36F7]"
                        : mode === 3
                        ? " border-[#8A939D] group-hover:border-[#5200FF]"
                        : "",
                    )}
                  >
                    <Image
                      height={60}
                      width={60}
                      className="w-[60px]"
                      src="/images/account/candytheme.svg"
                      alt=""
                    />
                  </div>
                  <span>Candy</span>
                  {mode === 2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        width="20"
                        height="20"
                        rx="10"
                        fill="#FF36F7"
                      />
                      <path
                        d="M5.5 9.14286L9.1 13L15.5 7"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
                <button
                  className={cn(
                    "duration-800 group flex flex-col items-center space-y-[5px] text-[16px] leading-[19px] transition",
                    mode === 3 ? " text-[#5200FF]" : "",
                  )}
                  onClick={() => setTheme(3)}
                >
                  <div
                    className={cn(
                      "duration-800 rounded-[5px] border transition",
                      mode === 0
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 1
                        ? " border-[#8A939D] group-hover:border-blue2"
                        : mode === 2
                        ? " border-candysubtext group-hover:border-candybuttonhighlight"
                        : mode === 3
                        ? " border-[#5200FF] group-hover:border-[#5200FF]"
                        : "",
                    )}
                  >
                    <Image
                      height={60}
                      width={60}
                      className="w-[60px]"
                      src="/images/account/galaxytheme.svg"
                      alt=""
                    />
                  </div>
                  <span>Galaxy</span>
                  {mode === 3 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <rect
                        x="0.125"
                        y="0.25"
                        width="20"
                        height="20"
                        rx="10"
                        fill="#5200FF"
                      />
                      <path
                        d="M5.125 9.39286L8.725 13.25L15.125 7.25"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
                <div />
              </div>
              <span
                className={cn(
                  "mt-[15px] pl-[15px] text-[14px] leading-[17px] text-subtext",
                  {
                    "text-subtext": mode === 0 || mode === 1,
                    "text-candybuttonhighlight": mode === 2,
                    "text-galaxysubtext": mode === 3,
                  },
                )}
              >
                Chat Alignment
              </span>
              <div
                className={cn(
                  "mt-[10px] flex items-center justify-between rounded-[5px] px-[46.5px] py-5",
                  mode === 0
                    ? " bg-button"
                    : mode === 1
                    ? " bg-[#EDEDF0] text-title"
                    : mode === 2
                    ? " bg-candybutton text-candytitle"
                    : mode === 3
                    ? " bg-galaxybutton text-white"
                    : "",
                )}
              >
                <button
                  className={cn(
                    "duration-800 group flex flex-col items-center space-y-2 text-[16px] leading-[19px] transition",
                    alignment === 0
                      ? mode === 0
                        ? " text-blue2"
                        : mode === 1
                        ? " text-blue2"
                        : mode === 2
                        ? " text-[#FF36F7]"
                        : mode === 3
                        ? " text-[#5200FF]"
                        : ""
                      : "",
                  )}
                  onClick={() => setNewAlignment(0)}
                >
                  <div
                    className={cn(
                      "duration-800 overflow-hidden rounded-[5px] border transition",
                      alignment === 0
                        ? mode === 0
                          ? " border-blue2 group-hover:border-blue2"
                          : mode === 1
                          ? " border-blue2 group-hover:border-blue2"
                          : mode === 2
                          ? " border-[#FF36F7] group-hover:border-[#FF36F7]"
                          : mode === 3
                          ? " border-[#5200FF] group-hover:border-[#5200FF]"
                          : ""
                        : mode === 0
                        ? " border-subtext"
                        : mode === 1
                        ? " border-subtext"
                        : mode === 2
                        ? " border-candysubtext"
                        : mode === 3
                        ? " border-galaxybuttonhighlight"
                        : "",
                    )}
                  >
                    {mode === 0 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left and right.svg"
                        alt=""
                      />
                    )}
                    {mode === 1 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left and right-light.svg"
                        alt=""
                      />
                    )}
                    {mode === 2 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left and right-candy.svg"
                        alt=""
                      />
                    )}
                    {mode === 3 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left and right-galaxy.svg"
                        alt=""
                      />
                    )}
                  </div>
                  <span>Left and Right</span>
                  {alignment === 0 ? (
                    mode === 0 || mode === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#048DFF"
                        />
                        <path
                          d="M5.5 9.14286L9.1 13L15.5 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : mode === 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#FF36F7"
                        />
                        <path
                          d="M5.5 9.14286L9.1 13L15.5 7"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : mode === 3 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <rect
                          y="0.25"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#5200FF"
                        />
                        <path
                          d="M5 9.39286L8.6 13.25L15 7.25"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : null
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
                <button
                  className={cn(
                    "duration-800 group flex flex-col items-center space-y-2 text-[16px] leading-[19px] transition",
                    alignment === 1
                      ? mode === 0
                        ? " text-blue2"
                        : mode === 1
                        ? " text-blue2"
                        : mode === 2
                        ? " text-[#FF36F7]"
                        : mode === 3
                        ? " text-[#5200FF]"
                        : ""
                      : "",
                  )}
                  onClick={() => setNewAlignment(1)}
                >
                  <div
                    className={cn(
                      "duration-800 overflow-hidden rounded-[5px] border transition",
                      alignment === 1
                        ? mode === 0
                          ? " border-blue2 group-hover:border-blue2"
                          : mode === 1
                          ? " border-blue2 group-hover:border-blue2"
                          : mode === 2
                          ? " border-[#FF36F7] group-hover:border-[#FF36F7]"
                          : mode === 3
                          ? " border-[#5200FF] group-hover:border-[#5200FF]"
                          : ""
                        : mode === 0
                        ? " border-subtext"
                        : mode === 1
                        ? " border-subtext"
                        : mode === 2
                        ? " border-candysubtext"
                        : mode === 3
                        ? " border-galaxybuttonhighlight"
                        : "",
                    )}
                  >
                    {mode === 0 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left.svg"
                        alt=""
                      />
                    )}
                    {mode === 1 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left-light.svg"
                        alt=""
                      />
                    )}
                    {mode === 2 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left-candy.svg"
                        alt=""
                      />
                    )}
                    {mode === 3 && (
                      <Image
                        width={111}
                        height={75}
                        src="/images/messages/alignments/left-galaxy.svg"
                        alt=""
                      />
                    )}
                  </div>
                  <span>Left Aligned</span>
                  {alignment === 1 ? (
                    mode === 0 || mode === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#048DFF"
                        />
                        <path
                          d="M5.5 9.14286L9.1 13L15.5 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : mode === 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#FF36F7"
                        />
                        <path
                          d="M5.5 9.14286L9.1 13L15.5 7"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : mode === 3 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <rect
                          y="0.25"
                          width="20"
                          height="20"
                          rx="10"
                          fill="#5200FF"
                        />
                        <path
                          d="M5 9.39286L8.6 13.25L15 7.25"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : null
                  ) : (
                    <div
                      className={cn("h-[20px] w-[20px] rounded-full border", {
                        "border-[#31333C] bg-inputback": mode === 0,
                        "border-[#C4C7CB] bg-white1": mode === 1,
                        "border-candysubtext bg-candynav": mode === 2,
                        "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
                      })}
                    />
                  )}
                </button>
              </div>
              <span
                className={cn(
                  "mt-[15px] pl-[15px] text-[14px] leading-[17px] text-subtext",
                  {
                    "text-candybuttonhighlight": mode === 2,
                    "text-galaxysubtext": mode === 3,
                  },
                )}
              >
                Text Size
              </span>
              <div
                className={cn(
                  "mt-[10px] flex items-center space-x-[10px] rounded-[5px] px-[15px] pb-[25px] pt-[30px]",
                  mode === 0
                    ? " bg-button"
                    : mode === 1
                    ? " bg-[#EDEDF0] text-title"
                    : mode === 2
                    ? " bg-candybutton text-candytitle"
                    : mode === 3
                    ? " bg-galaxybutton text-white"
                    : "",
                )}
              >
                <span
                  className={cn(
                    "text-[16px] leading-[19px]",
                    mode === 1 ? " text-title" : "",
                  )}
                >
                  A
                </span>
                <div className={cn("relative flex-1")}>
                  <div className={cn("flex items-center space-x-0.5")}>
                    <div
                      className={cn(
                        "h-1 w-1 rounded-full ",
                        mode === 2
                          ? "bg-candysubtext"
                          : mode === 3
                          ? "bg-[#322995]"
                          : "bg-subtext",
                      )}
                    />
                    <div
                      className={cn(
                        "h-[2px] flex-1 rounded-[5px] ",
                        textSize >= 16
                          ? mode === 0
                            ? "bg-blue2"
                            : mode === 1
                            ? "bg-blue2"
                            : mode === 2
                            ? "bg-[#FF36F7]"
                            : mode === 3
                            ? "bg-[#5200FF]"
                            : ""
                          : mode === 0
                          ? "bg-[#8FCCFF]"
                          : mode === 1
                          ? "bg-[#8FCCFF]"
                          : mode === 2
                          ? "bg-candybuttonhighlight"
                          : mode === 3
                          ? "bg-galaxysubtext"
                          : "",
                      )}
                    />
                    <div
                      className={cn(
                        "h-1 w-1 rounded-full ",
                        mode === 2
                          ? "bg-candysubtext"
                          : mode === 3
                          ? "bg-[#322995]"
                          : "bg-subtext",
                      )}
                    />
                    <div
                      className={cn(
                        "h-[2px] flex-1 rounded-[5px] ",
                        textSize >= 18
                          ? mode === 0
                            ? "bg-blue2"
                            : mode === 1
                            ? "bg-blue2"
                            : mode === 2
                            ? "bg-[#FF36F7]"
                            : mode === 3
                            ? "bg-[#5200FF]"
                            : ""
                          : mode === 0
                          ? "bg-[#8FCCFF]"
                          : mode === 1
                          ? "bg-[#8FCCFF]"
                          : mode === 2
                          ? "bg-candybuttonhighlight"
                          : mode === 3
                          ? "bg-galaxysubtext"
                          : "",
                      )}
                    />
                    <div
                      className={cn(
                        "h-1 w-1 rounded-full ",
                        mode === 2
                          ? "bg-candysubtext"
                          : mode === 3
                          ? "bg-[#322995]"
                          : "bg-subtext",
                      )}
                    />
                    <div
                      className={cn(
                        "h-[2px] flex-1 rounded-[5px] ",
                        textSize >= 20
                          ? mode === 0
                            ? "bg-blue2"
                            : mode === 1
                            ? "bg-blue2"
                            : mode === 2
                            ? "bg-[#FF36F7]"
                            : mode === 3
                            ? "bg-[#5200FF]"
                            : ""
                          : mode === 0
                          ? "bg-[#8FCCFF]"
                          : mode === 1
                          ? "bg-[#8FCCFF]"
                          : mode === 2
                          ? "bg-candybuttonhighlight"
                          : mode === 3
                          ? "bg-galaxysubtext"
                          : "",
                      )}
                    />
                    <div
                      className={cn(
                        "h-1 w-1 rounded-full ",
                        mode === 2
                          ? "bg-candysubtext"
                          : mode === 3
                          ? "bg-[#322995]"
                          : "bg-subtext",
                      )}
                    />
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="20"
                    step="2"
                    className={cn(
                      "absolute left-0 top-1/2 h-[30px] w-full -translate-y-1/2 rounded-full",
                      mode === 0
                        ? " range-dark"
                        : mode === 1
                        ? " range-light"
                        : mode === 2
                        ? " range-candy"
                        : mode === 3
                        ? " range-galaxy"
                        : "",
                    )}
                    value={textSize}
                    onChange={e =>
                      profile && setTextSize(parseInt(e.target.value))
                    }
                    onClick={() => !profile && dispatch(setOpenSignModal())}
                  />
                </div>
                <span
                  className={cn(
                    "text-[24px] leading-[28px]",
                    mode === 1 ? " text-title" : "",
                  )}
                >
                  A
                </span>
              </div>
              <span
                className={cn(
                  "mt-[15px] pl-[15px] text-[14px] leading-[17px] text-subtext",
                  {
                    "text-candybuttonhighlight": mode === 2,
                    "text-galaxysubtext": mode === 3,
                  },
                )}
              >
                Voice Messages
              </span>
              <div
                className={cn(
                  "mt-[10px] flex flex-col space-y-5 rounded-[5px] px-[15px] pb-[30px] pt-5",
                  mode === 0
                    ? " bg-button"
                    : mode === 1
                    ? " bg-[#EDEDF0] text-title"
                    : mode === 2
                    ? " bg-candybutton text-candytitle"
                    : mode === 3
                    ? " bg-galaxybutton text-white"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between text-[16px] leading-[19px]",
                    {
                      "text-subtext": mode === 0,
                      "text-subtextlight": mode === 1,
                      "text-candybuttonhighlight": mode === 2,
                      "text-galaxysubtext": mode === 3,
                    },
                  )}
                >
                  <span
                    className={cn(
                      "duration-800 transition",
                      voiceFrequency === "0"
                        ? mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-candytitle"
                          : mode === 3
                          ? " text-white"
                          : ""
                        : "",
                    )}
                  >
                    Never
                  </span>
                  <span
                    className={cn(
                      "duration-800 transition",
                      voiceFrequency === "1"
                        ? mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-candytitle"
                          : mode === 3
                          ? " text-white"
                          : ""
                        : "",
                    )}
                  >
                    Sometimes
                  </span>
                  <span
                    className={cn(
                      "duration-800 transition",
                      voiceFrequency === "2"
                        ? mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-candytitle"
                          : mode === 3
                          ? " text-white"
                          : ""
                        : "",
                    )}
                  >
                    Always
                  </span>
                </div>
                <div
                  className={cn(
                    "relative h-[2px] w-full",
                    mode === 0
                      ? " bg-subtext"
                      : mode === 1
                      ? " bg-subtext"
                      : mode === 2
                      ? " bg-candysubtext"
                      : mode === 3
                      ? " bg-galaxysubtext"
                      : "",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-0 top-1/2 h-[6px] w-[2px] -translate-y-1/2 rounded-full",
                      mode === 0
                        ? " bg-subtext"
                        : mode === 1
                        ? " bg-subtext"
                        : mode === 2
                        ? " bg-candysubtext"
                        : mode === 3
                        ? " bg-galaxysubtext"
                        : "",
                    )}
                  />
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    className={cn(
                      "absolute left-0 top-1/2 z-[1] h-[30px] w-full -translate-y-1/2 rounded-full",
                      mode === 0
                        ? " range1-dark"
                        : mode === 1
                        ? " range1-light"
                        : mode === 2
                        ? " range1-candy"
                        : mode === 3
                        ? " range1-galaxy"
                        : "",
                    )}
                    value={voiceFrequency}
                    onChange={e => profile && setVoiceFrequency(e.target.value)}
                  />
                  <div
                    className={cn(
                      "absolute right-0 top-1/2 h-[6px] w-[2px] -translate-y-1/2 rounded-full",
                      mode === 0
                        ? " bg-subtext"
                        : mode === 1
                        ? " bg-subtext"
                        : mode === 2
                        ? " bg-candysubtext"
                        : mode === 3
                        ? " bg-galaxysubtext"
                        : "",
                    )}
                  />
                </div>
              </div>
              <span
                className={cn(
                  "mt-[15px] pl-[15px] text-[14px] leading-[17px] text-subtext",
                  {
                    "text-candybuttonhighlight": mode === 2,
                    "text-galaxysubtext": mode === 3,
                  },
                )}
              >
                Chat Preferences
              </span>
              <div
                className={cn(
                  "mt-[10px] flex flex-col space-y-[15px] rounded-[5px] px-[15px] py-5",
                  mode === 0
                    ? " bg-button"
                    : mode === 1
                    ? " bg-[#EDEDF0] text-title"
                    : mode === 2
                    ? " bg-candybutton text-candytitle"
                    : mode === 3
                    ? " bg-galaxybutton text-white"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between space-x-[10px]",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center space-x-[5px] text-[14px] leading-[17px]",
                    )}
                  >
                    <span
                      className={cn(
                        mode === 0
                          ? "text-white"
                          : mode === 1
                          ? "text-title"
                          : mode === 2
                          ? "text-candybuttonhighlight"
                          : mode === 3
                          ? "text-white"
                          : "",
                      )}
                    >
                      #NoFilter Mode
                    </span>
                    <Tooltip
                      content={
                        <Fragment>
                          <div
                            className={cn(
                              "flex flex-col items-start space-y-[10px]",
                            )}
                          >
                            <span
                              className={cn(
                                "font-Inter text-[18px] font-bold leading-[22px]",
                                mode === 1 ? " text-title" : "",
                              )}
                            >
                              Chat Filter
                            </span>
                            <div
                              className={cn("flex items-start space-x-[10px]")}
                            >
                              <span
                                className={cn(
                                  "font-Inter max-w-[273px] text-[14px] leading-[17px] text-subtext",
                                )}
                              >
                                Enable the Chat Filter to automatically filter
                                any explicit or inappropriate content in the
                                AI's responses. Disabling it allows unrestricted
                                interactions, so exercise caution where you use
                                Dopple with the filter turned off.
                              </span>
                            </div>
                          </div>
                        </Fragment>
                      }
                    >
                      <svg
                        className={cn(
                          mode === 0
                            ? "text-blue2"
                            : mode === 1
                            ? "text-blue2"
                            : mode === 2
                            ? "text-[#FF36F7]"
                            : mode === 3
                            ? "text-[#5200FF]"
                            : "",
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.1665 9.15022C9.1665 8.92921 9.2543 8.71725 9.41058 8.56097C9.56686 8.40469 9.77882 8.31689 9.99984 8.31689C10.2209 8.31689 10.4328 8.40469 10.5891 8.56097C10.7454 8.71725 10.8332 8.92921 10.8332 9.15022V14.1502C10.8332 14.3712 10.7454 14.5832 10.5891 14.7395C10.4328 14.8958 10.2209 14.9836 9.99984 14.9836C9.77882 14.9836 9.56686 14.8958 9.41058 14.7395C9.2543 14.5832 9.1665 14.3712 9.1665 14.1502V9.15022ZM9.99984 5.04272C9.77882 5.04272 9.56686 5.13052 9.41058 5.2868C9.2543 5.44308 9.1665 5.65504 9.1665 5.87606C9.1665 6.09707 9.2543 6.30903 9.41058 6.46531C9.56686 6.62159 9.77882 6.70939 9.99984 6.70939C10.2209 6.70939 10.4328 6.62159 10.5891 6.46531C10.7454 6.30903 10.8332 6.09707 10.8332 5.87606C10.8332 5.65504 10.7454 5.44308 10.5891 5.2868C10.4328 5.13052 10.2209 5.04272 9.99984 5.04272Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99984 1.66675C5.39734 1.66675 1.6665 5.39758 1.6665 10.0001C1.6665 14.6026 5.39734 18.3334 9.99984 18.3334C14.6023 18.3334 18.3332 14.6026 18.3332 10.0001C18.3332 5.39758 14.6023 1.66675 9.99984 1.66675ZM3.33317 10.0001C3.33317 11.7682 4.03555 13.4639 5.28579 14.7141C6.53603 15.9644 8.23173 16.6667 9.99984 16.6667C11.7679 16.6667 13.4636 15.9644 14.7139 14.7141C15.9641 13.4639 16.6665 11.7682 16.6665 10.0001C16.6665 8.23197 15.9641 6.53628 14.7139 5.28604C13.4636 4.03579 11.7679 3.33341 9.99984 3.33341C8.23173 3.33341 6.53603 4.03579 5.28579 5.28604C4.03555 6.53628 3.33317 8.23197 3.33317 10.0001Z"
                        />
                      </svg>
                    </Tooltip>
                    <span
                      className={cn("text-[14px] leading-[17px]", {
                        "text-subtext": mode === 0,
                        "text-subtextlight": mode === 1,
                        "text-candybuttonhighlight": mode === 2,
                        "text-galaxysubtext": mode === 3,
                      })}
                    >
                      (Coming Soon)
                    </span>
                  </div>
                  <button
                    className={cn(
                      "duration-800 group relative h-[30px] w-[50px] rounded-[22px] transition",
                      chatFilter
                        ? mode === 0
                          ? " bg-blue2"
                          : mode === 1
                          ? " bg-blue2"
                          : mode === 2
                          ? " bg-candysubtext"
                          : mode === 3
                          ? " bg-galaxybuttonhighlight"
                          : ""
                        : mode === 0
                        ? " bg-inputback"
                        : mode === 1
                        ? " bg-inputback"
                        : mode === 2
                        ? " bg-candynav"
                        : mode === 3
                        ? " bg-inputback"
                        : "",
                    )}
                    onClick={() => setChatFilter(!chatFilter)}
                    disabled
                  >
                    <div
                      className={cn(
                        "duration-800 absolute top-1/2 h-[26px] w-[26px] -translate-y-1/2 rounded-full transition-all",
                        chatFilter
                          ? " left-[22px] bg-white group-hover:bg-subtext"
                          : " left-[2px]" +
                              (mode === 0
                                ? " bg-subtext group-hover:bg-white"
                                : mode === 1
                                ? " bg-subtext group-hover:bg-white"
                                : mode === 2
                                ? " bg-candysubtext"
                                : mode === 3
                                ? " bg-[#7747DC]"
                                : ""),
                      )}
                    />
                  </button>
                </div>
                <div
                  className={cn(
                    "h-[1px] w-full",
                    mode === 0
                      ? " bg-[#31333C]"
                      : mode === 1
                      ? " bg-[#C4C7CB]"
                      : mode === 2
                      ? " bg-candybuttonhighlight"
                      : mode === 3
                      ? " bg-[rgba(156,116,243,.5)]"
                      : "",
                  )}
                />
                <div
                  className={cn(
                    "flex items-center justify-between space-x-[10px]",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center space-x-[5px] text-[14px] leading-[17px]",
                      mode === 0
                        ? " text-white"
                        : mode === 1
                        ? " text-title"
                        : mode === 2
                        ? " text-candybuttonhighlight"
                        : mode === 3
                        ? " text-white"
                        : "",
                    )}
                  >
                    <span>Auto-Delete Chat (24hrs)</span>
                  </div>
                  <button
                    className={cn(
                      "duration-800 group relative h-[30px] w-[50px] rounded-[22px] transition",
                      autoDelete
                        ? mode === 0
                          ? " bg-blue2"
                          : mode === 1
                          ? " bg-blue2"
                          : mode === 2
                          ? " bg-candysubtext"
                          : mode === 3
                          ? " bg-galaxybuttonhighlight"
                          : ""
                        : mode === 0
                        ? " bg-inputback"
                        : mode === 1
                        ? " bg-inputback"
                        : mode === 2
                        ? " bg-candynav"
                        : mode === 3
                        ? " bg-inputback"
                        : "",
                    )}
                    onClick={() => setAutoDelete(!autoDelete)}
                    disabled
                  >
                    <div
                      className={cn(
                        "duration-800 absolute top-1/2 h-[26px] w-[26px] -translate-y-1/2 rounded-full transition-all",
                        autoDelete
                          ? " left-[22px] bg-white group-hover:bg-subtext"
                          : " left-[2px]" +
                              (mode === 0
                                ? " bg-subtext group-hover:bg-white"
                                : mode === 1
                                ? " bg-subtext group-hover:bg-white"
                                : mode === 2
                                ? " bg-candysubtext"
                                : mode === 3
                                ? " bg-[#7747DC]"
                                : ""),
                      )}
                    />
                  </button>
                </div>
              </div>
              <span
                className={cn(
                  "mt-[15px] pl-[15px] text-[14px] leading-[17px] text-subtext",
                  {
                    "text-candybuttonhighlight": mode === 2,
                    "text-galaxysubtext": mode === 3,
                  },
                )}
              >
                Language
              </span>
              <button
                className={cn(
                  "relative mt-[5px] flex min-h-[50px] items-center space-x-[10px] rounded-[5px] px-[15px]",
                  mode === 0
                    ? " bg-button hover:bg-black5"
                    : mode === 1
                    ? " bg-[#EDEDF0] hover:bg-[#DDD]"
                    : mode === 2
                    ? " bg-candybutton text-candytitle hover:bg-candybuttonhighlight"
                    : mode === 3
                    ? " bg-galaxybutton text-white hover:bg-[#322995]"
                    : "",
                )}
                onClick={_setIsLanguageShown}
              >
                <div
                  className={cn("flex w-0 flex-1 items-center space-x-[10px]")}
                >
                  <Image
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px]"
                    src={languages[language].flag}
                    alt=""
                  />
                  <span
                    className={cn(
                      "w-0 flex-1 truncate text-left",
                      mode === 1 ? " text-title" : "",
                    )}
                  >
                    {languages[language].name}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                >
                  <path
                    d="M0.344159 0.830173C0.123794 1.04165 -3.62117e-08 1.32843 -4.92825e-08 1.62745C-6.23532e-08 1.92647 0.123794 2.21326 0.344159 2.42473L6.16269 8.00681L0.344159 13.5889C0.130039 13.8016 0.0115589 14.0864 0.0142368 14.3821C0.0169157 14.6778 0.140537 14.9606 0.358477 15.1697C0.576417 15.3788 0.871237 15.4974 1.17944 15.5C1.48764 15.5025 1.78456 15.3889 2.00626 15.1834L8.65584 8.80409C8.87621 8.59261 9 8.30583 9 8.00681C9 7.70778 8.87621 7.421 8.65584 7.20953L2.00626 0.830173C1.78583 0.618763 1.4869 0.5 1.17521 0.5C0.86352 0.5 0.56459 0.618763 0.344159 0.830173Z"
                    fill="#848D97"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className={cn(
              "flex w-[360px] flex-col border-r",
              mode === 0
                ? " border-button bg-nav"
                : mode === 1
                ? " border-[#EDEDF0] bg-white"
                : mode === 2
                ? " border-candysubtext bg-candynav"
                : mode === 3
                ? " border-galaxybutton bg-[rgba(11,3,16,.75)]"
                : "",
            )}
          >
            <div
              className={cn(
                "flex min-h-[70px] items-center space-x-5 border-b px-5",
                mode === 0
                  ? " border-button bg-nav"
                  : mode === 1
                  ? " border-[#EDEDF0] bg-white"
                  : mode === 2
                  ? " border-candysubtext bg-candynav"
                  : mode === 3
                  ? " border-galaxybutton bg-[rgba(11,3,16,.75)]"
                  : "",
              )}
            >
              <Link href="/">
                <svg
                  className={cn(
                    "cursor-pointer",
                    mode === 0
                      ? ""
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-candysubtext"
                      : mode === 3
                      ? ""
                      : "",
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
              <div
                className={cn(
                  "duration-800 flex h-[45px] w-0 flex-1 items-center space-x-[10px] rounded-[5px] border border-transparent px-[15px] transition focus-within:border-blue2",
                  {
                    "bg-button text-subtext focus-within:text-white hover:bg-black5":
                      mode === 0,
                    "bg-[#EDEDF0] text-subtext focus-within:text-title hover:bg-[#DDD]":
                      mode === 1,
                    "bg-candybutton text-candysubtext focus-within:text-candytitle":
                      mode === 2,
                    "bg-galaxybutton text-galaxysubtext focus-within:text-white":
                      mode === 3,
                  },
                )}
              >
                <svg
                  className="min-w-[15px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 21 21"
                  fill="currentColor"
                >
                  <path d="M20.1714 18.5942L16.3949 14.8287C17.6134 13.2764 18.2745 11.3595 18.2721 9.38603C18.2721 7.62854 17.7509 5.91052 16.7745 4.44922C15.7981 2.98792 14.4103 1.84897 12.7866 1.17641C11.1629 0.50385 9.37617 0.327877 7.65245 0.670746C5.92873 1.01362 4.34539 1.85993 3.10266 3.10266C1.85993 4.34539 1.01362 5.92873 0.670746 7.65245C0.327877 9.37617 0.50385 11.1629 1.17641 12.7866C1.84897 14.4103 2.98792 15.7981 4.44922 16.7745C5.91052 17.7509 7.62854 18.272 9.38603 18.272C11.3595 18.2745 13.2764 17.6134 14.8287 16.3949L18.5942 20.1714C18.6974 20.2755 18.8203 20.3582 18.9556 20.4146C19.091 20.471 19.2362 20.5 19.3828 20.5C19.5294 20.5 19.6746 20.471 19.81 20.4146C19.9453 20.3582 20.0682 20.2755 20.1714 20.1714C20.2755 20.0682 20.3582 19.9453 20.4146 19.81C20.471 19.6746 20.5 19.5294 20.5 19.3828C20.5 19.2362 20.471 19.091 20.4146 18.9556C20.3582 18.8203 20.2755 18.6974 20.1714 18.5942ZM2.72151 9.38603C2.72151 8.06791 3.11238 6.77939 3.84468 5.68342C4.57699 4.58745 5.61785 3.73324 6.83563 3.22882C8.05341 2.72439 9.39342 2.59241 10.6862 2.84957C11.979 3.10672 13.1665 3.74145 14.0986 4.6735C15.0306 5.60555 15.6653 6.79305 15.9225 8.08584C16.1796 9.37863 16.0477 10.7186 15.5432 11.9364C15.0388 13.1542 14.1846 14.1951 13.0886 14.9274C11.9927 15.6597 10.7041 16.0505 9.38603 16.0505C7.61849 16.0505 5.92334 15.3484 4.6735 14.0986C3.42366 12.8487 2.72151 11.1536 2.72151 9.38603Z" />
                </svg>
                <input
                  className={cn(
                    "w-0 flex-1 text-[14px] leading-[17px] caret-blue2",
                    mode === 0
                      ? " placeholder-subtext"
                      : mode === 1
                      ? " text-black placeholder-subtext"
                      : mode === 2
                      ? " text-black placeholder-candysubtext"
                      : mode === 3
                      ? " text-white placeholder-galaxysubtext"
                      : "",
                  )}
                  placeholder="Search Message"
                  value={searchTxt}
                  onChange={e => setSearchTxt(e.target.value)}
                  onFocus={() => setIsTypingSearch(true)}
                  onBlur={() => setIsTypingSearch(false)}
                />
              </div>
            </div>
            <div className={cn("relative flex h-0 flex-1 flex-col")}>
              {loadedDopples && filteredDopples?.length === 0 && (
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6",
                    mode === 0
                      ? " bg-nav-desktop"
                      : mode === 1
                      ? " bg-[#EDEDF0] text-title"
                      : mode === 2
                      ? " bg-candynav text-candytitle"
                      : mode === 3
                      ? " text-galaxytitle bg-[rgba(11,3,16,.75)]"
                      : "",
                  )}
                >
                  {isDesktop ? "No messages here yet" : "No chats yet"}
                </div>
              )}
              <div
                className={cn(
                  "h-full overflow-auto",
                  mode === 0
                    ? " bg-[#141518]"
                    : mode === 1
                    ? " bg-white1"
                    : mode === 2
                    ? " bg-candybutton"
                    : mode === 3
                    ? " bg-galaxynav"
                    : "",
                )}
              >
                {loadedDopples
                  ? filteredDopples.map((x, i) => (
                      <button
                        className={cn(
                          "group box-border flex w-full items-center justify-between space-x-2 px-5 py-[15px]",
                          mode === 0
                            ? x._id === dopple?._id
                              ? " bg-button"
                              : " hover:bg-button"
                            : mode === 1
                            ? x._id === dopple?._id
                              ? " bg-[#E7F2FF]"
                              : " hover:bg-[#E7F2FF]"
                            : mode === 2
                            ? x._id === dopple?._id
                              ? " bg-candysubtext"
                              : " hover:bg-candysubtext"
                            : mode === 3
                            ? x._id === dopple?._id
                              ? " bg-galaxybutton"
                              : " hover:bg-galaxybutton"
                            : "",
                        )}
                        key={i}
                        onClick={() => {
                          if (x._id !== dopple?._id) setDopple(x);
                        }}
                      >
                        <div
                          className={cn(
                            "flex w-[0px] flex-1 items-center space-x-[10px]",
                          )}
                        >
                          <Image
                            width={50}
                            height={50}
                            className={cn("h-[50px] w-[50px] rounded-[10px]")}
                            src={x.avatarURL + "?tr=w-200,h-200"}
                            alt=""
                          />
                          <div
                            className={cn(
                              "flex w-[0px] flex-1 flex-col items-start space-y-[8.61px]",
                            )}
                          >
                            <div
                              className={cn(
                                "flex w-full items-center space-x-[5px] text-[16px] font-bold leading-[19px]",
                                mode === 0
                                  ? ""
                                  : mode === 1
                                  ? " text-title"
                                  : mode === 2
                                  ? x._id === dopple?._id
                                    ? " text-white"
                                    : " text-candytitle group-hover:text-white"
                                  : mode === 3
                                  ? " text-galaxytitle"
                                  : "",
                              )}
                            >
                              <span className="truncate">{x.name}</span>
                              <svg
                                className={cn(
                                  mode === 0
                                    ? " text-white"
                                    : mode === 1
                                    ? " text-blue2"
                                    : mode === 2
                                    ? x._id === dopple?._id
                                      ? " text-white"
                                      : " text-[#FF36F7] group-hover:text-white"
                                    : mode === 3
                                    ? " text-[#5200FF]"
                                    : "",
                                )}
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
                              className={cn(
                                "flex w-full items-center space-x-[5px] text-[14px] leading-[17px]",
                                {
                                  "text-subtext": mode === 0 || mode === 1,
                                  "text-white":
                                    mode === 2 && x?._id === dopple?._id,
                                  "text-candysubtext group-hover:text-white":
                                    mode === 2 && x?._id !== dopple?._id,
                                  "text-galaxysubtext": mode === 3,
                                },
                              )}
                            >
                              <span className={cn("flex-1 truncate text-left")}>
                                {
                                  x.chat_history[x.chat_history.length - 1]
                                    ?.message?.data?.content
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex flex-col items-end space-y-[10.55px]",
                          )}
                        >
                          <span
                            className={cn("text-[12px] leading-[14px]", {
                              "text-subtext": mode === 0 || mode === 1,
                              "text-white":
                                mode === 2 && x?._id === dopple?._id,
                              "text-candysubtext group-hover:text-white":
                                mode === 2 && x?._id !== dopple?._id,
                              "text-galaxysubtext": mode === 3,
                            })}
                          >
                            {getLastMsgDate(
                              x.chat_history[x.chat_history.length - 1]
                                ?.timestamp * 1000,
                            )}
                          </span>
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full text-[14px] leading-[17px] opacity-0",
                              {
                                "text-blue2": mode === 0 || mode === 1,
                                "text-white":
                                  mode === 2 && x?._id === dopple?._id,
                                "bg-[#FF36F7] group-hover:bg-white":
                                  mode === 2 && x?._id !== dopple?._id,
                                "bg-[#5200FF]": mode === 3,
                              },
                            )}
                          >
                            <span
                              className={cn({
                                "text-[#FF36F7]":
                                  mode === 2 && x?._id === dopple?._id,
                                "group-hover:text-[#FF36F7]":
                                  mode === 2 && x?._id !== dopple?._id,
                              })}
                            >
                              2
                            </span>
                          </div>
                        </div>
                      </button>
                    ))
                  : Array(10)
                      .fill("")
                      .map((x, i) => (
                        <div
                          className={cn(
                            "group flex w-full items-center justify-between space-x-2 px-5 py-[15px]",
                          )}
                          key={i}
                        >
                          <div
                            className={cn(
                              "flex w-[0px] flex-1 items-center space-x-[10px]",
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-[45px] w-[45px] items-center justify-center rounded-[5px]",
                                {
                                  "border-[#363941] bg-button": mode === 0,
                                  "border-[#C4C7CB] bg-[#EDEDF0] text-title":
                                    mode === 1,
                                  "border-[#FF71CE] bg-candysubtext":
                                    mode === 2,
                                  "border-[#453CB9] bg-[#322995]": mode === 3,
                                },
                              )}
                            >
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
                            <div className={cn("flex flex-col space-y-3")}>
                              <div
                                className={cn(
                                  "flex items-center space-x-[5px]",
                                )}
                              >
                                <Skeleton
                                  variant="rounded"
                                  width={74}
                                  height={10}
                                  sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                                />
                                <Skeleton
                                  variant="circular"
                                  width={15}
                                  height={15}
                                  sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                                />
                              </div>
                              <Skeleton
                                variant="rounded"
                                width={166}
                                height={10}
                                sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                              />
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col items-end space-y-[10.55px]",
                            )}
                          >
                            <Skeleton
                              variant="rounded"
                              width={74}
                              height={10}
                              sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                            />
                            <Skeleton
                              variant="circular"
                              width={20}
                              height={20}
                              sx={{ bgcolor: "rgb(200,200,200,0.2)" }}
                            />
                          </div>
                        </div>
                      ))}
              </div>
            </div>
            <SidebarFooter />
          </div>
          <div className={cn("flex flex-1 flex-col")}>
            <div
              className={cn(
                "flex min-h-[70px] items-center justify-between space-x-2 border-b px-5",
                {
                  "border-button bg-nav": mode === 0,
                  "border-[#EDEDF0] bg-white": mode === 1,
                  "border-candysubtext bg-candynav": mode === 2,
                  "border-galaxybutton bg-[rgba(11,3,16,.75)]": mode === 3,
                },
              )}
            >
              <div className={cn("flex flex-1 items-center space-x-[10px]")}>
                {Object.keys(dopple).length ? (
                  <Tooltip
                    content={
                      <Fragment>
                        <div
                          className={cn(
                            "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-[15px] rounded-[10px] p-5",
                            {
                              "shadow-tooltip-dark bg-nav after:border-t-nav":
                                mode === 0,
                              "shadow-tooltip-light bg-white after:border-t-white":
                                mode === 1,
                              "shadow-tooltip-candy bg-candynav after:border-t-candynav":
                                mode === 2,
                              "shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav":
                                mode === 3,
                            },
                          )}
                        >
                          <div
                            className={cn("flex items-center space-x-[15px]")}
                          >
                            <Image
                              width={100}
                              height={100}
                              className={cn(
                                "h-[100px] w-[100px] rounded-[15px]",
                              )}
                              src={dopple?.avatarURL + "?tr=w-400,h-400"}
                              alt=""
                            />
                            <div className={cn("flex flex-col space-y-[5px]")}>
                              <div
                                className={cn(
                                  "flex items-center space-x-[5px]",
                                )}
                              >
                                <span
                                  className={cn(
                                    "text-[18px] font-bold leading-[21px]",
                                    {
                                      "text-title": mode === 1,
                                      "text-candytitle": mode === 2,
                                      "text-candytitle": mode === 3,
                                    },
                                  )}
                                >
                                  {dopple?.name}
                                </span>
                                <svg
                                  className={cn({
                                    "text-white": mode === 0,
                                    "text-blue2": mode === 1,
                                    "text-[#FF36F7]": mode === 2,
                                    "text-[#5200FF]": mode === 3,
                                  })}
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
                                className={cn(
                                  "flex w-full items-center space-x-[10px] text-[14px] font-bold leading-[17px]",
                                  {
                                    "text-subtext": mode === 0 || mode === 1,
                                    "text-candysubtext": mode === 2,
                                    "text-galaxysubtext": mode === 3,
                                  },
                                )}
                              >
                                <span className="truncate leading-[120%]">
                                  {dopple?.tagLine}
                                </span>
                              </div>
                              <span
                                className={cn("text-[12px] leading-[15px]", {
                                  "text-subtext": mode === 0 || mode === 1,
                                  "text-candysubtext": mode === 2,
                                  "text-galaxysubtext": mode === 3,
                                })}
                              >
                                {dopple?.bio?.length > 120
                                  ? dopple?.bio?.slice(0, 120) + "..."
                                  : dopple?.bio}
                              </span>
                            </div>
                          </div>
                          <div className={cn("flex w-full space-x-[10px]")}>
                            <button
                              className={cn(
                                "flex h-[45px] flex-1 items-center justify-center space-x-[5px] rounded-[5px] text-[14px] font-bold leading-[17px]",
                                {
                                  "text-blue2": mode === 0 || mode === 1,
                                  "text-candysubtext": mode === 2,
                                  "text-[#7747DC]": mode === 3,
                                },
                              )}
                              onClick={() => openProfile(dopple)}
                            >
                              View Profile
                            </button>
                            <button
                              className={cn(
                                "relative flex-1 overflow-hidden rounded-[5px]",
                              )}
                            >
                              <div
                                className={cn(
                                  "absolute left-0 top-0 h-[5px] w-full",
                                  {
                                    "bg-[rgba(4,141,255,.50)]":
                                      mode === 0 || mode === 1,
                                    "bg-[rgba(221,87,175,.5)]": mode === 2,
                                    "bg-[rgba(119,71,220,.5)]": mode === 3,
                                  },
                                )}
                              >
                                <div
                                  className={cn("h-full w-[30%]", {
                                    "text-blue2": mode === 0 || mode === 1,
                                    "text-candysubtext": mode === 2,
                                    "text-[#7747DC]": mode === 3,
                                  })}
                                />
                              </div>
                              <div
                                className={cn(
                                  "flex h-[45px] w-full items-center justify-center space-x-[5px] text-[14px] font-bold leading-[17px]",
                                  {
                                    "bg-button text-blue2": mode === 0,
                                    "bg-[#EDEDF0] text-subtextlight":
                                      mode === 1,
                                    "bg-candybutton text-candysubtext":
                                      mode === 2,
                                    "text-galaxytitle bg-galaxybutton":
                                      mode === 3,
                                  },
                                )}
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
                    <Image
                      width={45}
                      height={45}
                      className={cn("h-[45px] w-[45px] rounded-[5px]")}
                      src={dopple?.avatarURL + "?tr=w-200,h-200"}
                      alt=""
                    />
                  </Tooltip>
                ) : (
                  <div
                    className={cn(
                      "flex h-[45px] w-[45px] items-center justify-center rounded-[5px]",
                      {
                        "bg-button text-subtext": mode === 0,
                        "bg-[#EDEDF0] text-title": mode === 1,
                        "text-galaxytitle bg-candysubtext": mode === 2,
                        "text-galaxytitle bg-[#322995]": mode === 3,
                      },
                    )}
                  >
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
                <div
                  className={cn(
                    "flex w-0 flex-1 flex-col items-start space-y-[5px]",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-full items-center space-x-[5px] text-[18px] font-bold leading-[22px]",
                    )}
                  >
                    <span
                      className={cn("truncate leading-[120%]", {
                        "text-title": mode === 1,
                        "text-candytitle": mode === 2,
                        "text-galaxytitle": mode === 3,
                      })}
                    >
                      {Object.keys(dopple).length ? (
                        dopple.name
                      ) : (
                        <Skeleton
                          variant="rounded"
                          width={100}
                          height={10}
                          sx={{ bgcolor: "rgba(200,200,200,0.5)" }}
                        />
                      )}
                    </span>
                    <svg
                      className={cn({
                        "text-white": mode === 0,
                        "text-blue2": mode === 1,
                        "text-[#FF36F7]": mode === 2,
                        "text-[#5200FF]": mode === 3,
                      })}
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
                            className={cn(
                              "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5",
                              {
                                "shadow-tooltip-dark bg-nav after:border-t-nav":
                                  mode === 0,
                                "shadow-tooltip-light bg-white after:border-t-white":
                                  mode === 1,
                                "shadow-tooltip-candy bg-candynav after:border-t-candynav":
                                  mode === 2,
                                "shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav":
                                  mode === 3,
                              },
                            )}
                          >
                            <div
                              className={cn("flex items-center space-x-[5px]", {
                                "text-white": mode === 0,
                                "text-title": mode === 1,
                                "text-candytitle": mode === 2,
                                "text-glaxytitle": mode === 3,
                              })}
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
                              <span
                                className={cn(
                                  "font-Inter text-[18px] font-bold leading-[22px]",
                                )}
                              >
                                Encrypted Chat
                              </span>
                            </div>
                            <div
                              className={cn("flex items-start space-x-[10px]")}
                            >
                              <span
                                className={cn(
                                  "font-Inter max-w-[258px] text-[14px] leading-[17px]",
                                  {
                                    "text-subtext": mode === 0 || mode === 1,
                                    "text-candysubtext": mode === 2,
                                    "text-galaxysubtext": mode === 3,
                                  },
                                )}
                              >
                                Dopple chats are secured with AES 256-bit
                                end-to-end encryption.
                                <br />
                                <Link
                                  href="/terms"
                                  className={cn("font-bold", {
                                    "text-blue2": mode === 0 || mode === 1,
                                    "text-[#FF36F7]": mode === 2,
                                    "text-[#5200FF]": mode === 3,
                                  })}
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
                    className={cn(
                      "flex w-full items-center space-x-[10px] text-[14px] leading-[17px]",
                      {
                        "text-subtext": mode === 0 || mode === 1,
                        "text-candysubtext": mode === 2,
                        "text-galaxysubtext": mode === 3,
                      },
                    )}
                  >
                    <span className="truncate leading-[120%]">
                      {Object.keys(dopple).length ? (
                        dopple.tagLine
                      ) : (
                        <Skeleton
                          variant="rounded"
                          width={100}
                          height={10}
                          sx={{ bgcolor: "rgba(200,200,200,0.5)" }}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className={cn("flex items-center space-x-[10px]")}>
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
                {isSignedIn() ? (
                  <button
                    className={cn(
                      "relative flex h-[45px] items-center justify-center rounded-[5px] px-[15px]",
                      {
                        "bg-button text-white hover:bg-[#34363C]": mode === 0,
                        "bg-[#EDEDF0] text-title hover:bg-[#DCDCE0]":
                          mode === 1,
                        "bg-candybutton text-candytitle hover:bg-[#DD14D5]":
                          mode === 2,
                        "bg-galaxybutton text-white hover:bg-[#5200FF]":
                          mode === 3,
                      },
                    )}
                    onClick={() => setOpenProfileMenu(!openProfileMenu)}
                  >
                    <div
                      className={cn(
                        "h-[25px] w-[25px] overflow-hidden rounded-full border border-white",
                      )}
                    >
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
                    </div>
                    <span className="ml-[5px]">{profile.username}</span>
                    <svg
                      className={cn(
                        "ml-[15px] transition",
                        openProfileMenu ? " rotate-[180deg]" : "",
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
                    {openProfileMenu && (
                      <div
                        className={cn(
                          "absolute right-0 top-[calc(100%+5px)] z-[2] flex w-[125px] w-full flex-col space-y-[10px] rounded-[5px] border py-[5px] text-[14px] font-semibold leading-[17px] backdrop-blur-[25px]",
                          {
                            "border-button bg-[rgba(21,21,24,0.9)]": mode === 0,
                            "border-[#EDEDF0] bg-[rgba(255,255,255,0.9)]":
                              mode === 1,
                            "border-candysubtext bg-candynav": mode === 2,
                            "border-galaxybutton bg-galaxynav": mode === 3,
                          },
                        )}
                      >
                        <Link
                          href="/account"
                          className={cn(
                            "flex h-[50px] items-center justify-center space-x-[10px] text-[14px] leading-[17px]",
                            {
                              "bg-button": mode === 0,
                              "bg-[#EDEDF0] text-title": mode === 1,
                              "bg-candysubtext": mode === 2,
                              "bg-galaxybutton": mode === 3,
                            },
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
                  <Modal type="auth" trigger={<HeaderAuthButton />} />
                )}
              </div>
            </div>
            <div className={cn("relative flex h-0 flex-1 flex-col")}>
              {mode === 2 && (
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="absolute h-full w-full object-cover"
                  src="/images/messages/backs/candy.webp"
                  alt=""
                />
              )}
              {mode === 3 && (
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="absolute h-full w-full object-cover"
                  src="/images/messages/backs/galaxy.webp"
                  alt=""
                />
              )}
              {((history?.length === 0 && dopple) ||
                filteredDopples.length === 0 ||
                history.length === 0) && (
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6",
                    {
                      "bg-nav-desktop": mode === 0,
                      "bg-[#EDEDF0] text-title": mode === 1,
                      "bg-candynav text-candytitle": mode === 2,
                      "text-galaxytitle bg-[rgba(11,3,16,.75)]": mode === 3,
                    },
                  )}
                >
                  No messages here yet
                </div>
              )}
              <div className={cn("relative h-0 flex-1 px-5")}>
                <div
                  className={cn(
                    "flex h-full flex-col space-y-[10px] overflow-auto pt-5",
                  )}
                >
                  {Object.keys(dopple).length ? (
                    <>
                      {history &&
                        history.map((x, i) => (
                          <Fragment>
                            {i === 0 && (
                              <>
                                <div
                                  className={cn(
                                    "mx-auto w-fit max-w-[80%] rounded-[10px] px-[10px] py-[5px] text-center text-[12px] leading-[14px]",
                                    {
                                      "bg-nav-desktop shadow-lg6": mode === 0,
                                      "bg-[#EDEDF0] text-title": mode === 1,
                                      "bg-candynav text-candytitle shadow-lg6":
                                        mode === 2,
                                      "text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6":
                                        mode === 3,
                                    },
                                  )}
                                >
                                  Please be aware: Dopples are community-created
                                  AI parodies; all chats, statements, and claims
                                  are fictional and don't reflect the views or
                                  realities of the actual person or character.
                                </div>
                                <div
                                  className={cn(
                                    "mx-auto w-fit rounded-[20px] px-[10px] py-[5px] text-[14px] leading-[17px]",
                                    {
                                      "bg-nav-desktop shadow-lg6": mode === 0,
                                      "bg-[#EDEDF0] text-title": mode === 1,
                                      "bg-candynav text-candytitle shadow-lg6":
                                        mode === 2,
                                      "text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6":
                                        mode === 3,
                                    },
                                  )}
                                >
                                  {threadDate(
                                    new Date(history[0].timestamp * 1000),
                                  )}
                                </div>
                              </>
                            )}
                            {i > 0 &&
                              (new Date(history[i].timestamp * 1000).getTime() -
                                new Date(
                                  history[i - 1].timestamp * 1000,
                                ).getTime()) /
                                (1000 * 3600 * 24) >=
                                1 && (
                                <div
                                  className={cn(
                                    "mx-auto w-fit rounded-[20px] px-[10px] py-[5px] text-[14px] leading-[17px]",
                                    {
                                      "bg-nav-desktop shadow-lg6": mode === 0,
                                      "bg-[#EDEDF0] text-title": mode === 1,
                                      "bg-candynav text-candytitle shadow-lg6":
                                        mode === 2,
                                      "text-galaxytitle bg-[rgba(11,3,16,.75)] shadow-lg6":
                                        mode === 3,
                                    },
                                  )}
                                >
                                  {threadDate(
                                    new Date(history[i].timestamp * 1000),
                                  )}
                                </div>
                              )}
                            <div
                              className={cn(
                                "bubble flex items-end",
                                alignment === 0 &&
                                  x?.message?.type === "human" &&
                                  " flex-row-reverse",
                              )}
                            >
                              {x?.message?.type === "ai" && (
                                <>
                                  <Image
                                    width={35}
                                    height={35}
                                    className={cn(
                                      "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                                    )}
                                    src={dopple.avatarURL + "?tr=w-100,h-100"}
                                    alt=""
                                  />
                                  <div
                                    className={cn(
                                      "msg-para group min-w-[40px] max-w-[65%] rounded-[20px] rounded-bl-[0px] rounded-tl-[15px] border p-[10px] ",

                                      {
                                        "mr-[10px]":
                                          alignment === 0 &&
                                          x?.message?.type === "human",
                                        "ml-[10px]": !(
                                          alignment === 0 &&
                                          x?.message?.type === "human"
                                        ),
                                        "text-center":
                                          x?.message?.data.content?.length <= 7,
                                        "border-[#363941] bg-button":
                                          mode === 0,
                                        "border-[#C4C7CB] bg-[#EDEDF0] text-title":
                                          mode === 1,
                                        "border-[#FF71CE] bg-candysubtext":
                                          mode === 2,
                                        "border-[#453CB9] bg-[#322995]":
                                          mode === 3,
                                      },
                                    )}
                                  >
                                    {x?.message?.data?.url ? (
                                      <AudioPlayer
                                        src={x?.message?.data?.url}
                                        mode={mode}
                                      />
                                    ) : (
                                      <>
                                        <div
                                          className={cn(
                                            "contents items-end space-x-[5px]",
                                          )}
                                        >
                                          <span
                                            style={{
                                              fontSize: textSize + "px",
                                              lineHeight: textSize + 3 + "px",
                                            }}
                                          >
                                            {x?.message?.data.content}
                                          </span>
                                          {editedIndexes.some(x => x === i) && (
                                            <span
                                              className="italic"
                                              style={{
                                                fontSize: textSize - 2 + "px",
                                                lineHeight: textSize + 1 + "px",
                                              }}
                                            >
                                              edited
                                            </span>
                                          )}
                                        </div>
                                        <div
                                          className={cn(
                                            "absolute top-0 hidden group-hover:block",
                                            {
                                              "right-[-65px] pl-[10px]":
                                                alignment === 1,
                                              "left-[-65px] pr-[10px]":
                                                alignment !== 0,
                                            },
                                          )}
                                        >
                                          <div
                                            className={cn(
                                              "flex items-center space-x-[5px]",
                                            )}
                                          >
                                            <CopyButton
                                              txt={x?.message?.data?.content}
                                              mode={mode}
                                            />
                                            <button
                                              className={cn(
                                                "flex h-[25px] w-[25px] items-center justify-center rounded-[5px]",
                                                {
                                                  "bg-button text-subtext":
                                                    mode === 0,
                                                  "bg-[#EDEDF0] text-subtext":
                                                    mode === 1,
                                                  "bg-candynav text-candysubtext":
                                                    mode === 2,
                                                  "bg-galaxybutton text-galaxysubtext":
                                                    mode === 3,
                                                },
                                              )}
                                              onClick={() => setEditIndex(i)}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="currentColor"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M4.30892 17.5229H15.9756C16.1966 17.5229 16.4086 17.6107 16.5648 17.767C16.7211 17.9233 16.8089 18.1352 16.8089 18.3563C16.8089 18.5773 16.7211 18.7892 16.5648 18.9455C16.4086 19.1018 16.1966 19.1896 15.9756 19.1896H4.30892C4.08791 19.1896 3.87594 19.1018 3.71966 18.9455C3.56338 18.7892 3.47559 18.5773 3.47559 18.3563C3.47559 18.1352 3.56338 17.9233 3.71966 17.767C3.87594 17.6107 4.08791 17.5229 4.30892 17.5229ZM3.47559 13.3562L11.8089 5.02274L14.3089 7.52278L5.97559 15.8562H3.47559V13.3562ZM12.6423 4.1894L14.3089 2.52271L16.8089 5.02274L15.1414 6.69026L12.6423 4.1894Z"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                              {x?.message?.type === "human" && (
                                <>
                                  <Image
                                    width={35}
                                    height={35}
                                    className={cn(
                                      "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                                      {
                                        "opacity-0":
                                          history[i + 1]?.message?.type ===
                                          history[i]?.message?.type,
                                        "opacity-1":
                                          history[i + 1]?.message?.type !==
                                          history[i]?.message?.type,
                                      },
                                    )}
                                    src={
                                      profile?.pictures[profile?.picture] ??
                                      "/images/blank-profile.svg"
                                    }
                                    alt=""
                                  />
                                  <div
                                    className={cn(
                                      "msg-para group min-w-[40px] max-w-[65%] rounded-[20px] border p-[10px] ",
                                      {
                                        "mr-[10px] rounded-br-[0px] rounded-tr-[15px]":
                                          alignment === 0,
                                        "ml-[10px] rounded-bl-[0px] rounded-tl-[15px]":
                                          alignment !== 0,
                                        "border-chatbord1 bg-chatback1":
                                          (mode === 0 || mode === 1) &&
                                          i % 4 === 0,
                                        "border-chatbord2 bg-chatback2":
                                          (mode === 0 || mode === 1) &&
                                          i % 4 === 1,
                                        "border-chatbord3 bg-chatback3":
                                          (mode === 0 || mode === 1) &&
                                          i % 4 === 2,
                                        "border-chatbord4 bg-chatback4":
                                          (mode === 0 || mode === 1) &&
                                          i % 4 > 2,
                                        "border-[#D171FF] bg-[#BD32FF]":
                                          mode === 2,
                                        "border-[#9277FF] bg-[#7747DC]":
                                          mode === 3,
                                        "text-center":
                                          x?.message?.data.content?.length <= 7,
                                      },
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "flex items-end space-x-[5px]",
                                      )}
                                    >
                                      <span
                                        style={{
                                          fontSize: textSize + "px",
                                          lineHeight: textSize + 3 + "px",
                                        }}
                                      >
                                        {x?.message?.data.content}
                                      </span>
                                      {editedIndexes.some(x => x === i) && (
                                        <span
                                          className="italic"
                                          style={{
                                            fontSize: textSize - 2 + "px",
                                            lineHeight: textSize + 1 + "px",
                                          }}
                                        >
                                          edited
                                        </span>
                                      )}
                                    </div>
                                    <div
                                      className={cn(
                                        "absolute top-0 hidden group-hover:block",
                                        {
                                          "right-[-65px] pl-[10px]":
                                            alignment === 1,
                                          "left-[-65px] pr-[10px]":
                                            alignment !== 0,
                                        },
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "flex items-center space-x-[5px]",
                                        )}
                                      >
                                        <CopyButton
                                          txt={x?.message?.data?.content}
                                          mode={mode}
                                        />
                                        <button
                                          className={cn(
                                            "flex h-[25px] w-[25px] items-center justify-center rounded-[5px]",
                                            {
                                              "bg-button text-subtext":
                                                mode === 0,
                                              "bg-[#EDEDF0] text-subtext":
                                                mode === 1,
                                              "bg-candynav text-candysubtext":
                                                mode === 2,
                                              "bg-galaxybutton text-galaxysubtext":
                                                mode === 3,
                                            },
                                          )}
                                          onClick={() => setEditIndex(i)}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 21 21"
                                            fill="currentColor"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M4.30892 17.5229H15.9756C16.1966 17.5229 16.4086 17.6107 16.5648 17.767C16.7211 17.9233 16.8089 18.1352 16.8089 18.3563C16.8089 18.5773 16.7211 18.7892 16.5648 18.9455C16.4086 19.1018 16.1966 19.1896 15.9756 19.1896H4.30892C4.08791 19.1896 3.87594 19.1018 3.71966 18.9455C3.56338 18.7892 3.47559 18.5773 3.47559 18.3563C3.47559 18.1352 3.56338 17.9233 3.71966 17.767C3.87594 17.6107 4.08791 17.5229 4.30892 17.5229ZM3.47559 13.3562L11.8089 5.02274L14.3089 7.52278L5.97559 15.8562H3.47559V13.3562ZM12.6423 4.1894L14.3089 2.52271L16.8089 5.02274L15.1414 6.69026L12.6423 4.1894Z"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </Fragment>
                        ))}
                      {history[history.length - 1]?.message?.type ===
                        "human" && (
                        <div className={cn("bubble flex items-end")}>
                          <Image
                            width={35}
                            height={35}
                            className={cn(
                              "max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px] rounded-[5px]",
                            )}
                            src={dopple.avatarURL + "?tr=w-100,h-100"}
                            alt=""
                          />
                          <div
                            className={cn(
                              "ml-[10px] rounded-[10px] rounded-bl-[0px] border px-[10px] py-4 text-[16px] leading-[19px]",
                              {
                                "border-[#363941] bg-button": mode === 0,
                                "border-[#C4C7CB] bg-[#EDEDF0] text-title":
                                  mode === 1,
                                "border-[#FF71CE] bg-candysubtext": mode === 2,
                                "border-[#453CB9] bg-[#322995]": mode === 3,
                              },
                            )}
                          >
                            <Typing mode={mode} />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    filteredDopples.length > 0 &&
                    history.length > 0 && <MessageLoader mode={mode} />
                  )}
                  <div ref={messageContainer} />
                </div>
              </div>
              <div
                className={cn("relative", {
                  "bg-nav-desktop": mode === 0,
                  "bg-white": mode === 1,
                  "bg-candynav": mode === 2,
                  "bg-galaxynav": mode === 3,
                })}
              >
                {editIndex >= 0 && (
                  <div
                    className={cn(
                      "flex h-[70px] items-center space-x-[10px] border-t pl-[30px] pr-5",
                      {
                        "border-button": mode === 0,
                        "border-[#EDEDF0]": mode === 1,
                        "border-candysubtext": mode === 2,
                        "border-galaxybutton": mode === 3,
                      },
                    )}
                  >
                    <div className={cn("flex w-0 flex-1 items-center")}>
                      <svg
                        className={cn({
                          "text-blue2": mode === 0 || mode === 1,
                          "text-[#FF36F7]": mode === 2,
                          "text-[#5200FF]": mode === 3,
                        })}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="26"
                        viewBox="0 0 20 26"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.25 23H18.75C19.0815 23 19.3995 23.1317 19.6339 23.3661C19.8683 23.6005 20 23.9185 20 24.25C20 24.5815 19.8683 24.8995 19.6339 25.1339C19.3995 25.3683 19.0815 25.5 18.75 25.5H1.25C0.918479 25.5 0.600537 25.3683 0.366117 25.1339C0.131696 24.8995 0 24.5815 0 24.25C0 23.9185 0.131696 23.6005 0.366117 23.3661C0.600537 23.1317 0.918479 23 1.25 23ZM0 16.75L12.5 4.25L16.25 8L3.75 20.5H0V16.75ZM13.75 3L16.25 0.5L20 4.25L17.4988 6.75125L13.75 3Z"
                        />
                      </svg>
                      <div
                        className={cn("ml-[15px] h-[45px] w-[2px]", {
                          "text-blue2": mode === 0 || mode === 1,
                          "text-[#FF36F7]": mode === 2,
                          "text-[#5200FF]": mode === 3,
                        })}
                      />
                      <div
                        className={cn(
                          "ml-[10px] flex w-0 flex-1 flex-col space-y-[5px]",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[14px] font-bold leading-[17px]",
                            {
                              "text-blue2": mode === 0 || mode === 1,
                              "text-[#FF36F7]": mode === 2,
                              "text-[#5200FF]": mode === 3,
                            },
                          )}
                        >
                          Edit Message
                        </span>
                        <span
                          className={cn("truncate text-[16px] leading-[19px]", {
                            "text-title": mode === 1,
                            "text-candytitle": mode === 2,
                            "text-white": mode === 3,
                          })}
                        >
                          {history[editIndex]?.message?.data?.content}
                        </span>
                      </div>
                    </div>
                    <button
                      className={cn(
                        "duration-800 flex h-[45px] w-[45px] items-center justify-center rounded-[5px] transition",
                        {
                          "bg-button text-blue2 hover:bg-[#34363C]": mode === 0,
                          "bg-[#EDEDF0] text-blue2 hover:bg-[#DCDCE0]":
                            mode === 1,
                          "bg-candybutton text-candysubtext": mode === 2,
                          "bg-galaxybutton text-[#5200FF]": mode === 3,
                        },
                      )}
                      onClick={() => setEditIndex(-1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 2.5L18 17.5M3 17.5L18 2.5"
                          strokeWidth="3"
                          strokeLinecap="square"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div
                  className={cn(
                    "flex h-[70px] items-center space-x-[10px] border-t pl-[10px] pr-5",
                    {
                      "border-button bg-nav-desktop": mode === 0,
                      "border-[#EDEDF0] bg-white": mode === 1,
                      "border-candysubtext bg-candynav": mode === 2,
                      "border-galaxybutton bg-[rgba(11,3,16,.75)]": mode === 3,
                    },
                  )}
                >
                  <input
                    className={cn(
                      "h-[45px] w-0 flex-1 rounded-[5px] px-5 text-[18px] leading-[21.48px] caret-blue2",
                      {
                        "placeholder-subtext": mode === 0,
                        "text-title placeholder-subtext": mode === 1,
                        "text-candytitle placeholder-[#FF71CE]": mode === 2,
                        "text-galaxytitle placeholder-galaxysubtext":
                          mode === 3,
                      },
                    )}
                    placeholder={
                      "Message " + (dopple.name ? dopple.name : "") + "..."
                    }
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    autoFocus
                    onKeyDown={e => keyDown(e)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                  />
                  {editIndex >= 0 ? (
                    <button
                      className={cn(
                        "flex h-[45px] w-[45px] items-center justify-center rounded-[5px] disabled:cursor-not-allowed",
                        {
                          "bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext":
                            mode === 0 || mode === 1,
                          "bg-candysubtext hover:enabled:bg-candybutton disabled:opacity-50":
                            mode === 2,
                          "bg-[#5200FF] hover:enabled:bg-galaxybuttonhighlight disabled:bg-galaxysubtext":
                            mode === 3,
                        },
                      )}
                      disabled={msg?.length === 0 || editing}
                      onClick={edit}
                      ref={sendRef}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="20"
                        viewBox="0 0 23 20"
                        fill="none"
                      >
                        <path
                          d="M1.5 9.66667L8.16667 16.3333L21.5 3"
                          stroke="white"
                          strokeWidth="3"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className={cn(
                        "flex h-[45px] w-[45px] items-center justify-center rounded-[5px] disabled:cursor-not-allowed",
                        {
                          "bg-blue2 hover:enabled:bg-blue3 disabled:bg-subtext":
                            mode === 0 || mode === 1,
                          "bg-candysubtext hover:enabled:bg-candybutton disabled:opacity-50":
                            mode === 2,
                          "bg-[#5200FF] hover:enabled:bg-galaxybuttonhighlight disabled:bg-galaxysubtext":
                            mode === 3,
                        },
                      )}
                      disabled={
                        msg?.length === 0 || sending || !loadedMsgs || !dopple
                      }
                      onClick={send}
                      ref={sendRef}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="22"
                        viewBox="0 0 21 22"
                        fill="none"
                      >
                        <path
                          d="M20.1334 11.2445L1.50718 21.0566C1.00623 21.3205 0.419135 20.8988 0.509228 20.3399L1.42345 14.6674C1.53761 13.959 2.03668 13.3732 2.71786 13.1479L10.3801 10.6135L2.77321 8.43817C2.06187 8.23475 1.53035 7.64121 1.40636 6.91181L0.514586 1.66581C0.420876 1.11455 0.990114 0.688399 1.49265 0.933604L20.1144 10.0198C20.6197 10.2664 20.6308 10.9825 20.1334 11.2445Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;



