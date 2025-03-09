"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Preloader from "./Preloader";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { gsap } from "gsap";

// Создаем контекст загрузки
const LoadingContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

// Хук для использования состояния загрузки в других компонентах
export const useLoading = () => useContext(LoadingContext);

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 3000); // Симуляция загрузки (замени на реальную)
  }, []);

  useEffect(() => {
    if (isLoaded) {
      gsap.fromTo(
        "main",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [isLoaded]);

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {isLoaded ? (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      ) : (
        <Preloader />
      )}
    </LoadingContext.Provider>
  );
}
