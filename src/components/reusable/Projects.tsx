import { useEffect, useRef, useState } from "react";
import image1 from "@/assets/img/app_1_1.png";
import image2 from "@/assets/img/app_1_2.png";
import image3 from "@/assets/img/app_1_3.png";
import video1 from "@/assets/videos/5_25_2025_20_55_13_contentcore.xyz.webm"
import { HoverCard } from "./HoverCard";
import { motion } from "motion/react"
import { useNavigate } from "react-router";
import Copy from "./Copy";
import CopyChars from "./CopyChars";
const projects = [
  {
    id: 1,
    title: "Yapper - a Social Media App",
    image: image1,
    video: video1,
  },
  {
    id: 2,
    title: "Yapper - a Social Media App",
    image: image2,
    video: video1,
  },
  {
    id: 3,
    title: "Yapper - a Social Media App",
    image: image3,
    video: video1,
  },
];

export const Projects = () => {
  const navigate = useNavigate();
  const [hovered, sethovered] = useState<{ row: number; col: number } | null>(
    null
  );
  const [colCount, setColCount] = useState( typeof window !== 'undefined' && window.innerWidth < 1350 ? 1 : 3); //1 column for mobile 2 for larger screens

  const containerRef = useRef<HTMLDivElement>(null);

  const rowCount = 1;

  useEffect(() => {
    const handleResize = () => {
      setColCount(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRow = () => {
    if (hovered === null) {
      return Array.from({ length: rowCount }, () => "1fr").join(" ");
    }
    return Array.from({ length: rowCount }, (_, r) =>
      r === hovered.row ? "1.5fr" : "0.5fr"
    ).join(" ");
  };

  const getCol = () => {
    if (hovered === null) {
      return Array.from({ length: colCount }, () => "1fr").join(" ");
    }

    return Array.from({ length: colCount }, (_, c) =>
      c === hovered.col ? "2fr" : "0.5fr"
    ).join(" ");
  };

  return (
    <div className="w-full ">
      <div className="flex items-center space-x-16  justify-between">
        <CopyChars delay={0.1}>
          <h1 className="font-newake text-[36px] sm:text-[4rem] lg:text-[6rem] xl:text-[10rem] leading-none whitespace-nowrap">
          Featu<span className="font-nohemi text-[#0077FF]">r</span>e Projects 
        </h1>
        </CopyChars>
        
        <div
        onClick={()=> navigate("/projects")}
        className="font-generalbold items-center justify-center rounded-full w-full md:w-auto md:rounded-full p-4 cursor-pointer bg-[#0077FF]/80 hover:bg-[#0077FF] transition-colors duration-300 text-[#f5f5f5] whitespace-nowrap">
          <h1 className="hidden md:flex items-center justify-center text-center">All Projects</h1>
          <h1 className="md:hidden items-center justify-center text-center">All</h1>
        </div>
      </div>
      <div
        className=" grid gap-2 min-h-[640px]"
        style={{
          gridTemplateRows: getRow(),
          gridTemplateColumns: getCol(),
          transition:
            "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {projects.map((project, index) => {
          const row = Math.floor(index / colCount);
          const col = index % colCount;
          return (
            <motion.div
              key={project.id}
              className="relative overflow-hidden rounded-lg cursor-pointer "
              onMouseEnter={() => sethovered({ row, col })}
              onMouseLeave={() => sethovered(null)}
            >
              <HoverCard
                video={project.video}
                image={project.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                mediaSize={1}
                onMediaSizeChange={() => {}}
                label={project.title}
                isHovered={hovered?.row === row && hovered?.col === col}
                autoplay="hover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
