"use client";
import { useState, useEffect } from "react";
import Projects from "@/app/components/Projects/Projects";
import Filter from "@/app/components/Filter/Filter";
import s from "./projects.module.scss";
import { useSearchParams } from "next/navigation";

type Project = {
  id: number;
  alias: string;
  getTypes: string | string[];
  getYears: string | string[];
  main_screen: {
    preview_text: string;
    image: string;
  };
};

type FiltersData = {
  types: string[];
  years: string[];
};

type Props = {
  projects: Project[];
  filtersData: FiltersData;
};

export default function ProjectsPageClient({ projects, filtersData }: Props) {
  const searchParams = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // Начальное состояние — пустой массив
  const [filters, setFilters] = useState<{ type: string | null; year: string | null }>({
    type: null,
    year: null,
  });

  const [isFormFiltered, setIsFormFiltered] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true)
  }, [])

  // Применяем фильтры при изменении filters или projects
  useEffect(() => {
    const type = searchParams?.get("type") ? decodeURIComponent(searchParams.get("type") as string) : null;
    const year = searchParams?.get("year") ? decodeURIComponent(searchParams.get("year") as string) : null;

    setFilters({ type, year });

    const filtered = projects.filter((project) => {
      const projectTypes = Array.isArray(project.getTypes) ? project.getTypes : [project.getTypes];
      const projectYears = Array.isArray(project.getYears) ? project.getYears : [project.getYears];

      return (
        (!type || projectTypes.includes(type)) &&
        (!year || projectYears.includes(year))
      );
    });

    setFilteredProjects(filtered);
  }, [searchParams?.toString(), projects]);

  useEffect( () => {

    if ( isFormFiltered ) {

      const filtered = projects.filter((project) => {
        const projectTypes = Array.isArray(project.getTypes) ? project.getTypes : [project.getTypes];
        const projectYears = Array.isArray(project.getYears) ? project.getYears : [project.getYears];

        return (
          (!filters.type || projectTypes.includes(filters.type)) &&
          (!filters.year || projectYears.includes(filters.year))
        );
      });

      setFilteredProjects(filtered);

    }

  }, [filters, isFormFiltered] )

  return (
    <>
      <Filter
        filtersData={filtersData}
        onFilterChange={setFilters}
        filteredEvent={setIsFormFiltered}
        initialType={filters.type}
        initialYear={filters.year}
      />

      {isLoad && <Projects classes={s.projectsPage} projects={filteredProjects} />}
    </>
  );
}