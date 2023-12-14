import { useSearch } from "#/state/search";
import Link from "next/link";
import Image from "next/image";

interface SearchItemProps {
  item: DoppleItem;
}

export function SearchItem({ item }: SearchItemProps) {
  const searchTerm = useSearch(store => store.searchTerm);

  return (
    <Link
      className="flex items-center justify-between px-5 py-[10px] outline-none hover:bg-searchhoverback"
      href={`/profile/${item._id}`}
    >
      <div className="flex max-w-full items-center space-x-[10px] overflow-hidden">
        {item.avatarURL && (
          <Image
            width={50}
            height={50}
            className="h-[50px] w-[50px] rounded-[10px]"
            src={item.avatarURL + "?tr=w-50,h-50"}
            alt=""
          />
        )}
        <div className="flex max-w-full flex-1 flex-col items-start space-y-[5px] overflow-hidden">
          <div className="flex max-w-full flex-1 items-center space-x-[5px] text-[16px] font-bold leading-[19px] text-black4">
            <span className="max-w-full flex-1 truncate text-left">
              <BoldedText text={item.name} shouldBeBold={searchTerm} />
            </span>
            <Image
              width={15}
              height={15}
              className="h-[15px] w-[15px]"
              src="/images/explore/verified.svg"
              alt=""
            />
          </div>
          <div className="flex items-center space-x-[5px] text-[14px] leading-[17px] text-black4">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.04685 1.23349C1.73689 1.23349 1.43461 1.36332 1.20797 1.6027C0.980578 1.84287 0.849055 2.17332 0.849055 2.52244V7.09172C0.849055 7.44083 0.980578 7.77129 1.20797 8.01146C1.43461 8.25084 1.73689 8.38067 2.04685 8.38067H2.79052C3.02498 8.38067 3.21505 8.57074 3.21505 8.8052V9.99045L5.46952 8.45436C5.54 8.40635 5.62329 8.38067 5.70856 8.38067H8.53612C8.84607 8.38067 9.14835 8.25084 9.37499 8.01146C9.60238 7.77129 9.73391 7.44083 9.73391 7.09172V2.52244C9.73391 2.17332 9.60238 1.84287 9.37499 1.6027C9.14835 1.36332 8.84607 1.23349 8.53612 1.23349H2.04685ZM0.591419 1.01895C0.973261 0.615651 1.49627 0.38443 2.04685 0.38443H8.53612C9.08669 0.38443 9.6097 0.615651 9.99154 1.01895C10.3726 1.42146 10.583 1.96266 10.583 2.52244V3.70508H13.1031C13.6139 3.70508 14.0988 3.91961 14.4525 4.2932C14.8055 4.66601 15 5.16692 15 5.68468V9.83154C15 10.3493 14.8055 10.8502 14.4525 11.223C14.0988 11.5966 13.6139 11.8111 13.1031 11.8111H12.8527V13.191C12.8527 13.3484 12.7657 13.4928 12.6266 13.5663C12.4875 13.6399 12.3192 13.6304 12.1891 13.5418L9.64903 11.8111H7.21376C6.70296 11.8111 6.2181 11.5966 5.86438 11.223C5.51141 10.8502 5.31689 10.3493 5.31689 9.83154V9.58577L3.02956 11.1442C2.89954 11.2328 2.73119 11.2422 2.5921 11.1687C2.45301 11.0952 2.36599 10.9507 2.36599 10.7934V9.22972H2.04685C1.49627 9.22972 0.973262 8.9985 0.591419 8.5952C0.210322 8.19269 0 7.65149 0 7.09172V2.52244C0 1.96266 0.210322 1.42146 0.591419 1.01895ZM6.16595 9.22972H8.53612C9.08669 9.22972 9.6097 8.9985 9.99154 8.5952C10.3726 8.19269 10.583 7.65149 10.583 7.09172V4.55413H13.1031C13.3733 4.55413 13.6374 4.66728 13.8359 4.87695C14.0352 5.08741 14.1509 5.37758 14.1509 5.68468V9.83154C14.1509 10.1386 14.0352 10.4288 13.8359 10.6393C13.6374 10.8489 13.3733 10.9621 13.1031 10.9621H12.4282C12.1937 10.9621 12.0037 11.1522 12.0037 11.3866V12.3881L10.0189 11.0358C9.94848 10.9878 9.86518 10.9621 9.77991 10.9621H7.21376C6.94358 10.9621 6.67945 10.8489 6.48093 10.6393C6.28167 10.4288 6.16595 10.1386 6.16595 9.83154V9.22972Z"
              />
            </svg>
            <span>{(item.messageCount / 1000).toFixed(2)}K Messages</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BoldedText({
  text,
  shouldBeBold,
}: {
  text: string;
  shouldBeBold: string;
}) {
  const strColor = text.replace(
    new RegExp(shouldBeBold, "gi"),
    match => `<span class="text-white">${match}</span>`,
  );

  return <span dangerouslySetInnerHTML={{ __html: strColor }} />;
}
