"use client";
import { useState, useEffect } from "react";
import Projects from "@/app/components/Projects/Projects";
import Filter from "@/app/components/Filter/Filter";
import s from "./projects.module.scss";
import { useSearchParams } from "next/navigation";

type Project = {
  id: number;
  alias: string;
  getTypes: string;
  getYears: string;
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
  const [initialType, setInitialType] = useState<string | null>(null);
  const [initialYear, setInitialYear] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [filters, setFilters] = useState<{ type: string | null; year: string | null }>({
    type: null,
    year: null,
  });

  useEffect(() => {
    // Проверяем, что searchParams не равен null
    if (searchParams) {
      const type = searchParams.get("type"); // Получаем значение type из URL
      const year = searchParams.get("year"); // Получаем значение year из URL

      if (type) {
        setInitialType(type); // Устанавливаем начальное значение для type
      }
      if (year) {
        setInitialYear(year); // Устанавливаем начальное значение для year
      }

      setFilters({
        type: searchParams.get("type"),
        year: searchParams.get("year"),
      });
    }
  }, [searchParams]); // Добавляем searchParams в зависимости useEffect

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
      <Filter
        filtersData={filtersData}
        onFilterChange={setFilters}
        initialType={initialType} // Передаем начальное значение type
        initialYear={initialYear} // Передаем начальное значение year
      />
      <Projects classes={s.projectsPage} projects={filteredProjects} />
    </>
  );
}