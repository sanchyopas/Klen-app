"use client";

import s from "./ServicesMobile.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import {NavigationOptions} from "swiper/types";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";

gsap.registerPlugin(ScrollTrigger);

type SliderProps = {
  is_mobile?: boolean;
  slides: any;
  is_boolet?: boolean;
  name_btn?: string;
  link_btn?: string;
  title?: string;
  title_as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  class_name?: string;
};

type Slide = {
  main_screen_title: any;
  main_screen: any;
  image: any;
};

export default function ServiceMobile({ is_mobile, slides, is_boolet, name_btn,link_btn,  title, title_as, class_name, }:SliderProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const sliderRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;
    setIsMounted(true);

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        {opacity: 0, y: 50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`${s.slider} ${is_mobile ? s.mb : ""} ${!!class_name && class_name}`}

    >
      <div className="container">
        {!!title && <Title title={"услуги"} is_mobile={true} />}
        <Swiper
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
          {slides.map((item: Slide, i: number) => (
            <SwiperSlide className={s.slider__slide} key={i}>
              {
                item.hasOwnProperty("main_screen") ?
                  <img
                    src={item.main_screen.image.includes('/upload_resources/') ? `https://dev.modx.fresco.bz${item.main_screen.image}` : `https://dev.modx.fresco.bz/upload_resources/${item.main_screen.image}`}
                    alt=""/>
                  :
                  <img
                    src={item.image.includes('/upload_resources/') ? `https://dev.modx.fresco.bz${item.image}` : `https://dev.modx.fresco.bz/upload_resources/${item.image}`}
                    alt=""/>
              }
              <span>{item.main_screen_title}</span>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s["slider__actions"]}>
          {is_boolet ? (
            <div ref={paginationRef} className={`${s.slider__pagination}`}/>
          ) : (
            <LinkWithWrapper dotReverce={false} isWrapper={false} name={name_btn} link={link_btn}/>
          )}

          <div className={s["slider__navigations"]}>
            <button ref={prevRef} className={s["slider__prev"]}>
              <img src="/img/icon/arrow_left.svg" alt=""/>
            </button>
            <button ref={nextRef} className={s["slider__next"]}>
              <img src="/img/icon/arrow_right.svg" alt=""/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
