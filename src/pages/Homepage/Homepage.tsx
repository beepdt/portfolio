import { Intro } from "@/components/reusable/Intro";
import { Navbar } from "@/components/reusable/Navbar";
import { Contact } from "@/components/reusable/Contact";
import { useState, useEffect, useRef } from "react";
import ReactLenis, { useLenis } from "lenis/react";
import { NewProjects } from "@/components/reusable/NewProjects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const lenis = useLenis();
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && lenis) {
      lenis.scrollTo(section, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useEffect(() => {
    // Add the class on mount
    document.body.classList.add("lenis-page");

    // Remove the class on unmount
    return () => {
      document.body.classList.remove("lenis-page");
    };
  }, []);

  // Optional: Detect active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "WORK", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ScrollTrigger logic for each .projects element
    const projects = gsap.utils.toArray(".projects");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const project = entry.target as HTMLElement;
          const imgContainer = project.querySelector(
            ".img"
          ) as HTMLElement | null;

          const widthTrigger = ScrollTrigger.create({
            trigger: project,
            start: "bottom bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self: ScrollTrigger) => {
              let progress = self.progress;
              let newWidth = 30 + 70 * progress;
              gsap.to(imgContainer, {
                width: newWidth + "%",
                duration: 0.1,
                ease: "none",
              });
            },
          });

         const heightTrigger = ScrollTrigger.create({
            trigger: project,
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self: ScrollTrigger) => {
              let progress = self.progress;
              let newHeight = 150 + 300 * progress;
              gsap.to(project, {
                height: newHeight + "px",
                duration: 0.1,
                ease: "none",
              });
            },
          });
          
          scrollTriggersRef.current.push(widthTrigger, heightTrigger);
          observer.unobserve(project);
        }
      });
    };
     observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    projects.forEach((project) => {
      observerRef.current?.observe(project as Element);
    });

    // Clean up on unmount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => clearTimeout(timer)
  }, []);

  return (
    <ReactLenis root>
      <div className="h-screen w-full relative ">
      <Navbar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
      <div className="flex min-h-screen flex-col items-center justify-center pt-[32px] px-4 lg:px-12 space-y-16">
        <section id="intro" className="w-full flex  pt-24">
          <Intro
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </section>
        <section id="WORK" className="w-full  flex min-h-screen ">
          <NewProjects />
        </section>
        <section id="contact" className="contact-section">
          <Contact />
        </section>
      </div>
    </div>
    </ReactLenis>
    
  );
};

export default Homepage;
