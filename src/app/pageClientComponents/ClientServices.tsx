"use client"
import s from "@/app/services/services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import Title from "@/app/components/Title/Title";

type Props = {
  cases: any[]
  // Фото, пока ни одна категория не раскрыта — задаётся на ресурсе «Услуги» в MODx
  defaultImage?: string | null
  // Заголовок и кнопка «все услуги» — для блока услуг на главной
  title?: string
  button_name?: string
  button_link?: string
}

export const ClientServices = ({cases, defaultImage: defaultImagePath, title, button_name, button_link}:Props) => {
  const elRef = useGsapFadeIn<HTMLDivElement>()

  // По умолчанию все категории свёрнуты
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [panelHeights, setPanelHeights] = useState<number[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Пока в админке фото не задано — показываем картинку первой категории
  const fallbackImagePath = defaultImagePath || cases?.[0]?.main_screen?.image;
  const defaultImage = fallbackImagePath ? `${API_URL}${fallbackImagePath}` : null;

  // Высота раскрытой панели зависит от числа подуслуг и переносов строк
  useEffect(() => {
    const measure = () => setPanelHeights(panelRefs.current.map((node) => (node ? node.scrollHeight : 0)));

    measure();

    const observer = new ResizeObserver(measure);
    panelRefs.current.forEach((node) => node && observer.observe(node));

    return () => observer.disconnect();
  }, [cases]);

  // Смена картинки — как в блоке услуг на главной
  const handleImageChange = (index: number | null) => {
    const item = index === null ? null : cases[index];
    const src = item?.main_screen?.image ? `${API_URL}${item.main_screen.image}` : defaultImage;

    if (!src || !imageContainerRef.current) return;

    // Подчищаем слои от прерванных анимаций, чтобы они не накапливались
    imageContainerRef.current
      .querySelectorAll(`img:not(.${s.activeImage})`)
      .forEach((node) => node.remove());

    const oldImage = imageContainerRef.current.querySelector(`.${s.activeImage}`) as HTMLImageElement | null;
    const newImage = document.createElement("img");
    newImage.src = src;
    newImage.alt = item?.main_screen?.title ?? '';
    newImage.title = item?.main_screen?.title ?? '';
    newImage.className = `${s.animatedImage} ${s.activeImage}`;
    newImage.style.opacity = "0";
    newImage.style.transform = "scale(1.2)";

    imageContainerRef.current.appendChild(newImage);

    if (oldImage) {
      oldImage.classList.remove(s.activeImage);
      gsap.to(oldImage, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          if (oldImage.parentNode) {
            oldImage.remove();
          }
        },
      });
    }

    gsap.to(newImage, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // Повторный клик по раскрытой категории сворачивает её
  const handleSelect = (index: number) => {
    const nextIndex = index === activeIndex ? null : index;

    handleImageChange(nextIndex);
    setActiveIndex(nextIndex);
  };

  return (
    <section ref={elRef} id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          {!!title && <Title title={title} as="h2" className={s.title}/>}
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.accordion}>
                {cases?.map((item:any, index:number) => (
                  <div
                    key={item.id ?? index}
                    className={`${s.accordionItem} ${activeIndex === index ? s.active : ""}`}
                  >
                    <button
                      type="button"
                      className={s.accordionHead}
                      onClick={() => handleSelect(index)}
                      aria-expanded={activeIndex === index}
                    >
                      <h3>{item.main_screen?.title}</h3>
                    </button>

                    <div
                      className={s.accordionPanel}
                      style={{maxHeight: activeIndex === index ? `${panelHeights[index] ?? 0}px` : 0}}
                    >
                      <div
                        className={s.accordionPanelInner}
                        ref={(node) => {
                          panelRefs.current[index] = node;
                        }}
                      >
                        {!!item.main_screen?.preview_text && <p>{item.main_screen.preview_text}</p>}

                        <div className={s.linkList}>
                          {
                            // Первым элементом subservice всегда идёт сама категория —
                            // в раскрытом аккордеоне нужны только дочерние услуги
                            (item.subservice ?? [])
                              .filter((itemLink: any) => itemLink.alias !== item.alias)
                              .map((itemLink: any, i: number) => (
                                <LinkWithWrapper
                                  key={itemLink.id ?? i}
                                  className={s.linkWrapper}
                                  link={`/services/${item.alias}/${itemLink.alias}`}
                                  dotReverce={false}
                                  dotOnHover={true}
                                  isWrapper={false}
                                  name={itemLink.pagetitle}
                                />
                              ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!!button_link && !!button_name &&
                <LinkWithWrapper
                  className={s.moreLink}
                  link={button_link}
                  dotReverce={false}
                  isWrapper={true}
                  name={button_name}
                />
              }
            </div>

            <div className="col-12 col-md-6">
              <div className={`${s.img} ${s.imageContainer}`} ref={imageContainerRef}>
                {!!defaultImage &&
                  <img
                    src={defaultImage}
                    alt=""
                    className={`${s.animatedImage} ${s.activeImage}`}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
