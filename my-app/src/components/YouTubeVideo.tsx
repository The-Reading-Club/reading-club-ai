import React from "react";

interface YouTubeVideoProps {
  videoId: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        borderRadius: "12px",
        minHeight: 315,
        // border: "2px solid red",
      }}
      className="lg:w-[560px] w-[100%]"
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
