import { DynamicBlock } from "@/app/components/DynamicBlock/DynamicBlock";
import { notFound } from "next/navigation";
import AnimatedTitle from "@/app/AnimateWrapperComponents/AnimatedTitle";
import Title from "@/app/components/Title/Title";
import Projects from "@/app/components/Projects/Projects";
import React from "react";

type Params = {
  id: number
}


async function getProject(id: number) {
  const res = await fetch(`https://dev.modx.fresco.bz/api/cases/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Ошибка загрузки данных: ${res.status}`);
  }

  return res.json();
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = await getProject(Number(id));


  if (!project) {
    notFound();
  }

  const projects = [
    {
      "link": "pr1",
      "image": "/img/image-1.jpg",
      "title": "brodsky"
    },
    {
      "link": "pr2",
      "image": "/img/image-2.jpg",
      "title": "интерьер МОП"
    },
  ]

  return (
    <>
      <section>
        <div className="container">
          <h1 className="sr-only">{project.object.main_screen.title}</h1> {/* 👀 SEO-заголовок */}
          <AnimatedTitle title={project.object.main_screen.title} />
        </div>
      </section>

      {
        project.object.BlocksList.map((block: any, index: number) => {
          return <DynamicBlock block={block} key={index}/>
        })
      }

      <Projects title={"Следующий проект"} isNextProjects={true} projects={projects} />
    </>
  );
}
