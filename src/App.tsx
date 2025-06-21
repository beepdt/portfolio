import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage/Homepage";
import NewProjects from "./pages/Projectpage/NewProjects";
import { useEffect, useRef } from "react";
import  { useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const lenisRef = useRef<LenisRef>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update)
    }
  });
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element={<NewProjects />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
