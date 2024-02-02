import useMounted from "@/lib/hooks/useMounted";
import React from "react";

interface YouTubeVideoProps {
  videoId: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  const mounted = useMounted();
  return (
    <iframe
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        borderRadius: "12px",
        minHeight: mounted && window && window.innerWidth < 1200 ? 315 : 650,
        // border: "2px solid red",
      }}
      className="lg:w-[1000px] w-[100%]"
      // width="560" // i think this is an standard
      //   height="315"
      src={videoSrc}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeVideo;
