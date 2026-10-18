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
import {contextToQuery, pickNextProjects, resolveProjectsContext} from "@/app/utils/nextProjects";

type Params = {
  slug: string
}

type SearchParams = {
  category?: string | string[]
  subcategory?: string | string[]
}

// Полный список проектов — из него подбираются рекомендации той же категории
async function getProjects() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/cases`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data?.object?.cases) ? data.object.cases : [];
  } catch (error) {
    console.error("Ошибка получения списка проектов:", error);
    return [];
  }
}

const firstParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) || null;

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

  const metadata = await createMetadate(getProject, slug)

  // Фильтры в query-параметрах не создают новых страниц для поисковиков
  return {
    ...metadata,
    alternates: { canonical: `https://abklen.ru/projects/${slug}` },
  }
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



export default async function ProjectPage({ params, searchParams }: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const { slug } = await params;
  const query = await searchParams;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);

  if (!project) {
    notFound();
  }

  // Рекомендации — из выбранной в фильтре категории, а при переходе по прямой ссылке — из основной
  const currentProject = projects.find((item: any) => item.id === project.object.id || item.alias === project.object.alias)
    ?? project.object;
  const projectsContext = resolveProjectsContext(currentProject, {
    category: firstParam(query?.category),
    subcategory: firstParam(query?.subcategory),
  });
  const nextProjects = projects.length
    ? pickNextProjects(projects, currentProject, projectsContext)
    : project?.object?.nextCases ?? [];

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
      {nextProjects.length > 0 &&
        <Projects
          title={"Следующий проект"}
          isNextProjects={true}
          projects={nextProjects}
          linkQuery={contextToQuery(projectsContext)}
        />
      }
    </>
  );
}
