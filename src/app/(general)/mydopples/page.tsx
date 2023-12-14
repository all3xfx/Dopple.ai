"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import DoppleCard from "../../../components/DoppleCard";
import { useUserProfile } from "#/state/profile";
import { isSignedIn } from "#/utilities/helper";
import { request } from "#/utilities/fetch";
import { useModal } from "#/state/modal";
import { cn } from "#/lib/cn";

const MyDopples = () => {
  const [dopples, setDopples] = useState([]);
  const setModal = useModal(store => store.setModal);

  const profile = useUserProfile(store => store.profile);
  const openProfile = data => {
    // nav("/mydopples/" + data.shareName);
    // document.body.scrollTop = 0;
  };

  const create = () => {
    setModal("waitlist");
  };

  useMemo(async () => {
    if (isSignedIn()) {
      const data: any = await request("/firebase/getDopplesDataByUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: profile.email }),
      });

      if (data) {
        const sortedData = data.sort(
          (a: any, b: any) =>
            b.chat_history[b.chat_history.length - 1].timestamp -
            a.chat_history[a.chat_history.length - 1].timestamp,
        );

        setDopples(sortedData);
      }
    }
  }, [dopples]);

  return (
    <div
      className={cn(
        "px-5 pb-[30px] pt-[15px] md:pb-[50px] md:pt-[30px] xl:px-[60px]",
      )}
    >
      <div className={cn("flex flex-col")}>
        <span
          className={cn(
            "text-[20px] font-semibold leading-[23.87px] md:text-[24px] md:leading-[28.64px]",
          )}
        >
          My Dopples
        </span>
        <span
          className={cn(
            "mt-[5px] text-[12px] font-medium leading-[18px] text-black4",
          )}
        >
          Simplify and personalize your Dopple profiles all on one page.
        </span>
        {dopples.some(x => x.category === 0) && (
          <>
            <div className={cn("mt-[30px] flex items-center justify-between")}>
              <span className={cn("text-[22px] font-bold leading-[22px]")}>
                Companions
              </span>
              <Link
                className={cn(
                  "text-[16px] font-semibold leading-[19px] text-blue2",
                )}
                href="/category/0"
              >
                <>See All</>
              </Link>
            </div>
            <div className={cn("relative")}>
              <div className={cn("pb-[30px]")}>
                <div className={cn("mt-[15px] flex flex-wrap gap-[5px]")}>
                  {dopples
                    .filter((x: any) => x.category === 0)
                    .map((x: any, i: number) => (
                      <div key={i}>
                        <DoppleCard
                          action={() => openProfile(x)}
                          data={x}
                        />
                      </div>
                    ))}
                  <button
                    className={cn(
                      "relative min-w-[260px] max-w-[260px] rounded-[10px] border border-2 border-dashed border-black12 bg-inputback shadow-md xl:min-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl2:min-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] 3xl:min-w-[calc((100vw-120px-25px)/6)] 3xl:max-w-[calc((100vw-120px-25px)/6)]",
                    )}
                    onClick={create}
                  >
                    <svg
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="101"
                      viewBox="0 0 100 101"
                      fill="none"
                    >
                      <path
                        d="M27.4766 28.6025V22.3981C27.4766 13.8127 34.4365 6.85278 43.0219 6.85278H74.9805C83.566 6.85278 90.5259 13.8127 90.5259 22.3981V54.3567C90.5259 62.9422 83.566 69.9021 74.9805 69.9021L71.3439 69.9021"
                        stroke="#212227"
                        strokeWidth="6.73632"
                        strokeLinecap="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.10547 44.1567C4.10547 33.7111 12.5733 25.2432 23.019 25.2432H54.9775C65.4232 25.2432 73.8911 33.711 73.8911 44.1567V76.1152C73.8911 86.5609 65.4232 95.0288 54.9776 95.0288H23.019C12.5734 95.0288 4.10547 86.5609 4.10547 76.1153V44.1567ZM38.9986 43.724C40.8588 43.724 42.3668 45.2319 42.3668 47.0921V56.7683H52.043C53.9032 56.7683 55.4111 58.2763 55.4111 60.1365C55.4111 61.9966 53.9032 63.5046 52.043 63.5046H42.3668V73.1817C42.3668 75.0419 40.8588 76.5499 38.9986 76.5499C37.1385 76.5499 35.6305 75.0419 35.6305 73.1817V63.5046H25.9533C24.0932 63.5046 22.5852 61.9966 22.5852 60.1365C22.5852 58.2763 24.0932 56.7683 25.9533 56.7683H35.6305V47.0921C35.6305 45.2319 37.1385 43.724 38.9986 43.724Z"
                        fill="#212227"
                      />
                    </svg>
                    <span
                      className={cn(
                        "absolute bottom-[30px] left-1/2 w-full -translate-x-1/2 text-center text-[24px] font-semibold leading-[28px] text-black12",
                      )}
                    >
                      Create Dopple
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dopples.some(x => x.category === 1) && (
          <>
            <div className={cn("flex items-center justify-between")}>
              <span className={cn("text-[22px] font-bold leading-[22px]")}>
                Characters
              </span>
              <Link
                className={cn(
                  "text-[16px] font-semibold leading-[19px] text-blue2",
                )}
                href="/category/0"
              >
                See All
              </Link>
            </div>
            <div className={cn("relative")}>
              <div className={cn("pb-[30px]")}>
                <div className={cn("mt-[15px] flex flex-wrap gap-[5px]")}>
                  {dopples
                    .filter((x: any) => x.category === 1)
                    .map((x: any, i: number) => (
                      <div key={i}>
                        <DoppleCard
                          action={() => openProfile(x)}
                          data={x}
                        />
                      </div>
                    ))}
                  <button
                    className={cn(
                      "relative min-w-[260px] max-w-[260px] rounded-[10px] border border-2 border-dashed border-black12 bg-inputback shadow-md xl:min-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl2:min-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] 3xl:min-w-[calc((100vw-120px-25px)/6)] 3xl:max-w-[calc((100vw-120px-25px)/6)]",
                    )}
                    onClick={create}
                  >
                    <svg
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="101"
                      viewBox="0 0 100 101"
                      fill="none"
                    >
                      <path
                        d="M27.4766 28.6025V22.3981C27.4766 13.8127 34.4365 6.85278 43.0219 6.85278H74.9805C83.566 6.85278 90.5259 13.8127 90.5259 22.3981V54.3567C90.5259 62.9422 83.566 69.9021 74.9805 69.9021L71.3439 69.9021"
                        stroke="#212227"
                        strokeWidth="6.73632"
                        strokeLinecap="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.10547 44.1567C4.10547 33.7111 12.5733 25.2432 23.019 25.2432H54.9775C65.4232 25.2432 73.8911 33.711 73.8911 44.1567V76.1152C73.8911 86.5609 65.4232 95.0288 54.9776 95.0288H23.019C12.5734 95.0288 4.10547 86.5609 4.10547 76.1153V44.1567ZM38.9986 43.724C40.8588 43.724 42.3668 45.2319 42.3668 47.0921V56.7683H52.043C53.9032 56.7683 55.4111 58.2763 55.4111 60.1365C55.4111 61.9966 53.9032 63.5046 52.043 63.5046H42.3668V73.1817C42.3668 75.0419 40.8588 76.5499 38.9986 76.5499C37.1385 76.5499 35.6305 75.0419 35.6305 73.1817V63.5046H25.9533C24.0932 63.5046 22.5852 61.9966 22.5852 60.1365C22.5852 58.2763 24.0932 56.7683 25.9533 56.7683H35.6305V47.0921C35.6305 45.2319 37.1385 43.724 38.9986 43.724Z"
                        fill="#212227"
                      />
                    </svg>
                    <span
                      className={cn(
                        "absolute bottom-[30px] left-1/2 w-full -translate-x-1/2 text-center text-[24px] font-semibold leading-[28px] text-black12",
                      )}
                    >
                      Create Dopple
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dopples.some(x => x.category === 2) && (
          <>
            <div className={cn("flex items-center justify-between")}>
              <span className={cn("text-[22px] font-bold leading-[22px]")}>
                Mentors
              </span>
              <Link
                className={cn(
                  "text-[16px] font-semibold leading-[19px] text-blue2",
                )}
                href="/category/0"
              >
                See All
              </Link>
            </div>
            <div className={cn("relative")}>
              <div className={cn("pb-[30px]")}>
                <div className={cn("mt-[15px] flex flex-wrap gap-[5px]")}>
                  {dopples
                    .filter((x: any) => x.category === 2)
                    .map((x: any, i: number) => (
                      <div key={i}>
                        <DoppleCard
                          action={() => openProfile(x)}
                          data={x}
                        />
                      </div>
                    ))}
                  <button
                    className={cn(
                      "relative min-w-[260px] max-w-[260px] rounded-[10px] border border-2 border-dashed border-black12 bg-inputback shadow-md xl:min-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl2:min-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] 3xl:min-w-[calc((100vw-120px-25px)/6)] 3xl:max-w-[calc((100vw-120px-25px)/6)]",
                    )}
                    onClick={create}
                  >
                    <svg
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="101"
                      viewBox="0 0 100 101"
                      fill="none"
                    >
                      <path
                        d="M27.4766 28.6025V22.3981C27.4766 13.8127 34.4365 6.85278 43.0219 6.85278H74.9805C83.566 6.85278 90.5259 13.8127 90.5259 22.3981V54.3567C90.5259 62.9422 83.566 69.9021 74.9805 69.9021L71.3439 69.9021"
                        stroke="#212227"
                        strokeWidth="6.73632"
                        strokeLinecap="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.10547 44.1567C4.10547 33.7111 12.5733 25.2432 23.019 25.2432H54.9775C65.4232 25.2432 73.8911 33.711 73.8911 44.1567V76.1152C73.8911 86.5609 65.4232 95.0288 54.9776 95.0288H23.019C12.5734 95.0288 4.10547 86.5609 4.10547 76.1153V44.1567ZM38.9986 43.724C40.8588 43.724 42.3668 45.2319 42.3668 47.0921V56.7683H52.043C53.9032 56.7683 55.4111 58.2763 55.4111 60.1365C55.4111 61.9966 53.9032 63.5046 52.043 63.5046H42.3668V73.1817C42.3668 75.0419 40.8588 76.5499 38.9986 76.5499C37.1385 76.5499 35.6305 75.0419 35.6305 73.1817V63.5046H25.9533C24.0932 63.5046 22.5852 61.9966 22.5852 60.1365C22.5852 58.2763 24.0932 56.7683 25.9533 56.7683H35.6305V47.0921C35.6305 45.2319 37.1385 43.724 38.9986 43.724Z"
                        fill="#212227"
                      />
                    </svg>
                    <span
                      className={cn(
                        "absolute bottom-[30px] left-1/2 w-full -translate-x-1/2 text-center text-[24px] font-semibold leading-[28px] text-black12",
                      )}
                    >
                      Create Dopple
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* {dopples.some(x => x.category === 3) &&
          <>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[22px] leading-[22px]">Assistants</span>
              <Link className="text-blue2 font-semibold text-[16px] leading-[19px]" to="/category/0">See All</Link>
            </div>
            <div className="relative">
              <div className="pb-[30px]">
                <div className="flex flex-wrap gap-[5px] mt-[15px]">
                  {dopples.filter(x => x.category === 3).map((x, i) =>
                    <DoppleCard key={i} action={() => openProfile(x)} data={x} />
                  )}
                  <button className={"bg-inputback border border-2 border-dashed border-black12 rounded-[10px] shadow-md relative min-w-[260px] max-w-[260px] xl:min-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl2:min-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] 3xl:min-w-[calc((100vw-120px-25px)/6)] 3xl:max-w-[calc((100vw-120px-25px)/6)]"} onClick={create}>
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
                      <path d="M27.4766 28.6025V22.3981C27.4766 13.8127 34.4365 6.85278 43.0219 6.85278H74.9805C83.566 6.85278 90.5259 13.8127 90.5259 22.3981V54.3567C90.5259 62.9422 83.566 69.9021 74.9805 69.9021L71.3439 69.9021" stroke="#212227" strokeWidth="6.73632" strokeLinecap="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.10547 44.1567C4.10547 33.7111 12.5733 25.2432 23.019 25.2432H54.9775C65.4232 25.2432 73.8911 33.711 73.8911 44.1567V76.1152C73.8911 86.5609 65.4232 95.0288 54.9776 95.0288H23.019C12.5734 95.0288 4.10547 86.5609 4.10547 76.1153V44.1567ZM38.9986 43.724C40.8588 43.724 42.3668 45.2319 42.3668 47.0921V56.7683H52.043C53.9032 56.7683 55.4111 58.2763 55.4111 60.1365C55.4111 61.9966 53.9032 63.5046 52.043 63.5046H42.3668V73.1817C42.3668 75.0419 40.8588 76.5499 38.9986 76.5499C37.1385 76.5499 35.6305 75.0419 35.6305 73.1817V63.5046H25.9533C24.0932 63.5046 22.5852 61.9966 22.5852 60.1365C22.5852 58.2763 24.0932 56.7683 25.9533 56.7683H35.6305V47.0921C35.6305 45.2319 37.1385 43.724 38.9986 43.724Z" fill="#212227" />
                    </svg>
                    <span className="absolute bottom-[30px] left-1/2 -translate-x-1/2 font-semibold text-[24px] leading-[28px] text-black12 w-full">Create Dopple</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        }
        {dopples.some(x => x.category === 4) &&
          <>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[22px] leading-[22px]">Health</span>
              <Link className="text-blue2 font-semibold text-[16px] leading-[19px]" to="/category/0">See All</Link>
            </div>
            <div className="relative">
              <div className="pb-[30px]">
                <div className="flex flex-wrap gap-[5px] mt-[15px]">
                  {dopples.filter(x => x.category === 4).map((x, i) =>
                    <DoppleCard key={i} action={() => openProfile(x)} data={x} />
                  )}
                  <button className={"bg-inputback border border-2 border-dashed border-black12 rounded-[10px] shadow-md relative min-w-[260px] max-w-[260px] xl:min-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl:max-w-[calc((100vw-120px-15px)/4)] xl2:min-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] xl2:max-w-[calc((100vw-120px-20px)/5)] 3xl:min-w-[calc((100vw-120px-25px)/6)] 3xl:max-w-[calc((100vw-120px-25px)/6)]"} onClick={create}>
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
                      <path d="M27.4766 28.6025V22.3981C27.4766 13.8127 34.4365 6.85278 43.0219 6.85278H74.9805C83.566 6.85278 90.5259 13.8127 90.5259 22.3981V54.3567C90.5259 62.9422 83.566 69.9021 74.9805 69.9021L71.3439 69.9021" stroke="#212227" strokeWidth="6.73632" strokeLinecap="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.10547 44.1567C4.10547 33.7111 12.5733 25.2432 23.019 25.2432H54.9775C65.4232 25.2432 73.8911 33.711 73.8911 44.1567V76.1152C73.8911 86.5609 65.4232 95.0288 54.9776 95.0288H23.019C12.5734 95.0288 4.10547 86.5609 4.10547 76.1153V44.1567ZM38.9986 43.724C40.8588 43.724 42.3668 45.2319 42.3668 47.0921V56.7683H52.043C53.9032 56.7683 55.4111 58.2763 55.4111 60.1365C55.4111 61.9966 53.9032 63.5046 52.043 63.5046H42.3668V73.1817C42.3668 75.0419 40.8588 76.5499 38.9986 76.5499C37.1385 76.5499 35.6305 75.0419 35.6305 73.1817V63.5046H25.9533C24.0932 63.5046 22.5852 61.9966 22.5852 60.1365C22.5852 58.2763 24.0932 56.7683 25.9533 56.7683H35.6305V47.0921C35.6305 45.2319 37.1385 43.724 38.9986 43.724Z" fill="#212227" />
                    </svg>
                    <span className="absolute bottom-[30px] left-1/2 -translate-x-1/2 font-semibold text-[24px] leading-[28px] text-black12 w-full">Create Dopple</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        } */}
      </div>
    </div>
  );
};

export default MyDopples;
