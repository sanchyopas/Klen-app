"use client";
import React, {useState, useEffect, useRef, useMemo} from "react";
import s from "./filter.module.scss";

type Subcategory = {
  id: string;
  slug: string;
  title: string;
};

type Category = {
  id: string;
  slug: string;
  title: string;
  subcategories?: Subcategory[];
};

export type FilterValues = {
  type: string | null;
  year: string | null;
  category: string | null;
  subcategory: string | null;
};

type FilterProps = {
  filtersData: {
    categories?: Category[];
  },
  onFilterChange: (filters: FilterValues) => void,
  // type и year не выводятся кнопками, но приходят из query-параметров со страницы проекта
  initialType?: string | null,
  initialYear?: string | null,
  initialCategory?: string | null,
  initialSubcategory?: string | null,
  filteredEvent?: (value: (((prevState: boolean) => boolean) | boolean)) => void
};

const Filter: React.FC<FilterProps> = ({
  filtersData,
  onFilterChange,
  initialType,
  initialYear,
  initialCategory,
  initialSubcategory,
  filteredEvent
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(initialType || null);
  const [selectedYear, setSelectedYear] = useState<string | null>(initialYear || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory || null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  // Натуральная высота списка подкатегорий каждой категории (не только открытой) —
  // нужна и десктопу (padding-bottom под абсолютный список), и мобильному
  // аккордеону (анимация max-height от 0 до реальной высоты)
  const [dropHeights, setDropHeights] = useState<Record<string, number>>({});
  const dropListRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Рефы для filterDropList

  const categories = useMemo<Category[]>(() => filtersData.categories || [], [filtersData.categories]);
  const categoriesWithSubcategories = useMemo(
    () => categories.filter((category) => category.subcategories?.length),
    [categories]
  );

  const hasSelection = Boolean(selectedType || selectedYear || selectedCategory || selectedSubcategory);

  // Обновляем состояние при изменении initial-значений
  useEffect(() => {
    if (initialType !== undefined) {
      setSelectedType(initialType);
    }
    if (initialYear !== undefined) {
      setSelectedYear(initialYear);
    }
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory);
    }
    if (initialSubcategory !== undefined) {
      setSelectedSubcategory(initialSubcategory);
    }
  }, [initialType, initialYear, initialCategory, initialSubcategory]);

  // Пришли по ссылке с фильтром — раскрываем подкатегории выбранной категории,
  // иначе отмеченную сабкатегорию не видно
  useEffect(() => {
    if (!initialCategory) {
      return;
    }

    const category = categories.find((item) => item.slug === initialCategory);

    if (category?.subcategories?.length) {
      setOpenCategory(initialCategory);
    }
  }, [initialCategory, categories]);

  useEffect(() => {
    onFilterChange({
      type: selectedType,
      year: selectedYear,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    });
  }, [selectedType, selectedYear, selectedCategory, selectedSubcategory, onFilterChange]);

  // Следим за естественной высотой каждого списка подкатегорий (даже закрытого) —
  // scrollHeight не зависит от max-height/overflow, поэтому измеряется корректно
  useEffect(() => {
    const nodes = categoriesWithSubcategories
      .map((category) => dropListRefs.current[category.slug])
      .filter((node): node is HTMLDivElement => Boolean(node));

    if (nodes.length === 0) {
      return;
    }

    const measure = () => {
      setDropHeights((prev) => {
        const next = { ...prev };
        let changed = false;

        categoriesWithSubcategories.forEach((category) => {
          const node = dropListRefs.current[category.slug];
          const height = node ? node.scrollHeight : 0;

          if (next[category.slug] !== height) {
            next[category.slug] = height;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [categoriesWithSubcategories]);

  // Десктопный список подкатегорий позиционирован absolute и не раздвигает
  // строку фильтров сам — резервируем место под открытую категорию вручную
  const paddingBottom = openCategory ? dropHeights[openCategory] ?? 0 : 0;

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedYear(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setOpenCategory(null);

    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  // Клик по неактивной категории делает её активной и раскрывает сабкатегории.
  // Повторный клик по уже активной категории не сбрасывает выбор —
  // только переключает видимость её сабменю
  const handleCategoryClick = (category: Category) => {
    const isActive = selectedCategory === category.slug;
    const hasSubcategories = Boolean(category.subcategories?.length);

    if (isActive) {
      if (hasSubcategories) {
        setOpenCategory((current) => (current === category.slug ? null : category.slug));
      }
      return;
    }

    setSelectedCategory(category.slug);
    setSelectedSubcategory(null);
    setOpenCategory(hasSubcategories ? category.slug : null);

    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  // Клик по уже выбранной сабкатегории её не снимает — сброс только через «Все»
  const handleSubcategoryClick = (subcategory: Subcategory) => {
    if (selectedSubcategory === subcategory.slug) {
      return;
    }

    setSelectedSubcategory(subcategory.slug);

    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  // Пункт «Все» внутри категории: показываем всю категорию без уточнения подкатегорией
  const handleAllSubcategoriesClick = () => {
    setSelectedSubcategory(null);

    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  const setDropListRef = (slug: string) => (node: HTMLDivElement | null) => {
    dropListRefs.current[slug] = node;
  };

  return (
    <div className={s.filter}>
      <div className="container">
        <div
          className={s.filterList}
          style={{paddingBottom: `${paddingBottom}px`}} // Динамический padding-bottom
        >
          <button
            onClick={handleResetFilters}
            className={`${s.resetButton} ${!hasSelection ? s.selected : ""}`}
          >
            Все
          </button>

          {categories.map((category) => {
            const hasSubcategories = Boolean(category.subcategories?.length);

            return (
              // На десктопе обёртка невидима для раскладки (display: contents) —
              // кнопка и список подкатегорий ведут себя как прямые flex-элементы
              // .filterList, как и раньше. На мобильном это аккордеон: обёртка
              // не участвует в layout, а кнопка со своим списком идут подряд
              // друг за другом в колонке — то есть каждая категория с новой строки
              <div key={category.slug} className={s.filterCategory}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`${s.filterButton} ${openCategory === category.slug ? s.open : ""} ${selectedCategory === category.slug ? s.selected : ""}`}
                >
                  {category.title}
                </button>

                {hasSubcategories && (
                  <div
                    className={`${s.filterDropList} ${openCategory === category.slug ? s.open : ""}`}
                    style={{"--drop-height": `${dropHeights[category.slug] ?? 0}px`} as React.CSSProperties}
                  >
                    {/* Замеряем именно эту обёртку, а не filterDropList — у него самого
                        на мобильном max-height:0, и scrollHeight внутри flex-контейнера
                        с overflow:hidden считался бы уже схлопнутым */}
                    <div ref={setDropListRef(category.slug)} className={s.filterDropListInner}>
                      <label className={s.filterItem}>
                        <input
                          type="checkbox"
                          name={`subcategory-${category.slug}`}
                          checked={!selectedSubcategory}
                          onChange={handleAllSubcategoriesClick}
                        />
                        <div>Все</div>
                      </label>

                      {(category.subcategories || []).map((subcategory) => (
                        <label key={subcategory.slug} className={s.filterItem}>
                          <input
                            type="checkbox"
                            name={`subcategory-${category.slug}`}
                            checked={selectedSubcategory === subcategory.slug}
                            onChange={() => handleSubcategoryClick(subcategory)}
                          />
                          <div>{subcategory.title}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
