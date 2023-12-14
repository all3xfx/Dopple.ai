"use client";

import type { SwiperProps } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

interface ScrollableSliderProps extends SwiperProps {
  children: React.ReactNode;
}

export function ScrollableSlider({
  children,
  ...props
}: ScrollableSliderProps) {
  return (
    <Swiper
      className="!overflow-visible"
      modules={[FreeMode, Mousewheel]}
      freeMode={true}
      mousewheel={{ forceToAxis: true }}
      {...props}
    >
      {children}
    </Swiper>
  );
}

export const ScrollableSliderSlide = SwiperSlide;
