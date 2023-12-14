"use client";
import { useRouter } from "next/navigation";
import { useDopple } from "#/state/dopples";
import { cn } from "#/lib/cn";

interface ChatButtonProps {
  item: DoppleItem;
}

export function ChatButton({ item }: ChatButtonProps) {
  const setDopple = useDopple(store => store.setDopple);
  const router = useRouter();

  const handleChatNow = () => {
    setDopple(item);
    router.push("/messages");
  };

  return (
    <div
      className={cn(
        "duration-800 pointer-events-auto flex h-[50px] w-full cursor-pointer items-center justify-center space-x-[5.71px] rounded-[4px] bg-blue2 text-[13.7px] font-bold transition hover:bg-blue3 md:w-[150px] md:text-[12px] md:leading-[14px]",
      )}
      onClick={() => handleChatNow()}
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
    </div>
  );
}
