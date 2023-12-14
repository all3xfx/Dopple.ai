import { Fragment, useRef } from "react";
import { Tooltip } from "#/components/shared/Tooltip";
import { useInterface } from "#/state/interface";
import { cn } from "#/lib/cn";

export function RemixTooltip() {
  const mode = useInterface(store => store.mode);

  const tooltip = useRef();

  return (
    <div
      className={cn(
        "mb-[15px] flex w-full border-b text-[14px] leading-[17px]",
        mode === 0
          ? " border-button"
          : mode === 1
          ? " border-[#EDEDF0]"
          : mode === 2
          ? " border-candybutton"
          : mode === 3
          ? " border-galaxybutton"
          : "",
      )}
    >
      <div
        className={cn(
          "flex h-10 flex-1 items-center justify-center space-x-[5px] border-b-2 font-bold",
          mode === 0
            ? " border-blue2 text-white"
            : mode === 1
            ? " border-blue2 text-title"
            : mode === 2
            ? " border-candybuttonhighlight text-candytitle"
            : mode === 3
            ? " text-galaxytitle border-[#5200FF]"
            : "",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="currentColor"
        >
          <path d="M16.8118 9.12488L13.8844 12.1558C13.4993 12.5545 13.3067 12.7538 13.0733 12.8916C12.9959 12.9373 12.9155 12.9777 12.8327 13.0126C12.5828 13.1178 12.308 13.1535 11.7583 13.2248L8.46977 13.6516C7.50765 13.7764 7.02659 13.8389 6.70846 13.6152C6.60703 13.5439 6.51974 13.4544 6.45105 13.3512C6.2356 13.0275 6.31025 12.5482 6.45956 11.5895L6.96474 8.3461C7.04661 7.82049 7.08754 7.55769 7.19232 7.31904C7.22706 7.2399 7.26689 7.16311 7.31157 7.08913C7.4463 6.86602 7.63756 6.68118 8.02006 6.31151L11.4339 3.01221H5.86367C4.36378 3.01221 3.61383 3.01221 3.0881 3.39417C2.91831 3.51753 2.769 3.66685 2.64564 3.83664C2.26367 4.36237 2.26367 5.11231 2.26367 6.61221V13.9604C2.26367 15.4603 2.26367 16.2102 2.64564 16.7359C2.769 16.9057 2.91831 17.055 3.0881 17.1784C3.61383 17.5604 4.36378 17.5604 5.86367 17.5604H13.2118C14.7117 17.5604 15.4617 17.5604 15.9874 17.1784C16.1572 17.055 16.3065 16.9057 16.4299 16.7359C16.8118 16.2102 16.8118 15.4603 16.8118 13.9604V9.12488Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5817 1.04245C15.8501 0.774014 16.2448 0.733445 16.4632 0.951839L19.2373 3.7259C19.4557 3.9443 19.4151 4.33895 19.1466 4.60739L17.1844 6.56963L15.3684 4.75361L13.6195 3.00464L15.5817 1.04245ZM12.6474 3.97674L8.95511 7.66905C8.8475 7.77666 8.77198 7.91028 8.7404 8.04896L7.90708 11.7085C7.86247 11.9045 7.90972 12.0914 8.03478 12.2137C8.15983 12.336 8.34829 12.3796 8.5441 12.3315L12.1515 11.446C12.2862 11.4129 12.4155 11.3386 12.52 11.234L16.2123 7.54174L14.3963 5.7257L12.6474 3.97674Z"
          />
        </svg>
        <span>Chat Preferences</span>
      </div>
      <Tooltip
        content={
          <Fragment>
            <div
              className={cn(
                "dopple-tooltip relative z-[999999] flex flex-col items-start space-y-3 rounded-[10px] p-5",
                mode === 0
                  ? " shadow-tooltip-dark bg-nav after:border-t-nav"
                  : mode === 1
                  ? " shadow-tooltip-light bg-white after:border-t-white"
                  : mode === 2
                  ? " shadow-tooltip-candy bg-candynav after:border-t-candynav"
                  : mode === 3
                  ? " shadow-tooltip-galaxy bg-galaxynav after:border-t-galaxynav"
                  : "",
              )}
              ref={tooltip}
            >
              <div
                className={cn(
                  "flex items-center space-x-[5px]",
                  mode === 0
                    ? " text-white"
                    : mode === 1
                    ? " text-title"
                    : mode === 2
                    ? " text-candytitle"
                    : mode === 3
                    ? " text-galaxytitle"
                    : "",
                )}
              >
                <span
                  className={cn(
                    "font-Inter text-[14px] font-bold leading-[17px]",
                  )}
                >
                  Coming Soon for Dopple+ members.
                </span>
              </div>
            </div>
          </Fragment>
        }
      >
        <div
          className={cn(
            "pointer-all flex h-10 flex-1 items-center justify-center space-x-[5px]",
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
          {mode === 0 || mode === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M3.02734 14.2283L5.99263 14.2283C6.75163 14.2283 7.44523 13.7986 7.78329 13.1191L11.0154 6.62206C11.3534 5.9425 12.047 5.51286 12.806 5.51286L17.6376 5.51286M17.6376 5.51286L15.2094 7.94101M17.6376 5.51286L15.2094 3.08471"
                stroke="#848D97"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.27039 8.7722L7.11179 6.44325C6.9005 6.01852 6.467 5.75 5.99263 5.75L3.02734 5.75L2.27734 5.75V4.25H3.02734H5.99263C7.03625 4.25 7.98995 4.84075 8.45479 5.77514L9.10807 7.08834L8.27039 8.7722ZM9.94575 12.1399L10.3439 12.9403C10.8087 13.8747 11.7624 14.4654 12.806 14.4654L15.8269 14.4654L14.6791 15.6132L14.1488 16.1436L15.2094 17.2042L15.7397 16.6739L18.1679 14.2457C18.4608 13.9528 18.4608 13.478 18.1679 13.1851L15.7397 10.7569L15.2094 10.2266L14.1487 11.2873L14.6791 11.8176L15.8269 12.9654L12.806 12.9654C12.3317 12.9654 11.8982 12.6969 11.6869 12.2722L10.7834 10.4561L9.94575 12.1399Z"
                fill="#848D97"
              />
            </svg>
          ) : mode === 2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.44531 13.4783L7.18489 13.4783L11.3137 5.17881L11.5206 4.76286H11.9852L16.2449 4.76286L15.097 3.61504L14.5667 3.08471L15.6274 2.02405L16.1577 2.55438L18.5859 4.98253L19.1162 5.51286L18.5859 6.04319L16.1577 8.47134L15.6274 9.00167L14.5667 7.94101L15.097 7.41068L16.2449 6.26286L12.4497 6.26286L8.32096 14.5623L8.11404 14.9783H7.64946L3.44531 14.9783H2.69531V13.4783H3.44531ZM2.69531 4.33471H3.44531H7.64946H8.11404L8.32096 4.75066L9.40226 6.92424L8.5771 8.63327L7.18489 5.83471H3.44531H2.69531V4.33471ZM10.5316 12.5621L11.3577 10.8549L12.4497 13.0501H16.2449L15.097 11.9023L14.5667 11.372L15.6274 10.3113L16.1577 10.8416L18.5859 13.2698L19.1162 13.8001L18.5859 14.3305L16.1577 16.7586L15.6274 17.2889L14.5667 16.2283L15.097 15.6979L16.2449 14.5501H11.9851H11.5206L11.3137 14.1342L10.5316 12.5621Z"
                fill="#DD57AF"
              />
            </svg>
          ) : mode === 3 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.44531 13.4784L7.18489 13.4784L11.3137 5.17893L11.5206 4.76298H11.9852L16.2449 4.76298L15.097 3.61516L14.5667 3.08483L15.6274 2.02417L16.1577 2.5545L18.5859 4.98265L19.1162 5.51298L18.5859 6.04331L16.1577 8.47146L15.6274 9.00179L14.5667 7.94113L15.097 7.4108L16.2449 6.26298L12.4497 6.26298L8.32096 14.5624L8.11404 14.9784H7.64946L3.44531 14.9784H2.69531V13.4784H3.44531ZM2.69531 4.33483H3.44531H7.64946H8.11404L8.32096 4.75078L9.40226 6.92436L8.5771 8.63339L7.18489 5.83483H3.44531H2.69531V4.33483ZM10.5316 12.5622L11.3577 10.855L12.4497 13.0502H16.2449L15.097 11.9024L14.5667 11.3721L15.6274 10.3114L16.1577 10.8418L18.5859 13.2699L19.1162 13.8002L18.5859 14.3306L16.1577 16.7587L15.6274 17.2891L14.5667 16.2284L15.097 15.6981L16.2449 14.5502H11.9851H11.5206L11.3137 14.1343L10.5316 12.5622Z"
                fill="#9277FF"
              />
            </svg>
          ) : null}
          <span>Dopple Remix</span>
        </div>
      </Tooltip>
    </div>
  );
}
