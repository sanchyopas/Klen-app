"use client"
import s from "@/app/services/services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";

type Props = {
  cases: any[]
}

export const ClientServices = ({cases}:Props) => {
  const elRef = useGsapFadeIn<HTMLDivElement>()

  const [activeIndex, setActiveIndex] = useState(0);
  const [panelHeights, setPanelHeights] = useState<number[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Высота раскрытой панели зависит от числа подуслуг и переносов строк
  useEffect(() => {
    const measure = () => setPanelHeights(panelRefs.current.map((node) => (node ? node.scrollHeight : 0)));

    measure();

    const observer = new ResizeObserver(measure);
    panelRefs.current.forEach((node) => node && observer.observe(node));

    return () => observer.disconnect();
  }, [cases]);

  // Смена картинки — как в блоке услуг на главной
  const handleImageChange = (index: number) => {
    const item = cases[index];

    if (!item?.main_screen?.image || !imageContainerRef.current) return;

    // Подчищаем слои от прерванных анимаций, чтобы они не накапливались
    imageContainerRef.current
      .querySelectorAll(`img:not(.${s.activeImage})`)
      .forEach((node) => node.remove());

    const oldImage = imageContainerRef.current.querySelector(`.${s.activeImage}`) as HTMLImageElement | null;
    const newImage = document.createElement("img");
    newImage.src = `${API_URL}${item.main_screen.image}`;
    newImage.alt = item.main_screen.title ?? '';
    newImage.title = item.main_screen.title ?? '';
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

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;

    handleImageChange(index);
    setActiveIndex(index);
  };

  return (
    <section ref={elRef} id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
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
            </div>

            <div className="col-12 col-md-6">
              <div className={`${s.img} ${s.imageContainer}`} ref={imageContainerRef}>
                {!!cases?.[0]?.main_screen?.image &&
                  <img
                    src={`${API_URL}${cases[0].main_screen.image}`}
                    alt={cases[0].main_screen.title}
                    title={cases[0].main_screen.title}
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
