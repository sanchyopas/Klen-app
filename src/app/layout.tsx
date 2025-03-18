import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import PreloaderWrapper from "@/app/components/Preloader/PreloaderWrapper";
import SmoothScroll from "@/app/components/SmoothScroll/SmoothScroll";
import Cookie from "@/app/components/Cookie/Cookie";


const InterSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

async function getGlobalSettings() {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/globals`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`Ошибка загрузки глобальных данных: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: "KLЁN — architectural bureau",
  description: "",
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
  const res = await getGlobalSettings();

  return (
    <html lang="en">
    <body className={InterSans.variable}>
      {/*<div id="serverData">*/}
      {/*  {children}*/}
      {/*</div>*/}
      <PreloaderWrapper object={res?.object?.header || null}>{children}</PreloaderWrapper>
    {/*<Header/>*/}
    {/*<main>*/}
    {/*<SmoothScroll>{children}</SmoothScroll>*/}
    {/*</main>*/}
    {/*<Footer/>*/}
    {/*<Cookie/>*/}
    </body>
    </html>
  );
}
