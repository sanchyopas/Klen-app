import ProjectsPageClient from "@/app/projects/ProjectsPageClient";
import { notFound } from "next/navigation";

export async function getData() {
  try {
    const res = await fetch("https://test-6600.fg.onl/api/cases", {
      next: { revalidate: 60 }, // Регенерировать страницу каждые 60 секунд
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.object || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function generateMetadata() {
  const result = await getData();

  if (!result || !result.page?.seo) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result?.page?.seo?.title,
    description: result?.page?.seo?.description,
  };
}

export default async function ProjectsPage() {
  const result = await getData();

  if (!result || !result.cases) {
    notFound();
    return null;
  }

  const projects = result.cases;

  const filtersData = {
    types: result.page?.filter_projects || [],
    years: result.page?.filter_period || [],
  };

  return <ProjectsPageClient projects={projects} filtersData={filtersData} />;
}