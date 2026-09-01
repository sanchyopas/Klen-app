import { DynamicBlock } from "@/app/components/DynamicBlock/DynamicBlock";
import { notFound } from "next/navigation";
import AnimatedTitle from "@/app/AnimateWrapperComponents/AnimatedTitle";
import Title from "@/app/components/Title/Title";
import Projects from "@/app/components/Projects/Projects";
import React from "react";
import NextProjects from "@/app/components/NextProjects/NextProjects";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import s from "./project.module.scss"
import {createMetadate} from "@/app/utils/seo";

type Params = {
  slug: string
}

async function getProject(slug: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/cases/${slug}`, {
      next: { revalidate: 60 },
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

  return createMetadate(getProject, slug)
}

// export async function generateMetadata(props: { params: Promise<Params> }) {
//   const params = await props.params
//   const {slug} = params;
//
//   const result = await getProject(slug);
//
//   if (!result || !result.object.seo) {
//     return {
//       title: "Not found"
//     }
//   }
//
//   return {
//     title: result.object.seo.title   || `Заголовок проекта с айди ${slug}`,
//     description: result.object.seo.description  || `Описание проекта с айди ${slug}`,
//   }
// }



export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const category = project?.object?.category;
  const rawSubcategories = project?.object?.subcategories;
  const subcategories = (Array.isArray(rawSubcategories) ? rawSubcategories : [rawSubcategories])
    .filter((subcategory: any) => subcategory?.slug);

  const categoryQuery = category?.slug ? `category=${encodeURIComponent(category.slug)}` : "";

  // Категории и сабкатегорий может не быть — тогда крошка просто не выводится
  const pathNames = [
    // { link: '/', name: 'Главная' },
    { link: '/projects', name: 'Проекты' },
    ...(category?.slug
      ? [{
          link: `/projects?${categoryQuery}`,
          name: category.title,
        }]
      : []),
    // Сабкатегорий может быть несколько — выводим каждую отдельной крошкой
    ...subcategories.map((subcategory: any) => ({
      link: `/projects?${[categoryQuery, `subcategory=${encodeURIComponent(subcategory.slug)}`]
        .filter(Boolean)
        .join("&")}`,
      name: subcategory.title,
    })),
  ];

  return (
    <>
      <div>
        <div className="container">
          <Breadcrumbs pathNames={pathNames}/>
          <Title className={s.projectTitle} title={project?.object?.main_screen?.title} as="h1"/>
        </div>
      </div>

      <div className={s.blockConstructor}>
        {project?.object?.BlocksList?.map((block: any, index: number) => {
          return <DynamicBlock block={block} key={index}/>
        })}
      </div>

      {/*<NextProjects projects={project.object.nextCases} />*/}
      <Projects title={"Следующий проект"} isNextProjects={true} projects={project?.object?.nextCases}/>
    </>
  );
}
