import { ArrowRight, ExternalLink, Github } from "lucide-react";
import CopyChars from "./CopyChars";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
import { useEffect } from "react";
import Copy from "./Copy";
export const NewProjects = () => {
  const navigate = useNavigate();

  {
    /*Scroll Effect */
  }

  return (
    <div className="w-full project-container">
      <div className="flex items-center space-x-16  justify-between">
        <CopyChars delay={0.1}>
          <h1 className="font-newake text-[36px] sm:text-[4rem] lg:text-[6rem] xl:text-[10rem] leading-none whitespace-nowrap">
            Featu<span className="font-nohemi text-[#0077FF]">r</span>e Projects
          </h1>
        </CopyChars>

        <div
          onClick={() => navigate("/projects")}
          className="font-generalbold items-center justify-center rounded-full w-full md:w-auto md:rounded-full p-4 cursor-pointer hover:underline transition-colors duration-300 text-[#f5f5f5] whitespace-nowrap"
        >
          <h1 className="hidden md:flex items-center justify-center text-center">
            All Projects
            <ArrowRight className="ml-2" />
          </h1>
          <h1 className="md:hidden items-center flex justify-center text-center">
            All
            <ArrowRight className="ml-2" />
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        {/*Project 1 */}
        <div className="projects">
          <div className="project-items-info">
            <Copy delay={0.1}>
              <h1 className="font-generalbold text-[36px]">
                Yapper - Social Media
              </h1>
            </Copy>
            <Copy delay={0.1}>
              <p className="font-generalmed text-[16px] hidden sm:flex">
                A full-stack social app with React, Tailwind, Node.js, Express,
                and MongoDB. Integrated REST APIs for posts, search, profiles,
                and friend requests with real-time chat and groups via
                Socket.io.
              </p>
              <p className="font-generalmed text-[16px] flex sm:hidden">
                Full-stack social app with React, Node.js, Express, and MongoDB.
                REST APIs for posts, search, profiles, and friend requests with
                real-time chat and groups via Socket.io.
              </p>
            </Copy>

            <div className="flex gap-2">
              <Button
                variant="link"
                className="font-generalmed cursor-pointer text-white"
              >
                <a
                  href="https://yapperapp.netlify.app/"
                  className="flex gap-2 items-center"
                >
                  Link
                  <ExternalLink />
                </a>
              </Button>
              <Button
                variant="outline"
                className="font-generalmed cursor-pointer bg-transparent"
              >
                <a
                  href="https://github.com/beepdt/Chat_App"
                  className="flex gap-2 items-center"
                >
                  <Github />
                  Github
                </a>
              </Button>
            </div>
          </div>
          <div className="project-items-img">
            <div className="img">
              <img src="./app_1_5.png" alt="" />
            </div>
          </div>
        </div>
        {/*project 2 */}
        <div className="projects">
          <div className="project-items-info">
            <Copy delay={0.1}>
              <h1 className="font-generalbold text-[36px]">Resume Builder</h1>
            </Copy>
            <Copy delay={0.1}>
              <p className="font-generalmed text-[16px]">
                A full-stack web application built with Next.js and Supabase
                that allows users to create, edit, and manage professional
                resumes. Features include real-time autosave, PDF export, and an
                integrated ATS score checker to optimize resumes for job
                applications.
              </p>
            </Copy>
            <div className="flex gap-2">
              <Button
                variant="link"
                disabled={true}
                className="font-generalmed cursor-pointer text-white"
              >
                Link
                <ExternalLink />
              </Button>
              <Button
                variant="outline"
                className="font-generalmed cursor-pointer bg-transparent"
              >
                <a
                  href="https://github.com/beepdt/Ai-Resume-Builder"
                  className="flex gap-2 items-center"
                >
                  <Github />
                  Github
                </a>
              </Button>
            </div>
          </div>
          <div className="project-items-img">
            <div className="img">
              <img src="./res.png" alt="" />
            </div>
          </div>
        </div>
        {/*project 3 */}
        <div className="projects">
          <div className="project-items-info">
            <Copy delay={0.1}>
              <h1 className="font-generalbold text-[36px]">
                Scribbl - Note Taker
              </h1>
            </Copy>
            <Copy delay={0.1}>
              <p className="font-generalmed text-[16px]">
                A modern Android note-taking app featuring category
                organization, bookmarking, and light/dark mode support. Built
                with RoomDB for local data persistence, it offers a smooth and
                responsive offline experience with a clean, user-friendly UI
              </p>
            </Copy>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="font-generalmed cursor-pointer bg-transparent"
              >
                <a
                  href="https://github.com/beepdt/Notes_App"
                  className="flex gap-2 items-center"
                >
                  <Github />
                  Github
                </a>
              </Button>
            </div>
          </div>
          <div className="project-items-img">
            <div className="img">
              <img src="./scribbl.png" alt="" />
            </div>
          </div>
        </div>
        {/*project 4 */}
        <div className="projects">
          <div className="project-items-info">
            <Copy delay={0.1}>
              <h1 className="font-generalbold text-[36px]">
                Android Calculator
              </h1>
            </Copy>
            <Copy delay={0.1}>
              <p className="font-generalmed text-[16px]">
                An Android calculator app with a custom-designed UI, built using
                MVVM architecture. Implements the Shunting Yard Algorithm for
                accurate expression parsing and evaluation, ensuring reliable
                calculation of complex arithmetic expressions
              </p>
            </Copy>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="font-generalmed cursor-pointer bg-transparent"
              >
                <a
                  href="https://github.com/beepdt/CalculatorApp"
                  className="flex gap-2 items-center"
                >
                  <Github />
                  Github
                </a>
              </Button>
            </div>
          </div>
          <div className="project-items-img">
            <div className="img">
              <img src="./calc.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
