"use client";

import { cn } from "#/lib/cn";
import { groupArr } from "#/utilities/format";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChartItem } from "./ChartItem";
import { FreeMode, Mousewheel } from "swiper/modules";

interface ChartSliderProps {
  items: DoppleList;
  groupSize?: number;
}

// TODO: integrate
const doppleCategory = -1;

export function ChartSlider({ items, groupSize = 3 }: ChartSliderProps) {
  const [elastic, setElastic] = useState("none");

  /**
   * We are going to filter the items, based on the category.
   */
  const filteredItems = useMemo(() => {
    if (doppleCategory === -1) {
      return items;
    }

    return items.filter(item => item.category === doppleCategory);
  }, [items]);

  /**
   * Items mapped based on the breakpoint.
   */
  const mappedItems = useMemo(() => {
    return groupArr(filteredItems, groupSize) as DoppleItem[][];
  }, [filteredItems, groupSize]);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      className={cn(
        "!overflow-visible md:translate-x-0",
        elastic === "left" && "translate-x-[5px]",
        elastic === "right" && "translate-x-[-5px]",
        elastic === "none" && "translate-x-[0px]",
      )}
      onSlideChange={e => {
        setElastic(e.activeIndex < e.previousIndex ? "left" : "right");
        setTimeout(() => setElastic("none"), 400);
      }}
      breakpoints={{
        768: { slidesPerView: 3 },
      }}
      modules={[FreeMode, Mousewheel]}
      freeMode
      mousewheel={{ forceToAxis: true }}
    >
      {mappedItems.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col">
            {item.map((subitem, idx) => (
              <div
                key={idx}
                className={cn("border-t border-gray-800 py-3 first:border-t-0")}
              >
                <ChartItem data={subitem} index={index * 3 + idx + 1} />
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
