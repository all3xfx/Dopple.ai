import Image from "next/image";
import { useInterface } from "#/state/interface";
import { useUserSettings } from "#/state/settings";
import { cn } from "#/lib/cn";

interface IProps {
  onClick: () => void;
}

export function LanguagesAlt({ onClick }: IProps) {
  const mode = useInterface(store => store.mode);
  const currentLang = useUserSettings(store => store.currentLang);

  return (
    <>
      <span
        className={cn(
          "mt-[15px] pl-[15px] text-[14px] leading-[17px]",
          mode === 0
            ? " text-subtext"
            : mode === 1
            ? " text-subtext"
            : mode === 2
            ? " text-candybuttonhighlight"
            : mode === 3
            ? " text-galaxysubtext"
            : "",
        )}
      >
        Language
      </span>
      <button
        className={cn(
          "duration-800 relative mt-[5px] flex items-center space-x-[10px] rounded-[5px] p-[15px] transition",
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
        onClick={onClick}
      >
        {currentLang && (
          <div className={cn("flex w-0 flex-1 items-center space-x-[10px]")}>
            <Image
              width={5}
              height={5}
              className="h-5 w-5"
              src={currentLang.flag}
              alt=""
            />
            <span
              className={cn(
                "w-0 flex-1 truncate text-left text-[14px] leading-[17px]",
                mode === 1 ? " text-title" : "",
              )}
            >
              {currentLang.name}
            </span>
          </div>
        )}
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
    </>
  );
}
