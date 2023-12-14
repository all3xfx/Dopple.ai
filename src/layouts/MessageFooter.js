import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RefContext } from "../contexts/RefContextProvider";
import { Fade } from "@mui/material";

const MessageFooter = () => {
  const nav = useNavigate();
  const { isDark } = useContext(RefContext);
  return (
    <footer
      className={
        "message-footer relative z-[3] flex h-[70px] w-full items-center justify-between border-t px-5" +
        (isDark === 0
          ? " border-button bg-nav-desktop"
          : isDark === 1
          ? " border-[#EDEDF0] bg-white"
          : isDark === 2
          ? " border-candysubtext bg-candynav"
          : isDark === 3
          ? " border-galaxybutton bg-[rgba(11,3,16,.75)]"
          : "")
      }
    >
      <div className="h-[30px]">
        <Fade in={isDark === 0} timeout={300}>
          <img
            className="absolute h-[30px] cursor-pointer"
            src="/images/logo-footer.svg"
            alt=""
            onClick={() => nav("/")}
          />
        </Fade>
        <Fade in={isDark === 1} timeout={300}>
          <img
            className="absolute h-[30px] cursor-pointer"
            src="/images/logo-footer-light.svg"
            alt=""
            onClick={() => nav("/")}
          />
        </Fade>
        <Fade in={isDark === 2} timeout={300}>
          <img
            className="absolute h-[30px] cursor-pointer"
            src="/images/logo-footer-candy.svg"
            alt=""
            onClick={() => nav("/")}
          />
        </Fade>
        <Fade in={isDark === 3} timeout={300}>
          <img
            className="absolute h-[30px] cursor-pointer"
            src="/images/logo-footer-galaxy.svg"
            alt=""
            onClick={() => nav("/")}
          />
        </Fade>
      </div>
      <span
        className={
          "max-w-[142px] text-right text-[12px] leading-[14px]" +
          (isDark === 0
            ? " text-[#8A939D]"
            : isDark === 1
            ? " text-[#8A939D]"
            : isDark === 2
            ? " text-candysubtext"
            : isDark === 3
            ? " text-galaxysubtext"
            : "")
        }
      >
        © 2023 Dopple Labs Inc.
      </span>
    </footer>
  );
};

export default MessageFooter;
