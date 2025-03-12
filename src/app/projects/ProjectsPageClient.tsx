"use client";
import {useState, useEffect} from "react";
import Projects from "@/app/components/Projects/Projects";
import Filter from "@/app/components/Filter/Filter";
import s from "./projects.module.scss";

type Project = {
  id: number;
  alias: string;
  getTypes: string;
  getYears: string;
  main_screen: {
    preview_text: string;
    image: string;
  };
}

type FiltersData = {
  types: string[];
  years: string[];
}

type Props = {
  projects: Project[];
  filtersData: FiltersData;
}

export default function ProjectsPageClient({projects, filtersData}: Props) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [filters, setFilters] = useState<{ type: string | null; year: string | null }>({
    type: null,
    year: null,
  });

  useEffect(() => {
    const filtered = projects.filter((project) => {
      return (
        (!filters.type || project.getTypes === filters.type) &&
        (!filters.year || project.getYears === filters.year)
      );
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  return (
    <>
      <Filter filtersData={filtersData} onFilterChange={setFilters}/>
      <Projects classes={s.projectsPage} projects={filteredProjects}/>
    </>
  );
}
