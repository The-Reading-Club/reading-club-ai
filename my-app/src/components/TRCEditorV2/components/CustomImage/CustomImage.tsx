import React from "react";
// https://chat.openai.com/c/ae328802-25f1-4edd-a1d0-7b2bd824403b

interface CustomImageProps {
  src: string;
  alt?: string;
  onClick: () => void;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, onClick }) => {
  return (
    <img src={src} alt={alt} onClick={onClick} style={{ cursor: "pointer" }} />
  );
};

export default CustomImage;
