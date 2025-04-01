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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <SwiperSlide className={s.slider__slide}>
      {
        item.hasOwnProperty("main_screen") ?
          <img
            src={`${API_URL}${item.main_screen?.image}`}
            alt=""/>
          :
          <img
            src={`${API_URL}${item.image}`}
            alt=""/>
      }
    </SwiperSlide>
  )
}