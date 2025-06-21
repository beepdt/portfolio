import image1 from "./../../assets/img/app_1_1.png";
import "./projects.css";
import { galleryItems } from "./data";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import SplitType from "split-type";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon, ExternalLink, Github } from "lucide-react";
import Copy from "@/components/reusable/Copy";
import { useNavigate } from "react-router";
gsap.registerPlugin(SplitText);

const Projects = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const gallery = document.querySelector(".gallery");
    const blurryPrev = document.querySelector(".blurry-prev");
    const projectPreview = document.querySelector(".project-preview");
    const itemCount = galleryItems.length;

    let activeItemIndex = 0;
    let isAnimating = false;

    const createSplitText = (element: Element) => {
      const splitText = new SplitType(element as HTMLElement, {
        types: "lines",
      });
      element.innerHTML = "";
      splitText.lines?.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line";
        const lineSpan = document.createElement("span");
        lineSpan.textContent = line.textContent;
        lineDiv.appendChild(lineSpan);
        element.appendChild(lineDiv);
      });
    };
    const intitialInfoText = document.querySelector(".info p");
    if (intitialInfoText) {
      createSplitText(intitialInfoText);
    }

    const elementsToAnimate = document.querySelectorAll(
      ".Title h1, .info p .line span, .tech p, .links p"
    );

    gsap.fromTo(
      elementsToAnimate,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05 }
    );
    for (let i = 0; i < itemCount; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      if (i === 0) itemDiv.classList.add("active");

      const img = document.createElement("img");
      img.src = `/app_1_${i + 1}.png`;
      img.alt = galleryItems[i].title;

      itemDiv.appendChild(img);
      itemDiv.dataset.index = i.toString();
      itemDiv.addEventListener("click", () => handleItemClick(i));
      gallery?.appendChild(itemDiv);
    }

    const createElementwithClass = (tag: string, className: string) => {
      const element = document.createElement(tag);
      element.classList.add(className);
      return element;
    };
    //@ts-ignore
    const createProjectDetails = (activeItem, index) => {
      const newProjectDetails = createElementwithClass(
        "div",
        "project-details"
      );

      newProjectDetails.innerHTML = `
        <div class="project-content">
          <div class="Title">
            <h1>${activeItem.title}</h1>
          </div>
          
          <div class="info">
            <p>${activeItem.copy}</p>
          </div>
        
          <div class="tech">
            <h1 class="tech-label">Technologies</h1>
            <div class="tech-badges">
              ${activeItem.tech
                .map(
                  //@ts-ignore
                  (tech) =>
                    `<span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2 mb-2">${tech}</span>`
                )
                .join("")}
            </div>
          </div>
          
          <div class="links">
            <div class="project-links">
              ${
                activeItem.links.live
                  ? `
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-3 mb-2">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </button>
              `
                  : ""
              }
              ${
                activeItem.links.github
                  ? `
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-2">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      `;

      const newProjectImg = createElementwithClass("div", "project-img");
      const newImg = document.createElement("img");
      newImg.src = `/app_1_${index + 1}.png`;
      newImg.alt = activeItem.title;
      newProjectImg.appendChild(newImg);

      return {
        newProjectDetails,
        newProjectImg,
        infoP: newProjectDetails.querySelector(".info p"),
      };
    };
    //@ts-ignore
    const handleItemClick = (index) => {
      if (index === activeItemIndex || isAnimating) return;
      isAnimating = true;

      const activeItem = galleryItems[index];

      gallery?.children[activeItemIndex].classList.remove("active");
      gallery?.children[index].classList.add("active");
      activeItemIndex = index;

      const elementsToAnimate = document.querySelectorAll(
        ".Title h1, .info p .line span, .tech h1, .tech-badges, .project-links"
      );

      const currentProjectImg = document.querySelector(".project-img");
      const currentProjectImgElem = currentProjectImg?.querySelector("img");

      const newBlurryImg = document.createElement("img");
      newBlurryImg.src = `/app_1_${index + 1}.png`;
      newBlurryImg.alt = activeItem.title;
      gsap.set(newBlurryImg, {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });
      blurryPrev?.insertBefore(newBlurryImg, blurryPrev.firstChild);
      const currentBlurryImg = blurryPrev?.querySelector("img:nth-child(2)");
      if (currentBlurryImg) {
        gsap.to(currentBlurryImg, {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (blurryPrev) {
              blurryPrev.removeChild(currentBlurryImg);
            }
          },
        });
      }
      gsap.to(newBlurryImg, {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(elementsToAnimate, {
        y: -60,
        duration: 0.8,
        ease: "power3.in",
        stagger: 0.03,
      });

      gsap.to(currentProjectImg, {
        onStart: () => {
          if (currentProjectImgElem) {
            gsap.to(currentProjectImgElem, {
              scale: 2,
              duration: 0.8,
              ease: "power3.in",
            });
          }
        },
        scale: 0,
        bottom: "8em",
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          document.querySelector(".project-details")?.remove();
          document.querySelector(".project-img")?.remove();

          const { newProjectDetails, newProjectImg, infoP } =
            createProjectDetails(activeItem, index);
          projectPreview?.appendChild(newProjectDetails);
          projectPreview?.appendChild(newProjectImg);
          if (infoP) {
            createSplitText(infoP);
          }
          const newElementToAnimate = newProjectDetails.querySelectorAll(
            ".Title h1, .info p .line span, .tech h1, .tech-badges, .project-links"
          );
          gsap.fromTo(
            newElementToAnimate,
            { y: 40 },
            {
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.05,
            }
          );

          gsap.fromTo(
            newProjectImg,
            {
              scale: 0,
              bottom: "-8em",
            },
            {
              scale: 1,
              bottom: "1em",
              duration: 0.8,
              ease: "power3.out",
            }
          );

          gsap.fromTo(
            newProjectImg.querySelector("img"),
            {
              scale: 2,
            },
            {
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              onComplete: () => {
                isAnimating = false;
              },
            }
          );
        },
      });
    };
  }, []);

  return (
    <div className="project-body">
      <div className="container min-w-[100vw]">
        <div className="blurry-prev">
          <img src={image1} alt="Background" />
          <div className="overlay" />
        </div>

        <div className="coll site-info">
          <div className="header">
            <div 
            onClick={()=>navigate(-1)}
            className="flex space-x-2 text-foreground md:hidden hover:underline cursor-pointer">
              <ArrowLeftCircleIcon /> <h3>Back to Home</h3>
            </div>

            <Copy delay={0.5}>
              <h1>ALL PROJECTS</h1>
            </Copy>
          </div>

          <div className="copy flex space-x-6">
            <ArrowLeftCircleIcon 
            onClick={()=>navigate(-1)}
            className="text-foreground cursor-pointer" />
            <Copy delay={0.5}>
              <p>Explore my latest work and creative solutions</p>
            </Copy>
          </div>
        </div>

        <div className="coll project-preview">
          <div className="project-details">
            <Copy delay={0.5}>
              <div className="Title">
                <h1>{galleryItems[0].title}</h1>
              </div>
            </Copy>

            <div className="info">
              <Copy delay={0.3}>
                <p>{galleryItems[0].copy}</p>
              </Copy>
            </div>

            <Copy delay={0.5}>
              <div className="tech">
                <h1 className="tech-label">Technologies</h1>
                <div className="tech-badges">
                  {galleryItems[0].tech.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="mr-2 mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Copy>
            <Copy delay={0.5}>
              <div className="links">
                <div className="project-links">
                  {galleryItems[0].links.live && (
                    <Button className="mr-3 mb-2">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {galleryItems[0].links.github && (
                    <Button variant="outline" className="mb-2">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </Copy>
          </div>
          <div className="project-img">
            <img src={image1} alt={galleryItems[0].title} />
          </div>
        </div>

        <div className="gallery-wrapper">
          <div className="gallery" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
