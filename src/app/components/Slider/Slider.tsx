"use client"
import s from "./Slider.module.scss"
import React, {useEffect, useRef, useState, ReactElement} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import {NavigationOptions} from "swiper/types";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";

type SliderProps = {
  is_mobile?: boolean;
  slides: any
  is_boolet?: boolean;
  name_btn?: string;
  link_btn?: string;
  title?: ReactElement;
  class_name?: string;
}

type Slide = {
  image: string;
}

export default function Slider({is_mobile, slides, is_boolet, name_btn, link_btn, title, class_name}: SliderProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("Slider Props:", { slides, is_boolet, name_btn, link_btn });
  return (
    <div className={`${s.slider} ${is_mobile ? s.mb : ""} ${!!class_name && class_name}`}>
      <div className="container">
        {!!title && <Title title={title} is_mobile={true} />}
        {isMounted && (
          <Swiper
            key={1}
            modules={[Pagination, Navigation]}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            navigation={{
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }}
            onInit={(swiper) => {
              if (!swiper.params.navigation) return;
              const navigation = swiper.params.navigation as NavigationOptions;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;

              swiper.navigation?.init();
              swiper.navigation?.update();
            }}
          >
            {slides.map((item:Slide, i:number) => (
              <SwiperSlide className={s.slider__slide} key={i}>
                <img src={item.image} alt="" />
              </SwiperSlide>
            ))}

          </Swiper>
        )}
        <div className={s["slider__actions"]}>
          {is_boolet ? (
            <div ref={paginationRef} className={`${s.slider__pagination}`} />
          ):(
            <LinkWithWrapper dotReverce={false} isWrapper={false} name={name_btn} link={link_btn}/>
          )}

          <div className={s["slider__navigations"]}>
            <button ref={prevRef} className={s["slider__prev"]}>
              <img src="/img/icon/arrow_left.svg" alt="" />
            </button>
            <button ref={nextRef} className={s["slider__next"]}>
              <img src="/img/icon/arrow_right.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

