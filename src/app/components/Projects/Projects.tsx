import s from "./projects.module.scss"
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";
import {log} from "node:util";

export default function Projects( props:any ) {

  const {classes, title, link, projects, is_pc, isNextProjects, btn_name} = props

  return (
    <section id={`projects`} className={`${is_pc ? s.pc : ""} ${classes}`}>
      <div className={"container"}>
        {!!title && <Title title={title} as={"h2"} />}
        <div className={isNextProjects ? `${s.projectsList} ${s.nextProjects}` : s.projectsList}>
          {
            projects.map((project:any) => ((
              <ProjectCard key={project.id} id={project.id} title={project.main_screen.preview_text} image={project.main_screen.image} />
            )))
          }
        </div>
        {!!link && <LinkWithWrapper className={s.linkWrapper} link={"/projects"} dotReverce={false} isWrapper={true} name={btn_name} />}
      </div>
    </section>
  );
};
