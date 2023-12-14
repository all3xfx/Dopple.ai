"use client";

import { useModal } from "#/state/modal";
import { cn } from "#/lib/cn";

export function HeaderCreateButton() {
  const setModal = useModal(store => store.setModal);

  return (
    <button
      className={cn(
        "duration-800 group flex h-[45px] items-center justify-center space-x-[7.02px] rounded-[5px] bg-button px-[10px] text-[14px] leading-[17px] text-subtext transition hover:bg-subtext hover:text-white",
      )}
      onClick={() => setModal("waitlist")}
    >
      <div className="relative h-[18px] w-[18px]">
        <svg
          className="absolute left-0 top-0 group-hover:opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
        >
          <rect
            x="1.02344"
            y="4.06885"
            width="12.8831"
            height="12.8831"
            rx="3"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M7.46484 7.43994V13.5806"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M10.5352 10.5103L4.39449 10.5103"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M13.9768 13.9312C15.6337 13.9312 16.9768 12.588 16.9768 10.9312V4.0481C16.9768 2.39124 15.6337 1.0481 13.9768 1.0481H7.09375C5.4369 1.0481 4.09375 2.39124 4.09375 4.0481"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute left-0 top-0 opacity-0 group-hover:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.373535 7.0687C0.373535 5.05286 2.0077 3.4187 4.02354 3.4187H10.9066C12.9224 3.4187 14.5566 5.05286 14.5566 7.0687V13.9518C14.5566 15.9676 12.9224 17.6018 10.9066 17.6018H4.02354C2.0077 17.6018 0.373535 15.9676 0.373535 13.9518V7.0687ZM7.46474 6.78989C7.82372 6.78989 8.11474 7.08091 8.11474 7.43989V9.86023H10.5353C10.8943 9.86023 11.1853 10.1512 11.1853 10.5102C11.1853 10.8692 10.8943 11.1602 10.5353 11.1602H8.11474V13.5806C8.11474 13.9395 7.82372 14.2306 7.46474 14.2306C7.10575 14.2306 6.81474 13.9395 6.81474 13.5806V11.1602H4.39463C4.03564 11.1602 3.74463 10.8692 3.74463 10.5102C3.74463 10.1512 4.03564 9.86023 4.39463 9.86023H6.81474V7.43989C6.81474 7.08091 7.10575 6.78989 7.46474 6.78989Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.34375 4.0481C3.34375 1.97703 5.02268 0.298096 7.09375 0.298096H13.9768C16.0479 0.298096 17.7268 1.97703 17.7268 4.0481V10.9312C17.7268 13.0022 16.0479 14.6812 13.9768 14.6812C13.5626 14.6812 13.2268 14.3454 13.2268 13.9312C13.2268 13.5169 13.5626 13.1812 13.9768 13.1812C15.2194 13.1812 16.2268 12.1738 16.2268 10.9312V4.0481C16.2268 2.80546 15.2194 1.7981 13.9768 1.7981H7.09375C5.85111 1.7981 4.84375 2.80546 4.84375 4.0481C4.84375 4.46231 4.50796 4.7981 4.09375 4.7981C3.67954 4.7981 3.34375 4.46231 3.34375 4.0481Z"
            fill="white"
          />
        </svg>
      </div>
      <span>Create</span>
    </button>
  );
}
