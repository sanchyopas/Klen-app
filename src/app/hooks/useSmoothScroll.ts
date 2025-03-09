// "use client";
//
// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
//
// export function useSmoothScroll() {
//   useEffect(() => {
//     if (typeof window === "undefined") return; // SSR Fix
//
//     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
//     let smoother = ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 222,
//       effects: true,
//     });
//
//     console.log("✅ ScrollSmoother активирован", smoother);
//
//     return () => {
//       smoother.kill();
//       console.log("🛑 ScrollSmoother уничтожен");
//     };
//   }, []);
// }
