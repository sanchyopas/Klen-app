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
  const [paddingBottom, setPaddingBottom] = useState<number>(0); // Состояние для padding-bottom
  const dropListRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Рефы для filterDropList

  const categories = useMemo<Category[]>(() => filtersData.categories || [], [filtersData.categories]);

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

  useEffect(() => {
    onFilterChange({
      type: selectedType,
      year: selectedYear,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    });
  }, [selectedType, selectedYear, selectedCategory, selectedSubcategory, onFilterChange]);

  // Эффект для обновления padding-bottom при открытии filterDropList
  useEffect(() => {
    const dropList = openCategory ? dropListRefs.current[openCategory] : null;

    if (!dropList) {
      setPaddingBottom(0); // Сбрасываем padding-bottom, если список подкатегорий закрыт
      return;
    }

    // Следим за высотой открытого списка: она зависит от числа переносов строк
    const updatePadding = () => setPaddingBottom(dropList.offsetHeight);

    updatePadding();

    const observer = new ResizeObserver(updatePadding);
    observer.observe(dropList);

    return () => observer.disconnect();
  }, [openCategory]);

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

  // Клик по категории: выбирает её и раскрывает связанные подкатегории
  const handleCategoryClick = (category: Category) => {
    const isActive = selectedCategory === category.slug;
    const hasSubcategories = Boolean(category.subcategories?.length);

    setSelectedCategory(isActive ? null : category.slug);
    setSelectedSubcategory(null);
    setOpenCategory(isActive || !hasSubcategories ? null : category.slug);

    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    setSelectedSubcategory(selectedSubcategory === subcategory.slug ? null : subcategory.slug);

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

          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className={`${s.filterButton} ${openCategory === category.slug ? s.open : ""} ${selectedCategory === category.slug ? s.selected : ""}`}
            >
              {category.title}
            </button>
          ))}

          {categories
            .filter((category) => category.subcategories?.length)
            .map((category) => (
              <div
                key={category.slug}
                ref={setDropListRef(category.slug)}
                className={`${s.filterDropList} ${openCategory === category.slug ? s.open : ""}`}
              >
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
