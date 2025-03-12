"use client"
import React, { useState } from "react";
import s from "./filter.module.scss"
import ButtonWithWrapper from "@/app/components/Button/Button";

const Filter = () => {
  // Состояние для управления выбранными фильтрами
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<"type" | "year" | null>(null);

  // Списки фильтров
  const types = ["Мастерплан", "Жилые комплексы", "Общественные здания"];
  const years = ["2022", "2023", "2024", "2025"];

  // Обработчик клика на "Все"
  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedYear(null);
    setOpenFilter(null); // Закрываем все фильтры
  };

  // Обработчик клика на фильтр типа проекта
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  // Обработчик клика на фильтр периода
  const handleYearClick = (year: string) => {
    setSelectedYear(year);
  };

  // Обработчик открытия/закрытия фильтров
  const handleFilterToggle = (filter: "type" | "year") => {
    if (openFilter === filter) {
      setOpenFilter(null); // Закрываем текущий фильтр, если он уже открыт
    } else {
      setOpenFilter(filter); // Открываем выбранный фильтр
    }
  };

  // Проверка, что все фильтры сброшены
  const isAllFiltersEmpty = selectedType === null && selectedYear === null;

  return (
    <>
      <div className={s.filter}>
        <div className="container">
          <div className={s.filterList}>
            {/* Кнопка "Все" */}
            <button
              onClick={handleResetFilters}
              className={`${s.resetButton} ${isAllFiltersEmpty ? s.selected : ""}`}
            >
              Все
            </button>

            {/* Фильтр по типу проекта */}
            <button
              onClick={() => handleFilterToggle("type")}
              className={`${s.filterButton} ${openFilter === "type" ? s.open : ""} ${
                selectedType ? s.selected : ""
              }`}
            >
              Тип проекта
            </button>

            {/* Фильтр по периоду */}
            <button
              onClick={() => handleFilterToggle("year")}
              className={`${s.filterButton} ${openFilter === "year" ? s.open : ""} ${
                selectedYear ? s.selected : ""
              }`}
            >
              Период
            </button>

            {/* Список фильтров по типу проекта */}
            {openFilter === "type" && (
              <div className={s.filterDropList}>
                {types.map((type) => (
                  <label key={type} className={s.filterItem}>
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type}
                      onChange={() => handleTypeClick(type)}
                    />
                    <div>
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Список фильтров по периоду */}
            {openFilter === "year" && (
              <div className={s.filterDropList}>
                {years.map((year) => (
                  <label key={year} className={s.filterItem}>
                    <input
                      type="radio"
                      name="year"
                      checked={selectedYear === year}
                      onChange={() => handleYearClick(year)}
                    />
                    <div>
                      {year}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Отображение выбранных фильтров */}
      {/*<div className={s.selectedFilters}>*/}
      {/*  <p>*/}
      {/*    Тип проекта: {selectedType || "Не выбрано"}*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    Период: {selectedYear || "Не выбрано"}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </>
  );
};

export default Filter;