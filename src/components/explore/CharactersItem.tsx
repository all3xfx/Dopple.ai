"use client";

import Image from "next/image";
import { categories } from "#/config";
import Link from "next/link";
import { cn } from "#/lib/cn";

interface CharactersCardProps {
  data: DoppleItem;
}

export function CharactersCard({ data }: CharactersCardProps) {
  return (
    <>
      <Link
        href={`/profile/${data._id}`}
        className={cn(
          "dopple-card flex h-fit w-full flex-col overflow-hidden rounded-[10px] bg-black12 shadow-lg5",
        )}
      >
        {data.bannerURL && (
          <Image
            width={400}
            height={300}
            className={cn("lazyload pointer-events-none absolute opacity-0")}
            src={data.bannerURL + "?tr=w-400,h-300"}
            alt=""
          />
        )}
        {data.avatarURL && (
          <Image
            width={25}
            height={25}
            className={cn("lazyload pointer-events-none absolute opacity-0")}
            src={data.avatarURL + "?tr=w-25,h-25"}
            alt=""
          />
        )}

        {data.bannerURL && (
          <Image
            width={400}
            height={300}
            className={cn(
              "lazyload h-[158px] w-full object-cover object-top 2xl:h-[180px]",
            )}
            src={data.bannerURL + "?tr=w-400,h-300"}
            alt=""
          />
        )}
        <div
          className={cn(
            "flex w-full flex-col justify-between px-[15px] py-3 2xl:p-4",
          )}
        >
          <div className={cn("flex items-center justify-between")}>
            <div
              className={cn(
                "flex max-w-full items-center text-[16px] font-bold leading-[19px]",
              )}
            >
              {data.avatarURL && (
                <Image
                  width={25}
                  height={25}
                  className={cn(
                    "lazyload block h-[25px] w-[25px] rounded-full",
                  )}
                  src={data.avatarURL + "?tr=w-25,h-25"}
                  alt=""
                />
              )}
              <span className={cn("ml-[5.71px] truncate")}>{data.name}</span>
              <Image
                width={15}
                height={15}
                className={cn("ml-[5.71px] h-[15px] w-[15px]")}
                src="/images/explore/verified.svg"
                alt=""
              />
            </div>
          </div>
          <div className={cn("mt-[6px] flex justify-between space-x-[10px]")}>
            <div
              className={cn(
                "flex flex-1 flex-col items-start space-y-[5.71px]",
              )}
            >
              <span className={cn("text-[14px] leading-[150%] text-subtext")}>
                Category
              </span>
              <div
                className={cn(
                  "flex h-[21px] items-center space-x-[5px] text-[14px] font-semibold",
                )}
              >
                <img src={categories[data.category].image} alt="" />
                <span>{categories[data.category].name}</span>
              </div>
            </div>
            <div
              className={cn(
                "flex flex-1 flex-col items-start space-y-[5.71px]",
              )}
            >
              <span className={cn("text-[14px] leading-[150%] text-subtext")}>
                Total Messages
              </span>
              <div
                className={cn(
                  "flex h-[21px] items-center space-x-[5px] text-[14px] font-semibold",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50417 1.82531C3.23107 1.82531 2.95972 1.93949 2.75258 2.15828C2.54403 2.37854 2.41979 2.68613 2.41979 3.01539V8.3131C2.41979 8.64235 2.54403 8.94995 2.75258 9.17021C2.95972 9.38899 3.23106 9.50318 3.50417 9.50318H4.36641C4.80634 9.50318 5.16297 9.85981 5.16297 10.2997V11.0983L7.30112 9.64146C7.43335 9.55136 7.58964 9.50318 7.74965 9.50318H11.028C11.3011 9.50318 11.5724 9.38899 11.7796 9.17021C11.9881 8.94995 12.1124 8.64235 12.1124 8.3131V3.01539C12.1124 2.68613 11.9881 2.37854 11.7796 2.15828C11.5724 1.93949 11.3011 1.82531 11.028 1.82531H3.50417ZM1.59571 1.06296C2.09406 0.536604 2.77956 0.232178 3.50417 0.232178H11.028C11.7526 0.232178 12.4381 0.536604 12.9364 1.06296C13.4334 1.58783 13.7055 2.29086 13.7055 3.01539V4.08219H16.323C17.0015 4.08219 17.6428 4.36727 18.1085 4.85918C18.5729 5.34961 18.8267 6.00592 18.8267 6.68174V11.4897C18.8267 12.1655 18.5729 12.8218 18.1085 13.3123C17.646 13.8008 17.0104 14.0853 16.3371 14.0892V15.3847C16.3371 15.68 16.1738 15.951 15.9128 16.0889C15.6518 16.2269 15.336 16.2093 15.092 16.043L12.2245 14.0892H9.4948C8.81631 14.0892 8.17503 13.8042 7.70929 13.3123C7.3096 12.8901 7.06592 12.345 7.00582 11.7704L4.81493 13.2632C4.57097 13.4294 4.25507 13.4471 3.99409 13.3091C3.73311 13.1711 3.56984 12.9001 3.56984 12.6049V11.0963H3.50417C2.77957 11.0963 2.09406 10.7919 1.59571 10.2655C1.09876 9.74065 0.82666 9.03763 0.82666 8.3131V3.01539C0.82666 2.29086 1.09876 1.58783 1.59571 1.06296ZM8.58431 11.0963H11.028C11.7526 11.0963 12.4381 10.7919 12.9364 10.2655C13.4334 9.74065 13.7055 9.03763 13.7055 8.3131V5.67532H16.323C16.55 5.67532 16.7771 5.77016 16.9517 5.9545C17.1276 6.14032 17.2335 6.4012 17.2335 6.68174V11.4897C17.2335 11.7702 17.1276 12.0311 16.9517 12.2169C16.7771 12.4013 16.55 12.4961 16.323 12.4961H15.5405C15.1006 12.4961 14.7439 12.8527 14.7439 13.2927V13.8781L12.9186 12.6344C12.7863 12.5443 12.6301 12.4961 12.47 12.4961H9.4948C9.26781 12.4961 9.04069 12.4013 8.86616 12.2169C8.69023 12.0311 8.58431 11.7702 8.58431 11.4897V11.0963Z"
                    fill="white"
                  />
                </svg>
                <span>{data.messageCount ?? 0}k</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
