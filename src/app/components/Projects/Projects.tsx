import s from "./projects.module.scss"
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function Projects( props:any ) {

  const {title, link, projects, is_pc, isNextProjects} = props

  return (
    <section id={`projects`} className={`${is_pc ? s.pc : ""}`}>
      <div className={"container"}>
        {!!title && <Title title={title} as={"h2"} />}
        <div className={isNextProjects ? `${s.projectsList} ${s.nextProjects}` : s.projectsList}>
          {
            projects.map((project:any) => ((
              <ProjectCard data={project} key={project.link}/>
            )))
          }
        </div>

        {!!link && <LinkWithWrapper className={s.linkWrapper} link={"/projects"} dotReverce={false} isWrapper={true} name={"все проекты"} />}

      </div>
    </section>
  );
};
