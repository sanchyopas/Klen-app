import Link from "next/link";
import s from "./projects.module.scss"
import LinkWithWrapper from "@/app/components/Link/Link";

export default function Projects() {
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
  return (
    <section id="projects">
      <div className={"container"}>
        <div className={s.title}>
          <h2>Проекты</h2>
        </div>
        <div className={s.projectsList}>
          {
            projects.map((project) => ((
              <div className={s.item} key={project.link}>
                <img
                  src={`/img/${project.image}`}
                  alt={project.title}
                />
                <Link href={`/projects/${project.link}`}></Link>
                <h3 className={s.name}>{project.title}</h3>
              </div>
            )))
          }
        </div>
        <LinkWithWrapper link={"/projects"} dotReverce={false} isWrapper={true} name={"все проекты"} />
      </div>
    </section>
  );
};
