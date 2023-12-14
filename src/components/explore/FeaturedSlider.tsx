"use client";

import {
  ScrollableSlider,
  ScrollableSliderSlide,
} from "../shared/ScrollableSlider";
import { FeaturedCard } from "./FeaturedCard";

interface FeaturedSliderProps {
  items: DoppleList;
}

export function FeaturedSlider({ items }: FeaturedSliderProps) {
  return (
    <ScrollableSlider slidesPerView="auto" spaceBetween={8}>
      {items.map((item, index) => (
        <ScrollableSliderSlide key={index} className="w-[calc(25%-6px)]">
          <FeaturedCard data={item} />
        </ScrollableSliderSlide>
      ))}
    </ScrollableSlider>
  );
}
