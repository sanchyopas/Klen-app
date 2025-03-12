"use client";
import s from "./map.module.scss";
import { useEffect, useRef } from "react";
import LinkWithWrapper from "@/app/components/Link/Link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    ymaps?: any;
  }
}

export default function YandexMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const listItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let map: any;

    const loadMap = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        map = new window.ymaps.Map(mapContainer.current, {
          center: [55.755135, 37.561625],
          zoom: 14,
          controls: [],
          scaleble: false,
        });

        const isTouch = window.matchMedia && window.matchMedia("(pointer:coarse)").matches;

        if (isTouch) {
          map.behaviors.disable("drag");
          map.behaviors.disable("multiTouch");
          map.behaviors.disable("scrollZoom");
        }

        map.behaviors.disable("scrollZoom");
        map.behaviors.disable("dblClickZoom");
        map.behaviors.disable("multiTouch");
        map.controls.remove("zoomControl");

        const layer = window.ymaps.layer.storage.get("map#custom");

        if (!layer) {
          window.ymaps.layer.storage.add("map#custom", function () {
            return new window.ymaps.Layer(
              "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x=%x&y=%y&z=%z&scale=1&lang=ru_RU"
            );
          });

          window.ymaps.mapType.storage.add(
            "custom#grey",
            new window.ymaps.MapType("Серая карта", ["map#custom"])
          );
        }

        map.setType("custom#grey");

        const placemark = new window.ymaps.Placemark(
          [55.755135, 37.561625],
          {
            hintContent: "Офис KLЁN",
            balloonContent: "Офис KLЁN",
          },
          {
            iconLayout: "default#image",
            iconImageHref: "/img/icon/Pin.png",
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20],
          }
        );

        map.geoObjects.add(placemark);

      });
    };

    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=8a32baae-0de4-4b36-b6db-ca41be50c172&lang=ru_RU";
      script.async = true;
      script.onload = loadMap;
      document.body.appendChild(script);
    } else {
      loadMap();
    }

    return () => {
      if (map) map.destroy();
    };
  }, []);

  useEffect(() => {



    gsap.fromTo(
      mapContainer.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapContainer.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      listItemsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        delay: 0.8,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className={s.map}>
      <div className="container">
        <div className={s["map__inner"]}>
          <div ref={contactInfoRef} className={s["contact-info"]}>
            <div className={s["contact-info__body"]}>
              <h2>KLЁN — architectural bureau</h2>
              <div className={s["contact-info__list"]}>
                {[
                  {
                    icon: "/img/icon/tg.svg",
                    alt: "Klen telegramm",
                    link: "tel:+7 (926) 761-74-33",
                    text: "+7 (926) 761-74-33",
                    subtext: "пн–пт 09:00–18:00",
                  },
                  {
                    icon: "/img/icon/mail.svg",
                    alt: "Klen email",
                    link: "mailto:info@abklen.com",
                    text: "info@abklen.com",
                  },
                  {
                    icon: "/img/icon/location.svg",
                    alt: "Klen местоположение",
                    link: "#",
                    text: "123022, Москва, ул. Рочдельская, 15, стр.23",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) listItemsRef.current[index] = el;
                    }}
                    className={s["contact-info__list-item"]}
                  >
                    <div className={s["contact-info__list-icon"]}>
                      <img src={item.icon} alt={item.alt} />
                    </div>
                    <div className={s["contact-info__list-text"]}>
                      <a href={item.link}>{item.text}</a>
                      {item.subtext && <p>{item.subtext}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={mapContainer} className={s["map-container"]}></div>
        </div>
      </div>
    </div>
  );
}
