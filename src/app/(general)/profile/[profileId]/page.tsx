import { categories } from "#/config";
import { request } from "#/utilities/fetch";
import { PreviewButton } from "./_components/PreviewButton";
import { ChatButton } from "./_components/ChatButton";
import { Biography } from "./_components/Biography";
import { CharactersList } from "#/components/explore/CharactersList";
import { cn } from "#/lib/cn";

interface ProfilePageProps {
  params: { profileId: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const dopple = await request<DoppleItem>(`/dopple/id/${params.profileId}`);
  const similarItems = await request<DoppleList>("/dopple");

  const items = similarItems.filter((item: any) => item.category === dopple.category);

  return (
    <div className={cn("space-y-10")}>
      <div
        className={cn("flex flex-col md:mt-7 md:flex-row md:px-5 xl:px-[60px]")}
      >
        <div
          className={cn(
            "banner-img-container relative h-[250px] md:flex-1 tiny:h-[431.25px] tiny:min-h-[431.25px]",
          )}
        >
          <img
            className={cn("pointer-events-none h-0 w-0 opacity-0")}
            src={dopple.bannerURL}
            alt=""
          />
          <div
            className={cn(
              "absolute bottom-5 right-5 flex h-[37px] items-center rounded-[28px] border border-[rgba(0,89,25,.25)] bg-menuback px-2 text-[12px] font-bold leading-[15px]",
            )}
          >
            <div className={cn("relative")}>
              <div
                className={cn(
                  "absolute right-[1px] top-[1.5px] h-[5px] w-[5px] rounded-full bg-[#00FF47] shadow-lg9",
                )}
              />
              <img src="/images/profile/icons/global.svg" alt="" />
            </div>
            <span className={cn("ml-[5px]")}>
              {dopple.chattingNow ?? 0} Chatting Now
            </span>
          </div>
          <video
            className={cn("h-full w-full object-cover md:rounded-[15px]")}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src={dopple.bannerVideoURL} type="video/mp4" />
          </video>
        </div>
        <div className={cn("z-[1] flex flex-1 flex-col")}>
          <div className={cn("flex flex-col px-5 md:pl-[30px] md:pr-0")}>
            <div
              className={cn(
                "mt-[-50px] flex items-end justify-between md:mt-0 md:items-start",
              )}
            >
              <img
                className={cn(
                  "h-[115px] w-[115px] rounded-[15px] md:h-[125px] md:w-[125px]",
                )}
                src={dopple.avatarURL + "?tr=w-250,h-250"}
                alt=""
              />
            </div>
            <span
              className={cn(
                "mt-5 flex items-center space-x-[5.71px] md:mt-[15px]",
              )}
            >
              <span className={cn("text-[24px] font-bold leading-[28px]")}>
                {dopple.name}
              </span>
              <img
                className={cn("h-[15px] w-[15px]")}
                src="/images/explore/verified.svg"
                alt=""
              />
            </span>
            <span
              className={cn("text-[16px] font-bold leading-[19px] text-black4")}
            >
              {dopple.tagLine ?? ""}
            </span>
            <Biography text={dopple.bio} />
            <div
              className={cn("mt-[15px] flex flex-col items-center md:flex-row")}
            >
              <ChatButton item={dopple} />
              <PreviewButton />
            </div>
            <div
              className={cn("mb-[20.73px] mt-[15px] h-[1px] w-full bg-black5")}
            />
            <div className={cn("flex items-center justify-between")}>
              <div className={cn("h-[30px] w-[1px] bg-transparent")} />
              <div
                className={cn(
                  "flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]",
                )}
              >
                <img src="/images/profile/icons/1.svg" alt="" />
                <span>Verified Dopple</span>
              </div>
              <div className={cn("h-[30px] w-[1px] bg-black5")} />
              <div
                className={cn(
                  "flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]",
                )}
              >
                <img src={categories[dopple?.category].imageOnProfile} alt="" />
                <span>{categories[dopple?.category].name}</span>
              </div>
              <div className={cn("h-[30px] w-[1px] bg-black5")} />
              <div
                className={cn(
                  "flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]",
                )}
              >
                <img src="/images/profile/icons/3.svg" alt="" />
                <span>
                  {(dopple?.messageCount / 1000).toFixed(2) ?? 0}k Messages
                </span>
              </div>
              <div className={cn("h-[30px] w-[1px] bg-black5")} />
              <div
                className={cn(
                  "flex w-[86.09px] flex-col items-center space-y-2 text-[10px] leading-[150%] text-black4 md:w-[100px] md:text-[12px] md:leading-[18px]",
                )}
              >
                <img src="/images/profile/icons/4.svg" alt="" />
                <span className={cn("max-w-full truncate")}>
                  By {dopple?.username}
                </span>
              </div>
              <div className={cn("h-[30px] w-[1px] bg-transparent")} />
            </div>
            <div className={cn("mb-[15px] mt-4 h-[1px] w-full bg-black5")} />
          </div>
        </div>
      </div>

      <CharactersList title="Similar Dopples" items={items} showAll={false} />
    </div>
  );
}
