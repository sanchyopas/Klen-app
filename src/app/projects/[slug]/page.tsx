import { DynamicBlock } from "@/app/components/DynamicBlock/DynamicBlock";
import { notFound } from "next/navigation";
import AnimatedTitle from "@/app/AnimateWrapperComponents/AnimatedTitle";
import Title from "@/app/components/Title/Title";
import Projects from "@/app/components/Projects/Projects";
import React from "react";
import NextProjects from "@/app/components/NextProjects/NextProjects";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

type Params = {
  slug: string
}

async function getProject(slug: string) {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/cases/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Ошибка загрузки данных: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка получения данных проекта:", error);
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params
  const {slug} = params;

  const result = await getProject(slug);

  if (!result || !result.object.seo) {
    return {
      title: "Not found"
    }
  }

  return {
    title: result.object.seo.title   || `Заголовок проекта с айди ${slug}`,
    description: result.object.seo.description  || `Описание проекта с айди ${slug}`,
  }
}



export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const pathNames = [
    { link: '/', name: 'Главная' },
    { link: '/projects', name: 'Проекты' },
    { link: '/projects/1', name: project?.object?.main_screen?.title },
  ];

  return (
    <>
      <div>
        <div className="container">
          <Breadcrumbs pathNames={pathNames}/>
          <Title title={project?.object?.main_screen?.title} as="h1" />
        </div>
      </div>

      {
        project?.object?.BlocksList?.map((block: any, index: number) => {
          return <DynamicBlock block={block} key={index}/>
        })
      }
      {/*<NextProjects projects={project.object.nextCases} />*/}
      <Projects title={"Следующий проект"} isNextProjects={true} projects={project?.object?.nextCases} />
    </>
  );
}
