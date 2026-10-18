type Taxonomy = {
  id: string;
  slug: string;
  title: string;
};

export type ProjectListItem = {
  id: number;
  alias: string;
  order?: number;
  category?: Taxonomy | null;
  subcategories?: Taxonomy[] | Taxonomy | null;
  // Основная подкатегория, если её начнёт отдавать API; иначе основной считается первая
  primary_subcategory?: Taxonomy | null;
  [key: string]: any;
};

export type ProjectsContext = {
  category: string | null;
  subcategory: string | null;
};

const subcategorySlugs = (project: ProjectListItem) =>
  (Array.isArray(project.subcategories) ? project.subcategories : [project.subcategories])
    .map((subcategory) => subcategory?.slug)
    .filter(Boolean) as string[];

/**
 * Категория, по которой подбираются рекомендации.
 * Если на проект перешли из отфильтрованного списка — берём выбранный фильтр
 * (при условии, что проект к нему относится), иначе — основную категорию проекта.
 */
export function resolveProjectsContext(
  project: ProjectListItem,
  requested: Partial<ProjectsContext>
): ProjectsContext {
  const category = project.category?.slug || null;
  const subcategories = subcategorySlugs(project);

  const requestedCategory = requested.category && requested.category === category ? requested.category : null;
  const requestedSubcategory =
    requested.subcategory && subcategories.includes(requested.subcategory) ? requested.subcategory : null;

  if (requestedSubcategory) {
    return { category, subcategory: requestedSubcategory };
  }

  // Выбрана только головная категория — подкатегорию не сужаем
  if (requestedCategory) {
    return { category: requestedCategory, subcategory: null };
  }

  const primarySubcategory = project.primary_subcategory?.slug;

  return {
    category,
    subcategory: primarySubcategory && subcategories.includes(primarySubcategory)
      ? primarySubcategory
      : subcategories[0] || null,
  };
}

/**
 * Следующие проекты той же категории: сначала из той же подкатегории,
 * затем добираем из головной категории. Порядок — как в списке проектов,
 * начиная с проекта, идущего после текущего (по кругу).
 */
export function pickNextProjects(
  projects: ProjectListItem[],
  current: ProjectListItem,
  context: ProjectsContext,
  limit = 2
): ProjectListItem[] {
  const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const currentIndex = sorted.findIndex((project) => project.id === current.id);
  const ordered = currentIndex === -1
    ? sorted
    : [...sorted.slice(currentIndex + 1), ...sorted.slice(0, currentIndex)];
  const candidates = ordered.filter((project) => project.id !== current.id);

  const sameSubcategory = context.subcategory
    ? candidates.filter((project) => subcategorySlugs(project).includes(context.subcategory as string))
    : [];
  const sameCategory = context.category
    ? candidates.filter((project) => project.category?.slug === context.category && !sameSubcategory.includes(project))
    : [];

  return [...sameSubcategory, ...sameCategory].slice(0, limit);
}

export function contextToQuery(context: Partial<ProjectsContext>) {
  const params = new URLSearchParams();

  if (context.category) params.set("category", context.category);
  if (context.subcategory) params.set("subcategory", context.subcategory);

  return params.toString();
}
