"use client";
import React, {useState, useEffect, useRef} from "react";
import s from "./filter.module.scss";

type FilterProps = {
  filtersData: {
    types: string[];
    years: string[];
  },
  onFilterChange: (filters: { type: string | null; year: string | null }) => void,
  initialType?: string | null,
  initialYear?: string | null,
  filteredEvent?: (value: (((prevState: boolean) => boolean) | boolean)) => void
};

const Filter: React.FC<FilterProps> = ({filtersData, onFilterChange, initialType, initialYear, filteredEvent}) => {
  const [selectedType, setSelectedType] = useState<string | null>(initialType || null);
  const [selectedYear, setSelectedYear] = useState<string | null>(initialYear || null);
  const [openFilter, setOpenFilter] = useState<"type" | "year" | null>(null);
  const [paddingBottom, setPaddingBottom] = useState<number>(0); // Состояние для padding-bottom
  const typeDropListRef = useRef<HTMLDivElement | null>(null); // Реф для filterDropList (тип)
  const yearDropListRef = useRef<HTMLDivElement | null>(null); // Реф для filterDropList (год)

  // Обновляем состояние при изменении initialType или initialYear
  useEffect(() => {
    if (initialType !== undefined) {
      setSelectedType(initialType);
    }
    if (initialYear !== undefined) {
      setSelectedYear(initialYear);
    }
  }, [initialType, initialYear]);

  useEffect(() => {
    onFilterChange({type: selectedType, year: selectedYear});
  }, [selectedType, selectedYear, onFilterChange]);

  // Эффект для обновления padding-bottom при открытии filterDropList
  useEffect(() => {
    if (openFilter === "type" && typeDropListRef.current) {
      // Вычисляем высоту filterDropList (тип)
      const height = typeDropListRef.current.offsetHeight;
      setPaddingBottom(height); // Устанавливаем padding-bottom
    } else if (openFilter === "year" && yearDropListRef.current) {
      // Вычисляем высоту filterDropList (год)
      const height = yearDropListRef.current.offsetHeight;
      setPaddingBottom(height); // Устанавливаем padding-bottom
    } else {
      setPaddingBottom(0); // Сбрасываем padding-bottom, если фильтр закрыт
    }
  }, [openFilter]);

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedYear(null);
    setOpenFilter(null);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  const handleYearClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year);
    if (filteredEvent) {
      filteredEvent(true);
    }
  };

  const handleFilterToggle = (filter: "type" | "year") => {
    setOpenFilter(openFilter === filter ? null : filter);
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
            className={`${s.resetButton} ${!selectedType && !selectedYear ? s.selected : ""}`}
          >
            Все
          </button>

          <button
            onClick={() => handleFilterToggle("type")}
            className={`${s.filterButton} ${openFilter === "type" ? s.open : ""} ${selectedType ? s.selected : ""}`}
          >
            Тип проекта
          </button>

          <button
            onClick={() => handleFilterToggle("year")}
            className={`${s.filterButton} ${openFilter === "year" ? s.open : ""} ${selectedYear ? s.selected : ""}`}
          >
            Период
          </button>

          <div
            ref={typeDropListRef}
            className={`${s.filterDropList} ${openFilter === "type" ? s.open : ""}`}
          >
            {filtersData.types.map((type) => (
              <label key={type} className={s.filterItem}>
                <input
                  type="checkbox"
                  name="type"
                  checked={selectedType === type}
                  onChange={() => handleTypeClick(type)}
                />
                <div>{type}</div>
              </label>
            ))}
          </div>

          <div
            ref={yearDropListRef}
            className={`${s.filterDropList} ${openFilter === "year" ? s.open : ""}`}
          >
            {filtersData.years.map((year) => (
              <label key={year} className={s.filterItem}>
                <input
                  type="checkbox"
                  name="year"
                  checked={selectedYear === year}
                  onChange={() => handleYearClick(year)}
                />
                <div>{year}</div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;