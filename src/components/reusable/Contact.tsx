import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Check,
  Download,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Copy from "@/components/reusable/Copy";
import CopyChars from "./CopyChars";

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: (
        <Github className="size-12 md:size-16 transition-transform duration-300 group-hover:scale-105" />
      ),
      href: "https://github.com/beepdt",
      label: "GitHub",
      description: "View my projects",
    },
    {
      icon: (
        <Linkedin className="size-12 md:size-16 transition-transform duration-300 group-hover:scale-105" />
      ),
      href: "https://linkedin.com/in/deeptangshubhattacharjee",
      label: "LinkedIn",
      description: "Let's connect",
    },
    {
      icon: (
        <Mail className="size-12 md:size-16 transition-transform duration-300 group-hover:scale-105" />
      ),
      href: "mailto:info.deeptangshu@gmail.com",
      label: "Email",
      description: "Send me a message",
      email: "info.deeptangshu@gmail.com",
    },
    {
      icon: (
        <FileText className="size-12 md:size-16 transition-transform duration-300 group-hover:scale-105" />
      ),
      href: "/resume.pdf",
      label: "Resume",
      description: "Download PDF",
    },
  ];
  const navigate = useNavigate();

  const handleEmailCopy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleCardClick = (link: (typeof socialLinks)[0]) => {
    if (link.email) {
      window.open(`mailto:${link.email}`, "_self");
    } else {
      window.open(link.href, "_blank");
    }
  };

  return (
    <div className="flex-col">
      <div className="flex w-full">
        <CopyChars delay={0.1}>
          <h1 className="font-newake text-[36px] sm:text-[4rem] lg:text-[6rem] xl:text-[10rem] leading-none">
            Co<span className="font-nohemi text-[#0077FF]">n</span>tact
          </h1>
        </CopyChars>
      </div>
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {socialLinks.map((link, index) => (
          <div
            key={link.label}
            className="group relative overflow-hidden rounded-2xl bg-[#1d1c1c]/30 hover:border-gray-400 transition-all duration-300 hover:shadow-lg cursor-pointer"
            onMouseEnter={() => setHoveredCard(link.label)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(link)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            {/* Card Content */}
            <div className="relative p-6 h-full min-h-[200px] md:min-h-[280px] flex flex-col justify-between">
              {/* Icon and Action Buttons */}
              <div className="flex justify-between items-start">
                <div className="transition-transform duration-300">
                  {link.icon}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {link.email && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEmailCopy(link.email!);
                      }}
                      className="p-2   rounded-full transition-colors duration-200"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <Check className="size-4 text-gray-700" />
                      ) : (
                        <Copy className="size-4 text-gray-700" />
                      )}
                    </button>
                  )}

                  <div className="p-2">
                    {link.label === "Resume" ? (
                      <Download className="size-4 " />
                    ) : (
                      <ExternalLink className="size-4 " />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className=" font-bold text-2xl md:text-3xl leading-tight font-generalmed">
                  {link.label}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {link.description}
                </p>

                {/* Email Display */}
                {link.email && (
                  <p className="text-gray-300 text-xs md:text-sm font-geistmon break-all">
                    {link.email}
                  </p>
                )}
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        ))}
      </div>
      {copiedEmail && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <Check className="size-5" />
            <span>Email copied to clipboard!</span>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
