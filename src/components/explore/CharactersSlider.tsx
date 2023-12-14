"use client";

import { SwiperSlide } from "swiper/react";
import { ScrollableSlider } from "../shared/ScrollableSlider";
import { CharactersCard } from "./CharactersItem";

interface CharactersSliderProps {
  items: DoppleList;
}

export function CharactersSlider({ items }: CharactersSliderProps) {
  return (
    <ScrollableSlider slidesPerView={4} spaceBetween={8}>
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <CharactersCard data={item} />
        </SwiperSlide>
      ))}
    </ScrollableSlider>
  );
}
