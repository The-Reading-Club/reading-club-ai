// components/LoomEmbed.tsx

import React from "react";

interface LoomEmbedProps {
  videoId: string;
  width?: string;
  height?: string;
}

const LoomEmbed: React.FC<LoomEmbedProps> = ({
  videoId,
  width = "100%",
  height = "500px",
}) => {
  const loomUrl = `https://www.loom.com/embed/${videoId}`;

  return (
    <iframe
      src={loomUrl}
      frameBorder="0"
      allowFullScreen
      style={{ width: width, maxWidth: "100%", height: height }}
    ></iframe>
  );
};

export default LoomEmbed;
