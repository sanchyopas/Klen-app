"use client";

import s from "./Slider.module.scss";
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
import Image from "next/image";
import Link from "next/link";

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
  alias: string;
  main_screen: any;
  image: any;
};

export default function Slider({
                                 is_mobile,
                                 slides,
                                 is_boolet,
                                 name_btn,
                                 link_btn,
                                 title,
                                 title_as,
                                 class_name,
                               }: SliderProps) {
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

            item.hasOwnProperty("alias") ?
              <SwiperSlide className={s.slider__slide} key={i}>
                <Link href={`/projects/${item.alias}`} className={s.linkSlide} prefetch={true}>
                {
                  !!item.main_screen.image || !!item.image ?
                    item.hasOwnProperty("main_screen") ?
                      <Image
                        src={item.main_screen.image.includes('/upload_resources/') ?
                          `https://test-6600.fg.onl${item.main_screen.image}` :
                          `https://test-6600.fg.onl/upload_resources/${item.main_screen.image}`}
                        alt="" width={1360} height={720}
                      />
                      :
                      <Image src={item.image.includes('/upload_resources/') ?
                        `https://test-6600.fg.onl${item.image}` :
                        `https://test-6600.fg.onl/upload_resources/${item.image}`}
                        alt="" width={1360} height={720}

                      />
                  : null
                }
                </Link>
              </SwiperSlide>
            :
              <SwiperSlide className={s.slider__slide} key={i}>
                {
                  item.hasOwnProperty("main_screen") ?
                    <Image
                      src={item.main_screen.image.includes('/upload_resources/') ?
                        `https://test-6600.fg.onl${item.main_screen.image}` :
                        `https://test-6600.fg.onl/upload_resources/${item.main_screen.image}`}
                      alt="" width={1360} height={720}
                    />
                    :
                    <Image src={item.image.includes('/upload_resources/') ?
                      `https://test-6600.fg.onl${item.image}` :
                      `https://test-6600.fg.onl/upload_resources/${item.image}`}
                           alt="" width={1360} height={720}

                    />
                }
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