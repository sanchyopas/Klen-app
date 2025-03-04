import s from "./projects.module.scss"
import Title from "@/app/components/Title/page";
import ProjectCard from "@/app/components/ProjectCard/page";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function Projects( props:any ) {

  const {title, link, projects} = props

  return (
    <section id="projects">
      <div className={"container"}>

        {!!title && <Title title={title}/>}

        <div className={s.projectsList}>
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
