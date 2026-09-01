"use client";
import { useState, useEffect } from "react";
import Projects from "@/app/components/Projects/Projects";
import Filter, { FilterValues } from "@/app/components/Filter/Filter";
import s from "./projects.module.scss";
import { useSearchParams } from "next/navigation";

type Taxonomy = {
  id: string;
  slug: string;
  title: string;
};

type Project = {
  id: number;
  alias: string;
  getTypes: string | string[];
  getYears: string | string[];
  main_screen: {
    preview_text: string;
    image: string;
  };
  category?: Taxonomy | null;
  subcategories?: Taxonomy[];
};

type FiltersData = {
  categories?: (Taxonomy & { subcategories?: Taxonomy[] })[];
};

type Props = {
  projects: Project[];
  filtersData: FiltersData;
};

const matchesFilters = (project: Project, filters: FilterValues) => {
  const projectTypes = Array.isArray(project.getTypes) ? project.getTypes : [project.getTypes];
  const projectYears = Array.isArray(project.getYears) ? project.getYears : [project.getYears];
  const projectCategory = project.category?.slug || null;
  const projectSubcategories = (project.subcategories || []).map((subcategory) => subcategory.slug);

  return (
    (!filters.type || projectTypes.includes(filters.type)) &&
    (!filters.year || projectYears.includes(filters.year)) &&
    (!filters.category || projectCategory === filters.category) &&
    (!filters.subcategory || projectSubcategories.includes(filters.subcategory))
  );
};

export default function ProjectsPageClient({ projects, filtersData }: Props) {
  const searchParams = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // Начальное состояние — пустой массив
  const [filters, setFilters] = useState<FilterValues>({
    type: null,
    year: null,
    category: null,
    subcategory: null,
  });

  const [isFormFiltered, setIsFormFiltered] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true)
  }, [])

  // Применяем фильтры при изменении filters или projects
  useEffect(() => {
    const readParam = (name: string) =>
      searchParams?.get(name) ? decodeURIComponent(searchParams.get(name) as string) : null;

    const urlFilters: FilterValues = {
      type: readParam("type"),
      year: readParam("year"),
      category: readParam("category"),
      subcategory: readParam("subcategory"),
    };

    setFilters(urlFilters);
    setFilteredProjects(projects.filter((project) => matchesFilters(project, urlFilters)));
  }, [searchParams?.toString(), projects]);

  useEffect( () => {

    if ( isFormFiltered ) {

      setFilteredProjects(projects.filter((project) => matchesFilters(project, filters)));

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
        initialCategory={filters.category}
        initialSubcategory={filters.subcategory}
      />

      {isLoad && <Projects classes={s.projectsPage} projects={filteredProjects} />}
    </>
  );
}
