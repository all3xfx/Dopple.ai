"use client";

import { Fragment, useState } from "react";
import { Skeleton } from "@mui/material";
import { categories } from "../config";
import HtmlTooltip from "../components/HtmlTooltip";

const FeaturedDoppleCard = ({ action, data }) => {
  const [loadedAvatar, setLoadedAvatar] = useState(false);
  const [loadedBanner, setLoadedBanner] = useState(false);

  return (
    <>
      <button
        className={
          "relative flex max-h-[260px] min-h-[260px] min-w-[260px] max-w-[260px] flex-col overflow-hidden rounded-[15px] bg-black5 shadow-lg2 xl:max-h-[calc((100vw-120px-40.2px)/4)] xl:min-h-[calc((100vw-120px-40.2px)/4)] xl:min-w-[calc((100vw-120px-40.2px)/4)] xl:max-w-[calc((100vw-120px-40.2px)/4)]" +
          (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "" : " group")
        }
        onClick={action}
      >
        {data.avatarURL && (
          <img
            className={"pointer-events-none absolute opacity-0"}
            src={data.avatarURL + "?tr=w-30,h-30"}
            alt=""
            onLoad={() => setLoadedAvatar(true)}
          />
        )}
        {data.bannerURL && (
          <img
            className={"pointer-events-none absolute opacity-0"}
            src={data.bannerURL + "?tr=w-500,h-500"}
            alt=""
            onLoad={() => setLoadedBanner(true)}
          />
        )}
        {loadedAvatar && loadedBanner && (
          <>
            {data.bannerURL && (
              <img
                className={
                  "relative h-full w-full object-cover object-top transition duration-[0.8s]" +
                  (/iPhone|iPad|iPod/.test(window.navigator.userAgent)
                    ? ""
                    : " group-hover:scale-[1.05]")
                }
                src={data.bannerURL + "?tr=w-500,h-500"}
                alt=""
              />
            )}
            <div className={"absolute h-full w-full bg-gradient6"}>
              <div className="absolute top-[15px] left-[15px] flex items-center space-x-[5px] rounded-[5px] bg-inputback p-[5px] text-[12px] font-medium leading-[15px] md:text-[14px] md:leading-[17px]">
                <img
                  className="h-[16.67px] w-[16.67px] md:h-auto md:w-auto"
                  src={categories[data.category].image}
                  alt=""
                />
                <span>{categories[data.category].name}</span>
              </div>
              <div className="absolute bottom-[15px] left-[15px] flex w-[calc(100%-30px)] items-center space-x-[10px]">
                <div className="flex w-0 flex-1 items-center space-x-[5px] text-[16px] font-bold leading-[19px]">
                  {data.avatarURL && (
                    <img
                      className={
                        "h-[25px] w-[25px] rounded-full md:h-[30px] md:w-[30px]"
                      }
                      src={data.avatarURL + "?tr=w-30,h-30"}
                      alt=""
                    />
                  )}
                  <span className="truncate">{data.name}</span>
                  <HtmlTooltip
                    title={
                      <Fragment>
                        <div className="flex flex-col items-start space-y-[15px]">
                          <span className="font-Inter text-[18px] font-bold leading-[22px]">
                            Verified Dopple Account
                          </span>
                          <div className="flex items-start space-x-[10px]">
                            <img
                              className="h-[15px] w-[15px] md:h-5 md:w-5"
                              src="/images/explore/verified.svg"
                              alt=""
                            />
                            <span className="font-Inter max-w-[258px] text-[14px] leading-[17px] text-subtext">
                              This account has been verified by the Dopple team.
                              {"\u00a0"}
                              <span className="text-blue2">Learn more.</span>
                            </span>
                          </div>
                        </div>
                      </Fragment>
                    }
                  >
                    <img
                      className="h-[15px] w-[15px] md:h-5 md:w-5"
                      src="/images/explore/verified.svg"
                      alt=""
                    />
                  </HtmlTooltip>
                </div>
                <div className="flex items-center space-x-[5px] text-[16px] font-semibold leading-[19px]">
                  <svg
                    className="h-[15.95px] w-[18px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.71877 3.137C3.33945 3.137 2.96258 3.29559 2.67488 3.59945C2.38524 3.90537 2.21268 4.33259 2.21268 4.78988V12.1478C2.21268 12.6051 2.38524 13.0323 2.67488 13.3383C2.96258 13.6421 3.33945 13.8007 3.71877 13.8007H4.91632C5.52733 13.8007 6.02266 14.296 6.02266 14.907V16.0161L8.99231 13.9928C9.17596 13.8676 9.39303 13.8007 9.61526 13.8007H14.1685C14.5478 13.8007 14.9247 13.6421 15.2124 13.3383C15.502 13.0323 15.6746 12.6051 15.6746 12.1478V4.78988C15.6746 4.33259 15.502 3.90537 15.2124 3.59945C14.9247 3.29559 14.5478 3.137 14.1685 3.137H3.71877ZM1.06812 2.07818C1.76028 1.34713 2.71237 0.924316 3.71877 0.924316H14.1685C15.1749 0.924316 16.127 1.34713 16.8191 2.07818C17.5093 2.80717 17.8873 3.78359 17.8873 4.78988V6.27156H21.5227C22.4651 6.27156 23.3558 6.6675 24.0026 7.35071C24.6475 8.03187 25 8.94341 25 9.88204V16.5598C25 17.4984 24.6475 18.4099 24.0026 19.0911C23.3602 19.7696 22.4774 20.1648 21.5422 20.1702V21.9695C21.5422 22.3796 21.3155 22.756 20.953 22.9476C20.5905 23.1392 20.1518 23.1147 19.813 22.8838L15.8303 20.1702H12.0391C11.0967 20.1702 10.2061 19.7743 9.55921 19.0911C9.00409 18.5048 8.66564 17.7477 8.58216 16.9497L5.53927 19.023C5.20043 19.2538 4.76169 19.2784 4.39921 19.0867C4.03674 18.8951 3.80998 18.5187 3.80998 18.1087V16.0134H3.71877C2.71237 16.0134 1.76028 15.5906 1.06812 14.8595C0.377914 14.1305 0 13.1541 0 12.1478V4.78988C0 3.78359 0.377914 2.80717 1.06812 2.07818ZM10.7745 16.0134H14.1685C15.1749 16.0134 16.127 15.5906 16.8191 14.8595C17.5093 14.1305 17.8873 13.1541 17.8873 12.1478V8.48424H21.5227C21.838 8.48424 22.1535 8.61596 22.3959 8.87199C22.6402 9.13007 22.7873 9.4924 22.7873 9.88204V16.5598C22.7873 16.9494 22.6402 17.3117 22.3959 17.5698C22.1535 17.8258 21.838 17.9576 21.5227 17.9576H20.4359C19.8249 17.9576 19.3296 18.4529 19.3296 19.0639V19.877L16.7943 18.1496C16.6107 18.0245 16.3936 17.9576 16.1714 17.9576H12.0391C11.7238 17.9576 11.4084 17.8258 11.166 17.5698C10.9216 17.3117 10.7745 16.9494 10.7745 16.5598V16.0134Z"
                      fill="white"
                    />
                  </svg>
                  <span>{data?.messageCount ?? 0}k</span>
                </div>
              </div>
            </div>
          </>
        )}
        {(loadedAvatar === false || loadedBanner === false) && (
          <>
            <img
              className={
                "absolute top-1/2 left-1/2 z-[1] w-[100px] -translate-x-1/2 -translate-y-1/2"
              }
              src="/images/explore/topcharts/placeholder.svg"
              alt=""
            />
            <div className={"absolute h-full w-full bg-gradient7"}>
              <div className="absolute bottom-[15px] left-[15px] flex w-[calc(100%-30px)] items-center space-x-[10px]">
                <div className="flex flex-1 items-center space-x-[5px] text-[16px] font-bold leading-[19px]">
                  <Skeleton
                    variant="circular"
                    sx={{ bgcolor: "#43464C" }}
                    width={30}
                    height={30}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "#43464C", borderRadius: "15px" }}
                    width={113.04}
                    height={15}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </button>
    </>
  );
};

export default FeaturedDoppleCard;
