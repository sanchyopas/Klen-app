import { SwiperSlide } from "swiper/react";
import s from "./Slider.module.scss"
import React from "react";

type Props = {
  item: {
    main_screen?: { image: string };
    image: string;
  }
}
export const SliderSlide = ({item}: Props) => {
  return (
    <SwiperSlide className={s.slider__slide}>
      {
        item.hasOwnProperty("main_screen") ?
          <img
            src={`https://test-6600.fg.onl${item.main_screen?.image}`}
            alt=""/>
          :
          <img
            src={`https://test-6600.fg.onl${item.image}`}
            alt=""/>
      }
    </SwiperSlide>
  )
}