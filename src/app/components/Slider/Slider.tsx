"use client"
import s from "./Slider.module.scss"
import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import {NavigationOptions} from "swiper/types";

export default function Slider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className={s.slider}>
      <div className="container">
        {isMounted && (
          <Swiper
            key={1}
            modules={[Pagination, Navigation]}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              /*renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },*/
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
            <SwiperSlide className={s.slider__slide}>
              <img src="/img/slider/s-1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className={s.slider__slide}>
              <img src="/img/slider/s-2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className={s.slider__slide}>
              <img src="/img/slider/s-3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className={s.slider__slide}>
              <img src="/img/slider/s-1.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        )}
        <div className={s["slider__actions"]}>
          <div ref={paginationRef} className={`${s.slider__pagination}`} />
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

