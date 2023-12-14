import { cn } from "#/lib/cn";
import { CommunityRow } from "#/components/community/CommunityRow";

const Community = () => {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center px-5 pb-[112px] pt-[30px]",
      )}
    >
      <div
        className={cn(
          "flex items-center space-x-[10px] text-[24px] font-bold leading-[24px]",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="22"
          viewBox="0 0 32 22"
          fill="none"
        >
          <path
            d="M7.41197 9.6147H2.88668C1.5699 9.6147 0.502441 10.6703 0.502441 11.9724V16.5677H5.91408V12.7817C5.91408 11.5094 6.49645 10.3716 7.41197 9.6147Z"
            fill="white"
          />
          <path
            d="M26.086 16.5677H31.4975V11.9724C31.4975 10.6702 30.4301 9.61464 29.1133 9.61464H24.5881C25.5036 10.3715 26.086 11.5093 26.086 12.7817V16.5677Z"
            fill="white"
          />
          <path
            d="M19.4692 12.1923H21.9136C22.2428 12.1923 22.5097 12.4562 22.5097 12.7817V16.5677H19.4692V12.1923Z"
            fill="white"
          />
          <path
            d="M12.5307 12.1923V16.5677H9.49044V12.7817C9.49044 12.4562 9.75731 12.1923 10.0865 12.1923H12.5307Z"
            fill="white"
          />
          <path
            d="M25.4834 8.3257C27.0866 8.3257 28.3863 7.04047 28.3863 5.45507C28.3863 3.86966 27.0866 2.58444 25.4834 2.58444C23.8802 2.58444 22.5805 3.86966 22.5805 5.45507C22.5805 7.04047 23.8802 8.3257 25.4834 8.3257Z"
            fill="white"
          />
          <path
            d="M6.5166 8.32576C8.11984 8.32576 9.41953 7.04053 9.41953 5.45513C9.41953 3.86972 8.11984 2.58449 6.5166 2.58449C4.91336 2.58449 3.61367 3.86972 3.61367 5.45513C3.61367 7.04053 4.91336 8.32576 6.5166 8.32576Z"
            fill="white"
          />
          <path
            d="M16.0002 8.64568C18.2122 8.64568 20.0054 6.87243 20.0054 4.68502C20.0054 2.49761 18.2122 0.724365 16.0002 0.724365C13.7882 0.724365 11.995 2.49761 11.995 4.68502C11.995 6.87243 13.7882 8.64568 16.0002 8.64568Z"
            fill="white"
          />
          <path
            d="M10.0865 10.424C8.76975 10.424 7.70229 11.4796 7.70229 12.7818V21.2754H24.2979V12.7818C24.2979 11.4796 23.2304 10.424 21.9136 10.424H10.0865Z"
            fill="white"
          />
        </svg>
        <span>Join the Dopple Gang</span>
      </div>
      <span
        className={cn(
          "mt-[10px] text-center text-[14px] leading-[17px] text-subtext",
        )}
      >
        Unite with Dopple enthusiasts, share experiences, and explore the
        boundless possibilities of Dopples together!
      </span>
      <div className={cn("mt-[30px] flex flex-col space-y-[10px]")}>
        <CommunityRow
          title="Reddit"
          image="/images/community/reddit.svg"
          link="https://www.reddit.com/r/DoppleAI/"
          className="bg-reddit"
        >
          Connect with other Dopple users on Reddit, engage in lively
          discussions, and discover new horizons in the AI realm.
        </CommunityRow>
        <CommunityRow
          title="Discord"
          image="/images/community/discord.svg"
          link="https://discord.gg/WqHY6VSP"
          className="bg-discord"
        >
          Join the Dopple community on Discord to unite with fellow enthusiasts,
          share experiences, and explore the AI world together.
        </CommunityRow>
        <CommunityRow
          title="Twitter"
          image="/images/community/twitter.svg"
          link="https://twitter.com/DoppleAi"
          className="bg-twitter"
        >
          Follow us on Twitter to join the Dopple community, share your stories,
          and embark on an AI-filled journey with others who share your passion.
        </CommunityRow>
        <CommunityRow
          title="Instagram"
          image="/images/community/instagram.svg"
          link="https://www.instagram.com/Dopple_ai/"
          className="bg-instagram"
        >
          Immerse yourself in the captivating world of Dopples on Instagram,
          meet like-minded individuals, and be part of our growing community.
        </CommunityRow>
      </div>
    </div>
  );
};

export default Community;
