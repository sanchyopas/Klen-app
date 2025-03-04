"use client"
import s from "./MiniSlider.module.scss"

import Slider from "@/app/components/Slider/Slider";

type MiniSliderProps = {
  slides: any
}

export default function MiniSlider({slides}: MiniSliderProps) {
  return (
    <Slider class_name={s.MiniSlider} slides={slides} is_mobile={false} is_boolet={true} />
  );
};

