import { Skeleton, useMediaQuery } from "@mui/material";
import { Fragment, useContext, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReferralDopple } from "../redux/reducers/ModalReducer";
import { categories } from "../config";
import axios from "../utilities/axiosConfig";
import DoppleCard from "../components/DoppleCard";
import { RefContext } from "../contexts/RefContextProvider";
import useWindowDimensions from "../hooks/useDimensions";
import { useCookies } from "react-cookie";

const Profile = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isDark = 0;
  const { key } = useParams();
  const [cookies, setCookies] = useCookies(["userid"]);
  const { width: screenWidth } = useWindowDimensions();
  const { setDopple: setDoppleContext, setHistory } = useContext(RefContext);
  const profile = useSelector(store => store.AuthReducer.profile);
  const matches = useMediaQuery("(min-width:768px)");
  const [preview, setPreview] = useState(false);
  const [loadedAvatar, setLoadedAvatar] = useState(false);
  const [loadedBanner, setLoadedBanner] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [dopples, setDopples] = useState([]);
  const [dopple, setDopple] = useState();
  const [openArrow, setOpenArrow] = useState(false);
  const ref = useRef();

  const openProfile = data => {
    document.body.scrollTop = 0;
    setLoadedBanner(false);
    nav("/profile/" + data._id);
  };
  const chat = async (e, data) => {
    e.stopPropagation();
    setDoppleContext();
    nav("/messages");

    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid);
    else userid = cookies?.userid;
    const {
      data: { success, data: _dopples },
    } = await axios.post("/firebase/getDopplesDataByUser", {
      user: profile?.email ?? userid,
    });
    if (success && _dopples.some(x => x._id === data._id)) {
      console.log(_dopples);
      setDoppleContext(_dopples.find(x => x._id === data._id));
    } else {
      let tmp = { ...data };
      tmp.chat_history = [];
      setDoppleContext(tmp);
      setHistory([]);
    }
  };
  const prev = ref => {
    ref.current.scrollTo({
      left: ref.current.scrollLeft - (screenWidth - 40),
      behavior: "smooth",
    });
  };
  const next = ref => {
    ref.current.scrollTo({
      left: ref.current.scrollLeft + (screenWidth - 40),
      behavior: "smooth",
    });
  };
  useMemo(async () => {
    if (key?.length > 0) {
      try {
        const {
          data: { data: _dopple },
        } = await axios.get("/dopple/id/" + key);
        setDopple(_dopple);
        dispatch(setReferralDopple(_dopple));
        const {
          data: { data },
        } = await axios.get("/dopple");
        let tmp = [0, 1, 2, 3, 4];
        if (
          data.some(
            x => x.category === _dopple.category && x._id !== _dopple._id,
          )
        )
          setDopples(
            data.filter(
              x => x.category === _dopple.category && x._id !== _dopple._id,
            ),
          );
        else {
          // 0, 1, 2, 3
          tmp.splice(_dopple.category, 1);
          // tmp[0] = 0
          if (data.some(x => x.category === tmp[0]))
            setDopples(data.filter(x => x.category === tmp[0]));
          else {
            // 1, 2, 3
            tmp.splice(0, 1);
            // tmp[0] = 1
            if (data.some(x => x.category === tmp[0]))
              setDopples(data.filter(x => x.category === tmp[0]));
            else {
              // 2, 3
              tmp.splice(0, 1);
              // tmp[0] = 2
              if (data.some(x => x.category === tmp[0]))
                setDopples(data.filter(x => x.category === tmp[0]));
              else {
                // 3
                tmp.splice(0, 1);
                // tmp[0] = 3
                if (data.some(x => x.category === tmp[0]))
                  setDopples(data.filter(x => x.category === tmp[0]));
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [key, dispatch]);
  return (
    <div className="">
      <div className="flex flex-col md:mt-7 md:flex-row md:px-5 xl:px-[60px]">
        <div
          className={
            "banner-img-container relative h-[250px] md:flex-1 tiny:h-[431.25px] tiny:min-h-[431.25px]" +
            (loadedBanner ? "" : " hidden")
          }
        >
          <img
            className="pointer-events-none h-0 w-0 opacity-0"
            src={dopple?.bannerURL}
            alt=""
          />
          <div className="absolute bottom-5 right-5 flex h-[37px] items-center rounded-[28px] border border-[rgba(0,89,25,.25)] bg-menuback px-2 text-[12px] font-bold leading-[15px]">
            <div className="relative">
              <div className="absolute right-[1px] top-[1.5px] h-[5px] w-[5px] rounded-full bg-[#00FF47] shadow-lg9" />
              <img src="/images/profile/icons/global.svg" alt="" />
            </div>
            <span className="ml-[5px]">
              {dopple?.chattingNow ?? 0} Chatting Now
            </span>
          </div>
          <Fragment key={dopple?._id}>
            <video
              className="h-full w-full object-cover md:rounded-[15px]"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              onLoadedData={() => setLoadedBanner(true)}
            >
              <source src={dopple?.bannerVideoURL} type="video/mp4" />
            </video>
          </Fragment>
        </div>
        <div
          className={
            "flex h-[230px] items-center justify-center bg-black13 md:h-[431.25px] md:flex-1 md:rounded-[15px] md:bg-black5" +
            (!loadedBanner ? " block" : " hidden")
          }
        >
          <img
            className="w-[100px] md:w-[150px]"
            src="/images/explore/topcharts/placeholder.svg"
            alt=""
          />
        </div>
        <div className="z-[1] flex flex-1 flex-col">
          <div className="flex flex-col px-5 md:pl-[30px] md:pr-0">
            <div className="mt-[-50px] flex items-end justify-between md:mt-0 md:items-start">
              <img
                className={
                  "h-[115px] w-[115px] rounded-[15px] md:h-[125px] md:w-[125px]" +
                  (loadedAvatar ? " block" : " hidden")
                }
                src={dopple?.avatarURL + "?tr=w-250,h-250"}
                alt=""
                onLoad={() => setLoadedAvatar(true)}
              />
              {!loadedAvatar && (
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[15px] bg-black5">
                  <img
                    className="w-[45.45px]"
                    src="/images/explore/topcharts/placeholder.svg"
                    alt=""
                  />
                </div>
              )}
            </div>
            <span className="mt-5 flex items-center space-x-[5.71px] md:mt-[15px]">
              {loadedAvatar && loadedBanner ? (
                <>
                  <span className="text-[24px] font-bold leading-[28px]">
                    {dopple?.name}
                  </span>
                  <img
                    className="h-[15px] w-[15px]"
                    src="/images/explore/verified.svg"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                    width={115}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                    width={83}
                    height={10}
                  />
                  <Skeleton
                    variant="circular"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.10)" }}
                    width={17}
                    height={17}
                  />
                </>
              )}
            </span>
            {loadedAvatar && loadedBanner ? (
              <span className="text-[16px] font-bold leading-[19px] text-black4">
                {dopple?.tagLine ?? ""}
              </span>
            ) : (
              <div className="mt-[14.5px] flex items-center space-x-[5px]">
                <Skeleton
                  variant="rounded"
                  sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                  width={49}
                  height={10}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                  width={49}
                  height={10}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                  width={49}
                  height={10}
                />
              </div>
            )}
            {loadedAvatar && loadedBanner ? (
              <span className="mt-[15px] w-full text-[14px] leading-[17px] text-subtext md:max-w-[600px]">
                {readMore
                  ? dopple?.bio
                  : dopple?.bio.slice(0, 200) +
                    (dopple?.bio.length > 200 ? "..." : "")}
                {dopple?.bio.length > 200 && !readMore ? (
                  <span
                    className="ml-1 cursor-pointer font-bold text-blue2"
                    onClick={() => setReadMore(true)}
                  >
                    Read more
                  </span>
                ) : null}
              </span>
            ) : (
              <div className="mt-[22px] flex flex-col space-y-[5px] md:w-[400px] lg:w-[600px]">
                <div className="flex space-x-[5px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 2 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 2 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 2 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 2 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 2 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#2F3239", borderRadius: "10px", flex: 1 }}
                    height={10}
                  />
                </div>
              </div>
            )}
            <div className="mt-[15px] flex flex-col items-center md:flex-row">
              <button
                className="duration-800 flex h-[50px] w-full items-center justify-center space-x-[5.71px] rounded-[4px] bg-blue2 text-[13.7px] font-bold transition hover:bg-blue3 md:w-[150px] md:text-[12px] md:leading-[14px]"
                onClick={e => chat(e, dopple)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.576782 0.5H16.7166V12.5721H6.67889L3.07493 15.5V12.5721H0.576782V0.5ZM11.7419 5.38139H5.55155V4.21352H11.7419V5.38139ZM12.8999 8.05125H4.39355V6.88337H12.8999V8.05125Z"
                  />
                </svg>
                <span>Chat Now</span>
              </button>
              <button
                className="relative mt-[15px] w-full overflow-hidden rounded-[4px] bg-button md:ml-[15px] md:mt-0 md:w-[150px]"
                onClick={() => setPreview(!preview)}
              >
                {preview ? (
                  <>
                    <div
                      className={
                        "absolute left-0 top-0 h-[5px] w-full" +
                        (isDark === 0
                          ? " bg-[rgba(4,141,255,.50)]"
                          : isDark === 1
                          ? " bg-[rgba(4,141,255,.50)]"
                          : isDark === 2
                          ? " bg-[rgba(221,87,175,.5)]"
                          : isDark === 3
                          ? " bg-[rgba(119,71,220,.5)]"
                          : "")
                      }
                    >
                      <div
                        className={
                          "h-full w-[30%]" +
                          (isDark === 0
                            ? " bg-blue2"
                            : isDark === 1
                            ? " bg-blue2"
                            : isDark === 2
                            ? " bg-candysubtext"
                            : isDark === 3
                            ? " bg-[#7747DC]"
                            : "")
                        }
                      />
                    </div>
                    <div className="duration-800 flex items-center justify-center space-x-[5.71px] py-[17.69px] text-[13.7px] font-bold text-blue2 transition md:py-[15.5px] md:text-[12px] md:leading-[14px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="currentColor"
                      >
                        <rect width="6" height="15" />
                        <rect x="9" width="6" height="15" />
                      </svg>
                      <span>Stop Playing</span>
                    </div>
                  </>
                ) : (
                  <div className="duration-800 flex h-[50px] items-center justify-center space-x-[5.71px] text-[13.7px] font-bold text-blue2 transition md:text-[12px] md:leading-[14px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M15.4116 8L0.411621 15.5L0.411622 0.5L15.4116 8Z"
                        fill="white"
                      />
                    </svg>
                    <span>Preview Voice</span>
                  </div>
                )}
              </button>
            </div>
            <div className="mb-[20.73px] mt-[15px] h-[1px] w-full bg-black5" />
            <div className="flex items-center justify-between">
              <div className="h-[30px] w-[1px] bg-transparent" />
              <div className="flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]">
                {loadedAvatar && loadedBanner ? (
                  <>
                    <img src="/images/profile/icons/1.svg" alt="" />
                    <span>Verified Dopple</span>
                  </>
                ) : (
                  <>
                    <Skeleton
                      variant="circular"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.10)" }}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                      width={matches ? 87 : 49}
                      height={8}
                    />
                  </>
                )}
              </div>
              <div className="h-[30px] w-[1px] bg-black5" />
              <div className="flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]">
                {loadedAvatar && loadedBanner ? (
                  <>
                    <img
                      src={categories[dopple?.category].imageOnProfile}
                      alt=""
                    />
                    <span>{categories[dopple?.category].name}</span>
                  </>
                ) : (
                  <>
                    <Skeleton
                      variant="circular"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.10)" }}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                      width={matches ? 87 : 49}
                      height={8}
                    />
                  </>
                )}
              </div>
              <div className="h-[30px] w-[1px] bg-black5" />
              <div className="flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]">
                {loadedAvatar && loadedBanner ? (
                  <>
                    <img src="/images/profile/icons/3.svg" alt="" />
                    <span>{(dopple?.messageCount /1000).toFixed(1) ?? 0}k Messages</span>
                  </>
                ) : (
                  <>
                    <Skeleton
                      variant="circular"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.10)" }}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                      width={matches ? 87 : 49}
                      height={8}
                    />
                  </>
                )}
              </div>
              <div className="h-[30px] w-[1px] bg-black5" />
              <div className="flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]">
                {loadedAvatar && loadedBanner ? (
                  <>
                    <img src="/images/profile/icons/4.svg" alt="" />
                    <span className="max-w-full truncate">
                      By {dopple?.username}
                    </span>
                  </>
                ) : (
                  <>
                    <Skeleton
                      variant="circular"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.10)" }}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ bgcolor: "#2F3239", borderRadius: "10px" }}
                      width={matches ? 87 : 49}
                      height={8}
                    />
                  </>
                )}
              </div>
              <div className="h-[30px] w-[1px] bg-transparent" />
            </div>
            <div className="mb-[15px] mt-4 h-[1px] w-full bg-black5" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 md:mt-[30px] xl:px-[60px]">
        <span className="text-[22px] font-bold leading-[22px]">
          Similar Dopples
        </span>
      </div>
      <div
        className="relative"
        onMouseEnter={() => setOpenArrow(true)}
        onMouseLeave={() => setOpenArrow(false)}
      >
        <button
          className={
            "absolute left-[10px] top-1/2 z-[1] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-button shadow-lg3 transition-all hover:text-blue2 md:flex xl:left-[35px] xl:h-[50px] xl:w-[50px] " +
            (openArrow ? "opacity-100" : "pointer-events-none opacity-0")
          }
          onClick={() => prev(ref)}
          aria-label="Prev"
        >
          <svg
            className="w-2 xl:-ml-1 xl:w-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="24"
            viewBox="0 0 15 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 3L3 12L12 21"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={
            "absolute right-[10px] top-1/2 z-[1] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-button shadow-lg3 transition-all hover:text-blue2 md:flex xl:right-[35px] xl:h-[50px] xl:w-[50px] " +
            (openArrow ? "opacity-100" : "pointer-events-none opacity-0")
          }
          onClick={() => next(ref)}
          aria-label="Next"
        >
          <svg
            className="w-2 xl:-mr-1 xl:w-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="24"
            viewBox="0 0 15 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M3 3L12 12L3 21"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className="scrollbar overflow-auto px-5 pb-[30px] xl:mx-[60px] xl:px-0"
          ref={ref}
        >
          <div className="mt-[15px] flex space-x-[5px]">
            {dopples.map((x, i) => (
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

