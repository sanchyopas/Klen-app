"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./projects.module.scss";
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";
import Image from "next/image";

export default function Projects({ classes, title, link, projects, is_pc, isNextProjects, btn_name }: any) {
  const containerRef = useRef(null);
  const [prevProjects, setPrevProjects] = useState(projects);

  useEffect(() => {
    if (!containerRef.current) return;

    // Если проекты не изменились - выходим
    const isSameList =
      prevProjects.length === projects.length &&
      prevProjects.every((item: any, index: number) => item.id === projects[index].id);

    if (isSameList) return;

    const items = gsap.utils.toArray(".project-card");
    if (items.length === 0) {
      setPrevProjects(projects);
      return;
    }

    // Прерываем незавершённую анимацию, иначе быстрые клики по фильтрам теряются
    gsap.killTweensOf(items);

    gsap.to(items, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      // Общее время разлёта фиксировано: пауза до подмены не растёт с числом карточек
      stagger: { amount: 0.12 },
      onComplete: () => setPrevProjects(projects),
    });
  }, [projects]);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray(".project-card");
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 20, clipPath: "inset(0% 100% 0% 0%)" });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.4,
      ease: "power2.out",
      stagger: items.length > 1 ? { amount: 0.3 } : 0,
    });
  }, [prevProjects]);

  return (
    <section id="projects" className={`${is_pc ? s.pc : ""} ${classes}`}>
      <div className="container">
        {!!title && <Title title={title} as="h2" />}

        <div ref={containerRef} className={isNextProjects ? `${s.projectsList} ${s.nextProjects}` : s.projectsList}>
          {prevProjects.length > 0 ? (
            prevProjects.map((project: any, index: number) => (
              <ProjectCard key={project.id} id={project.id} slug={project.alias} title={project.main_screen.preview_text} image={project.main_screen.image} priority={index < 2} />
            ))
          ) : (
            <div className={s.emptyMessage}>
              <Image
                src={"/img/not-result.svg"}
                alt="KLЁN — architectural bureau"
                width={160}
                height={142}
                priority
                quality={100}
              />
              <span>Не найдено подходящих проектов</span>
            </div>
          )}
        </div>

        {!!link && <LinkWithWrapper className={s.linkWrapper} link="/projects" dotReverce={false} isWrapper={true} name={btn_name} />}
      </div>
    </section>
  );
}
