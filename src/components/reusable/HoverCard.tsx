import { useEffect, useRef } from "react";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";

interface HoverComponent {
  video: string;
  image?: string;
  width: number | string;
  height: number | string;
  className?: string;
  mediaSize: number;
  onMediaSizeChange: (value: number) => void;
  label: string;
  isHovered: boolean;
  autoplay: "all" | "hover";
}

export const HoverCard = ({
  video,
  image,
  width,
  height,
  className = "",
  mediaSize,
  onMediaSizeChange,
  label,
  isHovered,
  autoplay,
}: HoverComponent) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoR = videoRef.current;
    if (!videoR) return;

    if (autoplay === "hover") {
      if (isHovered) {
        videoR.play().catch(console.warn);
      } else {
        videoR.pause();
      }
    } else if (autoplay === "all") {
      videoR.play();
    } else {
      videoR.pause();
    }
  }, [isHovered, autoplay]);

  return (
    <div
      className={`relative  ${className}`}
      style={{
        width,
        height,
        minHeight: "480px", // Ensure minimum height
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          transform: `scale(${mediaSize})`,
          transformOrigin: "center",
          transition: "transform 0.3s ease-in-out",
        }}
      >
       
        
        {/* Image fallback if provided */}
        {image && (
          <div>
            <img
              className="absolute inset-0 h-full w-full object-cover "
              src={image}
              alt={label}
              onError={(e) => console.log("Image failed to load:", image)}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
                <h2 className="font-generalmed text-xl  text-white line-clamp-2 ">
                  {label}
                </h2>
              </div>
            </div>
          </div>
        )}
        {/* <Card>
          <CardHeader>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={video}
              poster={image}
              loop
              muted
              playsInline
              ref={videoRef}
              onError={(e) => console.log("Video failed to load:", video)}
              onLoadStart={() => console.log("Video loading:", video)}
            />
          </CardHeader>
          <CardDescription>
            <div className=" flex items-center justify-center text-white text-lg font-bold">
              {label}
            </div>
          </CardDescription>

        </Card> */}
      </div>
    </div>
  );
};
