import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setDetails, setOpenSignModal, setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import throttle from 'lodash/throttle'
import axios from "../utilities/axiosConfig";
import { useCookies } from "react-cookie";

const Nav = ({ openSearch }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const openLoginOrSignup = useSelector(store => store.ModalReducer.openSignModal);
  const profile = useSelector(store => store.AuthReducer.profile);
  const { isDark, navCollapsed, setNavCollapsed, setDopple } = useContext(RefContext);
  const [cookies, setCookies] = useCookies(["profile", "userid"])
  const [scrollY, setScrollY] = useState(0)

  const color = (path) => {
    if (location.pathname === path)
      return " font-bold" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-white" : "")
    else
      return (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtextlight" : isDark === 2 ? " text-candysubtext" : isDark === 3 ? " text-galaxysubtext" : "")
  }
  const bgColor = (path) => {
    if (location.pathname === path)
      return (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-blue2" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-[#5200FF]" : "")
    else
      return (isDark === 0 ? " bg-nav" : isDark === 1 ? " bg-white" : isDark === 2 ? " bg-candynav" : isDark === 3 ? " bg-galaxynav" : "")
  }
  const seeChat = async () => {
    nav("/messages")
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid
    const { data: { success, data: _dopples } } = await axios.post("/firebase/getDopplesDataByUser", {
      user: profile?.email ?? userid
    })
    if (success)
      setDopple(_dopples.sort((a, b) => b.chat_history[b.chat_history.length - 1].timestamp - a.chat_history[a.chat_history.length - 1].timestamp)[0])
  }

  const create = () => {
    if (!profile) {
      dispatch(setOpenSignModal());
      dispatch(setDetails({ openLoginOrSignup: false }))
    }
    else {
      nav("/");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > document.body.scrollTop) setNavCollapsed(false)
      else {
        if (document.body.scrollTop > 0) setNavCollapsed(true)
        else setNavCollapsed(false)
      }
      setScrollY(document.body.scrollTop)
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    document.body.addEventListener('scroll', throttledHandleScroll);
    return () => {
      document.body.removeEventListener('scroll', throttledHandleScroll);
    };
  });

  return (
    <nav className={"block md2:hidden w-full transition duration-800 border-t" + (openLoginOrSignup ? "" : " z-[1301]") + (location.pathname === "/messages" ? "" : " fixed bottom-0 left-0") + (location.pathname !== "/messages" && navCollapsed ? " translate-y-[90px]" : " translate-y-0") + (isDark === 0 ? " bg-nav border-button" : isDark === 1 ? " bg-white border-[#EDEDF0]" : isDark === 2 ? " bg-candynav border-candysubtext" : isDark === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
      <div className="flex justify-center items-center space-x-[22px] py-4 text-[12px] leading-[14px]">
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/")} onClick={() => nav("/")}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/")}>
            {location.pathname === "/" ?
              <img src="/images/nav/explore-selected.svg" alt="" />
              :
              <>
                {isDark === 0 && <img src="/images/nav/explore.svg" alt="" />}
                {isDark === 1 && <img src="/images/nav/explore-light.svg" alt="" />}
                {isDark === 2 && <img src="/images/nav/explore-candy.svg" alt="" />}
                {isDark === 3 && <img src="/images/nav/explore-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Explore</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/community")} onClick={() => nav("/community")}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/community")}>
            {location.pathname === "/community" ?
              <img src="/images/nav/community-selected.svg" alt="" />
              :
              <>
                {isDark === 0 && <img src="/images/nav/community.svg" alt="" />}
                {isDark === 1 && <img src="/images/nav/community-light.svg" alt="" />}
                {isDark === 2 && <img src="/images/nav/community-candy.svg" alt="" />}
                {isDark === 3 && <img src="/images/nav/community-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Community</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/create")} onClick={create}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/create")}>
            {location.pathname === "/create" ?
              <img src="/images/nav/create-selected.svg" alt="" />
              :
              <>
                {isDark === 0 && <img src="/images/nav/create.svg" alt="" />}
                {isDark === 1 && <img src="/images/nav/create-light.svg" alt="" />}
                {isDark === 2 && <img src="/images/nav/create-candy.svg" alt="" />}
                {isDark === 3 && <img src="/images/nav/create-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Create</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/messages")} onClick={seeChat}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/messages")}>
            {location.pathname === "/messages" ?
              <img src="/images/nav/messages-selected.svg" alt="" />
              :
              <>
                {isDark === 0 && <img src="/images/nav/messages.svg" alt="" />}
                {isDark === 1 && <img src="/images/nav/messages-light.svg" alt="" />}
                {isDark === 2 && <img src="/images/nav/messages-candy.svg" alt="" />}
                {isDark === 3 && <img src="/images/nav/messages-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Messages</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/account")} onClick={() => profile ? nav("/account") : dispatch(setOpenSignModal())}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/account")}>
            {location.pathname === "/account" ?
              <img src="/images/nav/account-selected.svg" alt="" />
              :
              <>
                {isDark === 0 && <img src="/images/nav/account.svg" alt="" />}
                {isDark === 1 && <img src="/images/nav/account-light.svg" alt="" />}
                {isDark === 2 && <img src="/images/nav/account-candy.svg" alt="" />}
                {isDark === 3 && <img src="/images/nav/account-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Account</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
