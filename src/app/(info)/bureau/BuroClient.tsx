"use client"
import s from './buro.module.scss'
import { useEffect, useRef, useState } from 'react'
import ParallaxImageBig from "@/app/components/ParallaxImageBig/ParallaxImageBig";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  text: string;
}

interface BuroClientProps {
  main_screen?: any;
  about_bureau?: any;
  team_block?: {
    title: string;
    description: string;
    team: TeamMember[];
  };
}

interface ClosestChild {
  index: number;
  distance: number;
}

export default function BuroClient({ main_screen, about_bureau, team_block }: BuroClientProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nameListWrapperRef = useRef<HTMLDivElement>(null);
  const teamTitle = team_block?.title;
  const teamDescription = team_block?.description;
  const teamData = team_block?.team || [];

  useEffect(() => {
    const handleScroll = () => {
      if (!nameListWrapperRef.current) return;

      const wrapper = nameListWrapperRef.current;
      const children = Array.from(wrapper.children) as HTMLElement[];

      // Проверка на пустой массив
      if (children.length === 0) return;

      const viewportCenter = window.innerHeight / 2;

      const childrenData = children.map((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
        const distance = Math.abs(childCenter - viewportCenter);
        return { index, distance };
      });

      // Добавляем начальное значение для reduce
      const closest = childrenData.reduce(
        (prev, current) => (current.distance < prev.distance ? current : prev),
        { index: 0, distance: Infinity } // Начальное значение
      );

      setActiveIndex(closest.index);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/*<section className={s.first_screen}>*/}
      {/*  <div className={s.image_wrapper}>*/}
      {/*    <img src={`${API_URL}${main_screen.image.image}`} alt=""/>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <ParallaxImageBig className={s.first_screen} image={main_screen.image.retina} imageMobile={main_screen.image.mobile}  yStart={-300} yEnd={-1} />

      <section className={s.about_bureau}>
        <div className="container">
          <div className={s.left}>

            <div>
              <h2>{about_bureau.title_h2}</h2>
              <div dangerouslySetInnerHTML={{__html: about_bureau.description}}/>
            </div>

          </div>
          <div className={s.right}>

            {
              about_bureau.list.map((item: any, i: number) => (
                <div key={i}>
                  <h3>{item.title}</h3>
                  <div dangerouslySetInnerHTML={{__html: item.text}}/>
                </div>
              ))
            }

          </div>
        </div>
      </section>

      <section className={s.team}>
        <div className="container">
          <div className={s.name_list}>
            <div className={s.title}>
              <h2>{teamTitle}</h2>
              <p dangerouslySetInnerHTML={{ __html: teamDescription || '' }}></p>
            </div>

            <div className={s.name_list__wrapper} ref={nameListWrapperRef}>
              {teamData.map((item, index) => (
                <div className={index === activeIndex ? s.active : ''} key={index}>
                  <div>
                    <h3 className={s.name}>{item.name}</h3>
                  </div>
                  <div>
                    <span className={s.role}>{item.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={s.teammate_wrapper}>
            <div className={s.teammate}>
              {teamData.map((item, index) => (
                <div className= {`${index === activeIndex ? s.active : ''} ${openIndex === index ? s.open : ''} `} key={index}>
                  <div className={s.head} onClick={() => toggleItem(index)}>{item.name}</div>
                  <div className={s.content}>
                    <div className={s.image_wrapper}>
                      <img src={`${API_URL}${item.image}`} alt={item.name}/>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: item.text}}/>
                    <div className={s.role}>{item.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}