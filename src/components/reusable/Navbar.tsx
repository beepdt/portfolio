import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MenuIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useNavigate } from "react-router";


import { Avatar, AvatarImage } from "../ui/avatar";
import type { JSX } from "react";

interface NavbarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const Navbar = ({ activeSection, onSectionClick }: NavbarProps) => {
  const navigate = useNavigate();

  const sections = [
    { id: "intro", label: "INTRO" },
    { id: "WORK", label: "WORK" },
    { id: "contact", label: "CONTACT" },
  ];

  type SocialLink = {
    download: any;
    icon: JSX.Element;
    href: string;
    label: string;
    
  };
//@ts-ignore
  const socialLinks: SocialLink[] = [
    {
      icon: <Github className="size-[24px]" />,
      href: "https://github.com/beepdt",
      label: "GitHub",
      download: undefined
    },
    {
      icon: <Linkedin className="size-[24px]" />,
      href: "https://linkedin.com/in/deeptangshu",
      label: "LinkedIn",
      download: undefined
    },
    {
      icon: <Mail className="size-[24px] " />,
      href: "mailto:info.deeptangshu@gmail.com",
      label: "Email",
      download: undefined
    },
    {
      icon: <FileText className="size-[24px]" />,
      href: "/resume.pdf",
      label: "Resume",
      download: undefined
    },
  ];

  return (
    <div className="fixed top-4 z-50 w-full  px-4 lg:px-12 ">
      <div className="flex justify-between w-full h-16 lg:justify-center bg-transparent rounded-[12px]  ">
        {/*Mobile Nav */}
        <div className="flex items-center gap-4 lg:hidden justify-between w-full px-4">
          <div
            className="flex space-x-4 items-center cursor-pointer lg:hidden"
            onClick={() => navigate("/")}
          >
            <div className="flex flex-col">
              <h2 className="text-[16px] lg:text-[24px] font-integral leading-none">
                DB
              </h2>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden ">
              <Button className="bg-transparent rounded-full hover:bg-transparent cursor-pointer ml-4 ">
                <MenuIcon className=""/>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="border-none w-[60%] bg-[#0d0907] text-[#f5f5f5]">
              <div className="flex flex-col gap-6 py-8 ">
                <div className="flex gap-2 items-center px-4">
                  <Avatar className="size-14">
                    <AvatarImage src="/avatar.png" />
                  </Avatar>
                  <div>
                    <h2 className="font-newake text-[24px] leading-none">
                      Deeptangshu Bhattacharjee
                    </h2>
                    <p className="font-generalmed">
                      Full Stack and Mobile Developer
                    </p>
                  </div>
                </div>

                <nav className="flex flex-col gap-2 py-8 rounded-full">
                  {sections.map((section) => (
                    <div className="rounded-full">
                      <button
                        key={section.id}
                        className={`flex items-center gap-2 hover:text-[#f5f5f5] text-left rounded-full ${
                          activeSection === section.id
                            ? "text-[#f5f5f5]"
                            : "text-gray-400"
                        } hover:text-[#f5f5f5] transition-colors`}
                        onClick={() => {
                          onSectionClick(section.id);
                        }}
                      >
                        <div className="pl-8 cursor-pointer font-newake rounded-full text-[48px]">
                          {section.label}
                        </div>
                      </button>
                    </div>
                  ))}
                </nav>

                <div className="flex px-8">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.download ? "_self" : "_blank"}
                      rel={!link.download ? "noopener noreferrer" : undefined}
                      download={link.download}
                      aria-label={link.label}
                      className="hover:text-backgroundground transition-colors border rounded-full p-2"
                    >
                      <div>{link.icon}</div>
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/*DESKTOP NAVBAR */}
        <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:w-full ">
          {/* Left */}
          <div
            className="lg:flex space-x-4 items-center justify-center cursor-pointer bg-[#1d1c1c] rounded-full pl-4 pr-8 py-2  transition-colors ease-in-out duration-300"
            onClick={() => navigate("/")}
          >
            <Avatar className="size-[12px] lg:size-[32px]">
              <AvatarImage src="/avatar.png" />
            </Avatar>

            <h2 className="text-[16px] lg:text-[16px] whitespace-nowrap font-generalbold tracking-tight leading-none">
              Deeptangshu Bhattacharjee
            </h2>
          </div>

          {/* Center */}
          <nav className="flex  justify-center items-center gap-6 font-geist bg-foreground rounded-full mx-auto pl-8 pr-6 py-4 ">
            {sections.map((section) => (
              <button
                key={section.id}
                className="relative text-sm font-generalmed transition-colors text-[#f5f5f5] cursor-pointer"
                onClick={() => onSectionClick(section.id)}
              >
                {section.label}
                
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex justify-end items-center gap-2 bg-background rounded-full px-4 py-2 hover:bg-white transition-colors ease-in-out duration-300">
            {socialLinks.map((link) => (
              <Button key={link.label}  size="icon" asChild className="bg-tranparent hover:bg-gray-100 rounded-full text-foreground transition-colors ease-in-out duration-300">
                <a
                  href={link.href}
                  target={link.download ? "_self" : "_blank"}
                  rel={!link.download ? "noopener noreferrer" : undefined}
                  download={link.download}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
