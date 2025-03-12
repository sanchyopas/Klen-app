import Projects from "@/app/components/Projects/Projects";
import { notFound } from "next/navigation";
import Filter from "@/app/components/Filter/Filter";
import s from "./projects.module.scss";

async function getData() {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/cases`, {
      cache: "force-cache", // Используем force-cache для статической генерации
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function generateMetadata() {
  const result = await getData();

  if (!result || !result.object.page?.seo) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result.object.page.seo.title,
    description: result.object.page.seo.description,
  };
}

export default async function ProjectsPage() {
  const result = await getData();

  if (!result || !result.object.cases) {
    notFound();
    return null;
  }

  const projects = result.object.cases || {};

  return (
    <>
      <Filter />
      <Projects classes={s.projectsPage} projects={projects} />
    </>
  );
}