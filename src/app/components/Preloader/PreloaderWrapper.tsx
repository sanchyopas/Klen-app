"use client";

import {useState, useEffect, createContext, useContext} from "react";
import Preloader from "./Preloader";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import {gsap} from "gsap";
import {ModalProvider} from "@/app/components/Modal/ModalContext";
import {Modal} from "@/app/components/Modal/Modal";
import Cookie from "@/app/components/Cookie/Cookie";

type PreloaderWrapperProps = {
  children: React.ReactNode;
  object: any;
}

const LoadingContext = createContext<{ isLoaded: boolean }>({isLoaded: false});

export const useLoading = () => useContext(LoadingContext);

export default function PreloaderWrapper({children, object}: PreloaderWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2700);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      gsap.fromTo(
        "main",
        {opacity: 0, y: 50},
        {opacity: 1, y: 0, duration: 1, ease: "power3.out"}
      );
    }
  }, [isLoaded]);

  return (
    <LoadingContext.Provider value={{isLoaded}}>
      {isLoaded ? (
        <>
          <ModalProvider>
            <Header headerData={object}/>
            <main>{children}</main>
            <Footer/>
            <Modal />
          </ModalProvider>
          <Cookie/>
        </>
      ) : (
        <Preloader/>
      )}
    </LoadingContext.Provider>
  );
}
