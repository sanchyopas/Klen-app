import s from "../Projects/projects.module.scss"
import Title from "@/app/components/Title/Title";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import LinkWithWrapper from "@/app/components/Link/Link";
import Link from "next/link";

export default function NextProjects( props:any ) {

  const {projects} = props

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section id={`next-projects`}>
      <div className={"container"}>
        <Title title={"Следующий проект"} as={"h2"} />
        <div className={`${s.projectsList} ${s.nextProjects}`}>
          {
            projects.map((project:any) => ((
              <div className={s.item} key={project.id}>
                <img
                  src={`${API_URL}${project.main_screen.image}`}
                  alt={project.title}
                />
                <Link href={`/projects/${project.id}`}></Link>
                <h3 className={s.name}>{project.title}</h3>
              </div>
            )))
          }
        </div>
      </div>
    </section>
  );
};
