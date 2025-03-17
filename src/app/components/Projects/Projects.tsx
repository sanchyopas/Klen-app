"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./projects.module.scss";
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function Projects({ classes, title, link, projects, is_pc, isNextProjects, btn_name }: any) {
  const containerRef = useRef(null);
  const [prevProjects, setPrevProjects] = useState(projects);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isAnimating) return;

    const items = gsap.utils.toArray(".project-card");
    if (items.length === 0) {
      setPrevProjects(projects);
      return;
    }

    setIsAnimating(true);

    gsap.to(items, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.1,
      onComplete: () => {
        setPrevProjects(projects);
        setIsAnimating(false);
      },
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
      duration: 0.5,
      ease: "power2.out",
      stagger: items.length > 1 ? 0.1 : 0,
    });
  }, [prevProjects]);

  return (
    <section id="projects" className={`${is_pc ? s.pc : ""} ${classes}`}>
      <div className="container">
        {!!title && <Title title={title} as="h2" />}

        <div ref={containerRef} className={isNextProjects ? `${s.projectsList} ${s.nextProjects}` : s.projectsList}>
          {prevProjects.length > 0 ? (
            prevProjects.map((project: any) => (
              <ProjectCard key={project.id} id={project.id} slug={project.alias} title={project.main_screen.preview_text} image={project.main_screen.image} />
            ))
          ) : (
            <div className={s.emptyMessage}>Нет результатов</div>
          )}
        </div>

        {!!link && <LinkWithWrapper className={s.linkWrapper} link="/projects" dotReverce={false} isWrapper={true} name={btn_name} />}
      </div>
    </section>
  );
}
