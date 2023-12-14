"use client";

import { useMemo } from "react";
import Lottie from "react-lottie";

import anim1_1 from "./definitions/Characters Hover Default.json";
import anim1_2 from "./definitions/Characters Hover Selected.json";
import anim2_1 from "./definitions/Companions Hover Default.json";
import anim2_2 from "./definitions/Companions Hover Selected.json";
import anim3_1 from "./definitions/Mentors Hover Default.json";
import anim3_2 from "./definitions/Mentors Hover Selected.json";
import anim4_1 from "./definitions/Assistant Hover Default.json";
import anim4_2 from "./definitions/Assistant Hover Selected.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const animations = {
  characters: [anim1_1, anim1_2],
  companions: [anim2_1, anim2_2],
  mentors: [anim3_1, anim3_2],
  assistants: [anim4_1, anim4_2],
};

export function AnimatedIcon({
  type,
  active,
}: {
  type: keyof typeof animations;
  active: boolean;
}) {
  const animation = useMemo(() => {
    const [a, b] = animations[type];
    const configuration = active ? b : a;

    return { ...defaultOptions, animationData: configuration };
  }, [type, active]);

  return (
    <Lottie width={20} height={20} options={animation} isClickToPauseDisabled />
  );
}
