import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import Copy from "@/components/reusable/Copy";
import { useCallback, useEffect, useRef } from "react";
import CopyChars from "./CopyChars";



interface NavbarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}
//@ts-ignore
export const Intro = ({ activeSection, onSectionClick }: NavbarProps) => {
  const navigate = useNavigate();
  const sections = [{ id: "contact", label: "CONTACT" }];

  const socialLinks = [
    {
      icon: <Github className="lg:size-[32px]" />,
      href: "https://github.com/beepdt",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="lg:size-[32px]" />,
      href: "https://linkedin.com/in/deeptangshu",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="lg:size-[32px] " />,
      href: "mailto:info.deeptangshu@gmail.com",
      label: "Email",
    },
    {
      icon: <FileText className="lg:size-[32px]" />,
      href: "/resume.pdf",
      label: "Resume",
      // download: true, // Removed to open PDF directly
    },
  ];

  //Animating tiles
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const handleMouseLeave = useCallback(() => {
    const highlight = highlightRef.current;
    if (highlight) {
      highlight.style.opacity = "0";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const highlight = highlightRef.current;
    if (highlight) {
      highlight.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    const gridItems = container?.querySelectorAll(".grid-item");
    const firstItem = container?.querySelector(".grid-item");

    const highlightColors = [
      "#2400F2", // More vibrant & darker cyan-blue
      "#FF4C00", // Stronger & deeper orange
      "#009CFF", // Vivid sky blue
      "#C0305C", // Deep saturated rose
      "#E6C800", // Darker bright yellow (better for white text)
      "#D93AAE", // Bold vibrant pink
      "#F2784B", // Rich warm coral
      "#A885A8", // Saturated dusty lavender
      "#FF5E4D", // High-contrast peachy red
      "#E6AD7C", // Muted but warmer light brown
      "#D68641", // Bold golden brown
      "#FF8A00", // High-energy orange-yellow
    ];

    gridItems?.forEach((item, index) => {
      (item as HTMLElement).dataset.color =
        highlightColors[index % highlightColors.length];
    });

    const moveToElement = (element: HTMLElement) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container?.getBoundingClientRect();

        if (highlight && containerRect) {
          highlight.style.transform = `translate(${
            rect.left - containerRect.left
          }px, ${rect.top - containerRect.top}px)`;
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = `${rect.height}px`;
          highlight.style.backgroundColor = element.dataset.color || "";
        }
      }
    };
    const moveHighlight = (e: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

      if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
        moveToElement(hoveredElement as HTMLElement);
      } else if (
        hoveredElement &&
        hoveredElement.parentElement &&
        hoveredElement.parentElement.classList.contains("grid-item")
      ) {
        moveToElement(hoveredElement.parentElement);
      }
    };

    if (firstItem instanceof HTMLElement) {
      moveToElement(firstItem);
    }

    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mousemove", moveHighlight);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container?.removeEventListener("mousemove", moveHighlight);
      container?.removeEventListener("mouseleave", handleMouseLeave);
      container?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div className="w-full ">
      <div className="text-center leading-none ml-auto   ">
        <CopyChars delay={0.5}>
          <h1 className="font-newake  text-[48px] sm:text-[4rem] md:text-[7.2rem] lg:text-[9.1rem] xl:text-[14rem] leading-none  ">
            Deept
            <span className="font-nohemi  leading-none text-[#0077FF]">a</span>
            ngshu.
          </h1>
        </CopyChars>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  w-full  gap-8 relative">
        {/*Left Grid */}
        <div className=" justify-center grid-span-1 w-full space-y-4 ">
          <div className=" py-4 md:pt-24 xl:w-xl  text-left mr-auto leading-none">
            <Copy delay={0.5}>
              <p className="font-generalmed text-right tracking-wide lg:tracking-normal md:text-[1.8rem] lg:text-[1.8rem] ">
                I am a full stack developer building modern web and mobile
                applications with a focus on user experience, performance, and
                scalability.
              </p>
            </Copy>
          </div>

          <div className="flex pt-[8px] lg:pt-[48px] gap-2 xl:w-xl xl:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                
                aria-label={link.label}
              >
                <div className="flex cursor-pointer items-center justify-center  hover:text-[#1e1e1e] transition-colors border rounded-full p-4 hover:bg-[#f5f5f5] xl:size-24">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
          <div className="space-x-2 text-left flex pt-[12px] items-end justify-start">
            <div
              onClick={() => navigate("/projects")}
              className="cursor-pointer justify-between font-generalmed flex border  rounded-full p-4 hover:bg-[#0736FE] hover:border-[#0736FE] hover:text-background transition-colors xl:w-80"
            >
              PROJECTS
              <ArrowUpRight />
            </div>

            <div
              key={sections[0].id}
              onClick={() => onSectionClick(sections[0].id)}
              className="cursor-pointer font-generalmed border  rounded-full p-4 hover:bg-foreground hover:text-background transition-colors xl:w-64"
            >
              CONTACT
            </div>
          </div>
        </div>

        {/*Right Grid */}
        <div
          className="relative gap-2 hidden lg:grid w-full  lg:grid-cols-4 anim-container"
          ref={containerRef}
        >
          <div className=" gap-2 grid">
            <div className="border-2 border-gray-800 rounded-lg grid-item shadow-sm">
              <p className="font-integral ">Javascript</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Next.js</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Express.Js</p>
            </div>
          </div>
          <div className="gap-2 grid">
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>React</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Typescript</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Git</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Supabase</p>
            </div>
          </div>
          <div className="gap-2 grid">
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Kotlin</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Firebase</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>Android Studio</p>
            </div>
          </div>
          <div className="gap-2 grid">
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>MongoDB</p>
            </div>
            <div className="border-2 font-integral border-gray-800 rounded-lg grid-item shadow-sm">
              <p>PostgreSQL</p>
            </div>
          </div>
          <div className="highlight" ref={highlightRef}></div>
        </div>
      </div>
    </div>
  );
};
