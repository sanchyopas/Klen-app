"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./projects.module.scss";
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function Projects({ classes, title, link, projects, is_pc, isNextProjects, btn_name }: any) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, { opacity: 0, y: 50, duration: 0.3, ease: "power2.in", onComplete: () => {
        gsap.set(containerRef.current, { opacity: 0, y: 50 });
        gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }});
  }, [projects]);

  return (
    <section id="projects" className={`${is_pc ? s.pc : ""} ${classes}`}>
      <div className="container">
        {!!title && <Title title={title} as="h2" />}

        <div ref={containerRef} className={isNextProjects ? `${s.projectsList} ${s.nextProjects}` : s.projectsList}>
          {projects.length > 0 ? (
            projects.map((project: any) => (
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
