import s from "./projects.module.scss"
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/page";
import ProjectCard from "@/app/components/ProjectCard/page";

export default function Projects( props:any ) {
  const projects = [
      {
        "link": "pr1",
        "image": "image-1.jpg",
        "title": "brodsky"
      },
      {
        "link": "pr2",
        "image": "image-2.jpg",
        "title": "интерьер МОП"
      },
      {
        "link": "pr3",
        "image": "image-3.jpg",
        "title": "реновация облика фасадов"
      },
      {
        "link": "pr4",
        "image": "image-4.jpg",
        "title": "жилой интерьер"
      },
      {
        "link": "pr5",
        "image": "image-5.jpg",
        "title": "концепция фасадных решений ЖК 'Порто-Ново'"
      },
      {
        "link": "pr6",
        "image": "image-6.jpg",
        "title": "концепция благоустройства ЖК Снегири"
      },
    ]

  const {title, link} = props

  return (
    <section id="projects">
      <div className={"container"}>

        {!!title && <Title title={title}/>}

        <div className={s.projectsList}>
          {
            projects.map((project) => ((
              <ProjectCard data={project} key={project.link}/>
            )))
          }
        </div>

        {!!link && <LinkWithWrapper className={s.linkWrapper} link={"/projects"} dotReverce={false} isWrapper={true} name={"все проекты"} />}

      </div>
    </section>
  );
};
