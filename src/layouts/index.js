"use client";

import { useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import useWindowDimensions from "../hooks/useDimensions";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import SignModal from "../components/SignModal";
import BioModal from "../components/BioModal";
import ShareModal from "../components/ShareModal";
import ChatModal from "../components/ChatModal";
import MenuModal from "../components/MenuModal";
import WaitlistModal from "../components/WaitlistModal";
import ChatSettingsModal from "../components/ChatSettingsModal";
import UsernameModal from "../components/UsernameModal";
import { RefContext } from "../contexts/RefContextProvider";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setProfile } from "../redux/reducers/AuthReducer";
import axios from "../utilities/axiosConfig";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const location = useLocation();
  const matches = useMediaQuery("(min-width:1024px)");
  const { isDark, isTyping, isTypingSearch, dopple, setAllUsers } =
    useContext(RefContext);
  const profile = useSelector(store => store.AuthReducer.profile);
  const [cookies, setCookies] = useCookies(["profile"]);
  useMemo(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    if (screenWidth > 0 && screenHeight > 0) appHeight();
  }, [screenWidth, screenHeight]);
  useMemo(() => {
    if (isDark === 0) document.body.style.background = "#141518";
    else document.body.style.background = "white";
  }, [isDark]);
  useMemo(() => {
    if (profile && !cookies.profile) {
      setCookies("profile", JSON.stringify(profile));
    }
  }, [profile, cookies.profile]);
  useMemo(async () => {
    console.log("cookies", cookies.profile);
    if (cookies.profile && cookies.profile.id) {
      const data = await axios.get(`/user/${cookies.profile.id}`);

      if (!data.data?.success) {
        return;
      }

      const userData = data.data.data;
      setAllUsers([userData]);
      dispatch(setProfile(userData));
    }
  }, [cookies.profile]);
  // useMemo(async () => {
  //   console.log('state', state);
  //   const { data: { users } } = await axios.get("/user")
  //   setAllUsers(users)
  // }, [])
  return (
    <div
      className={
        "jeans relative flex flex-col overflow-hidden" +
        (isDark === 0
          ? " bg-[#141518]"
          : isDark === 1
          ? " bg-white1"
          : isDark === 2
          ? " bg-candybutton"
          : isDark === 3
          ? !dopple && !matches
            ? " bg-spaceeco bg-cover"
            : " bg-galaxynav"
          : "") +
        (location.pathname === "/messages" ? " h-[100svh]" : " min-h-[100svh]")
      }
      style={{
        height:
          (isTypingSearch || isTyping) &&
          /iPhone|iPad|iPod/.test(window.navigator.userAgent)
            ? window.visualViewport.height + "px"
            : "",
      }}
    >
      {location.pathname !== "/messages" && (
        <Header openSearch={openSearch} setOpenSearch={setOpenSearch} />
      )}
      <main
        className={
          "relative flex-1" + (location.pathname === "/messages" ? " h-0" : "")
        }
      >
        <div className="h-full">{children}</div>
      </main>
      {location.pathname !== "/messages" &&
        location.pathname !== "/community" && (
          <Footer openSearch={openSearch} />
        )}
      {((!isTyping && !dopple) || location.pathname !== "/messages") && (
        <Nav openSearch={openSearch} />
      )}
      {openSearch && (
        <div
          className={`absolute z-[3] block h-full w-full bg-menuback backdrop-blur-[5px] transition-all md1:hidden`}
        />
      )}
      <ChatModal />
      <MenuModal />
      <SignModal />
      <BioModal />
      <WaitlistModal />
      <ShareModal />
      <UsernameModal />
      {matches && <ChatSettingsModal />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
