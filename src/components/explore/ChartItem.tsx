"use client";
import { useRouter } from "next/navigation";
import { useDopple } from "#/state/dopples";
import Link from "next/link";
import { cn } from "#/lib/cn";
import Image from "next/image";

interface ChartItemProps {
  data: DoppleItem;
  index: number;
}

export function ChartItem({ data, index }: ChartItemProps) {
  const setDopple = useDopple(store => store.setDopple);
  const router = useRouter();

  const handleChatNow = () => {
    setDopple(data);
    router.push("/messages");
  };

  return (
    <div className={cn("flex cursor-pointer items-center space-x-2")}>
      <Link
        href={`/profile/${data._id}`}
        className={cn("group/chart-item flex flex-1 items-center")}
      >
        <div
          className={cn(
            "block h-[65px] w-[65px] overflow-hidden rounded-[15px] md:h-[75px] md:w-[75px]",
          )}
        >
          {data.avatarURL && (
            <Image
              className={cn("lazyload h-full w-full object-cover")}
              sizes="(min-width: 768px) 150px, 130px"
              src={data.avatarURL}
              width={75}
              height={75}
              alt=""
            />
          )}
        </div>
        <div
          className={cn("ml-[11.5px] flex flex-1 items-start space-x-[11.5px]")}
        >
          <span
            className={cn(
              "duration-800 text-[16px] font-bold leading-[19px] transition group-hover/chart-item:text-blue2",
            )}
          >
            {index}
          </span>
          <div className={cn("flex w-0 flex-1 flex-col space-y-[5px]")}>
            <div className={cn("flex items-center space-x-[5.71px]")}>
              <span
                className={cn(
                  "duration-800 truncate text-[16px] font-bold leading-[19px] transition group-hover/chart-item:text-blue2",
                )}
              >
                {data.name}
              </span>
              <Image
                className="h-[15px] w-[15px]"
                src="/images/explore/verified.svg"
                width={15}
                height={15}
                alt=""
              />
            </div>
            <span
              className={cn("truncate text-[14px] leading-[17px] text-subtext")}
            >
              {data.tagLine}
            </span>
            <div
              className={cn("flex items-center space-x-[5.71px] text-subtext")}
            >
              <img src="/images/interactive.svg" alt="" />
              <span className="text-[14px] leading-[17px]">
                {data?.messageCount ?? 0}k
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={cn(
          "duration-800 relative z-[1] rounded-[6px] bg-black12 px-[10px] py-2 text-[14px] font-bold leading-[17px] text-blue2 transition hover:bg-blue2 hover:text-white",
        )}
        onClick={() => handleChatNow()}
      >
        CHAT
      </div>
    </div>
  );
}
