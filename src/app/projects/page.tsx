import Projects from "@/app/components/Projects/Projects";
import {useGetProjectByIdQuery} from "@/app/redux/caseApi";
import {notFound} from "next/navigation";

async function getData() {
  try {
    const res = await fetch(`https://dev.modx.fresco.bz/api/cases`, {
      cache: "no-store",
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

  if (!result || !result.object?.page) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result.object.page.SEO_TITLE,
    description: result.object.page.SEO_DESCR,
  };
}

export default async function ProjectsPage () {

  const result = await getData();

  if (!result || !result.object.cases) {
    notFound();
    return null;
  }

  const projects = result.object.cases || {};

  return (
    <>
      <Projects projects={projects}/>
    </>
  );
};
