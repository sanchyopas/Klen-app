"use client";
import React, { useState, useEffect } from "react";
import s from "./filter.module.scss";

type FilterProps = {
  filtersData: {
    types: string[];
    years: string[];
  };
  onFilterChange: (filters: { type: string | null; year: string | null }) => void;
  initialType?: string | null; // Начальное значение type
  initialYear?: string | null; // Начальное значение year
};

const Filter: React.FC<FilterProps> = ({ filtersData, onFilterChange, initialType, initialYear }) => {
  const [selectedType, setSelectedType] = useState<string | null>(initialType || null);
  const [selectedYear, setSelectedYear] = useState<string | null>(initialYear || null);
  const [openFilter, setOpenFilter] = useState<"type" | "year" | null>(null);

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
    onFilterChange({ type: selectedType, year: selectedYear });
  }, [selectedType, selectedYear, onFilterChange]);

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedYear(null);
    setOpenFilter(null);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const handleYearClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleFilterToggle = (filter: "type" | "year") => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className={s.filter}>
      <div className="container">
        <div className={s.filterList}>
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