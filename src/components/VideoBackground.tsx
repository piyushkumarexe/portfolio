import { useEffect, useRef } from "react";
import { VideoSettings } from "@/types";

interface Props {
  video: VideoSettings;
  parallax: { x: number; y: number };
}

export function VideoBackground({ video, parallax }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = video.playbackSpeed;
    }
  }, [video.playbackSpeed]);

  const showVideo = !isMobile || video.mobileEnabled;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {showVideo ? (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          poster={video.fallbackImage}
          className="absolute h-full w-full object-cover transition-transform duration-300 ease-out"
          style={{
            filter: `brightness(${video.brightness}) blur(${video.blur}px)`,
            transform: `scale(1.08) translate(${parallax.x * -12}px, ${parallax.y * -12}px)`,
          }}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${video.fallbackImage})`,
            filter: `brightness(${video.brightness}) blur(${video.blur}px)`,
            transform: `scale(1.08) translate(${parallax.x * -12}px, ${parallax.y * -12}px)`,
          }}
        />
      )}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: video.overlay }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </div>
  );
}
