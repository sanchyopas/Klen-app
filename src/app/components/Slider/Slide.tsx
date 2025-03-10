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
            src={item?.main_screen?.image.includes('/upload_resources/') ? `https://dev.modx.fresco.bz${item.main_screen.image}` : `https://dev.modx.fresco.bz/upload_resources/${item.main_screen?.image}`}
            alt=""/>
          :
          <img
            src={item?.image.includes('/upload_resources/') ? `https://dev.modx.fresco.bz${item.image}` : `https://dev.modx.fresco.bz/upload_resources/${item.image}`}
            alt=""/>
      }
    </SwiperSlide>
  )
}