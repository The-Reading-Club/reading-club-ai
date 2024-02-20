import { PencilIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
// https://chat.openai.com/c/ae328802-25f1-4edd-a1d0-7b2bd824403b

interface CustomImageProps {
  src: string;
  alt?: string;
  onClick: () => void;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, onClick }) => {
  return (
    <>
      {/* <img
        src={src}
        alt={alt}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      /> */}
      <div
        // style={{ border: "2px solid red" }}
        className="relative"
      >
        <Image
          // https://stackoverflow.com/questions/75781160/next-image-component-gives-error-missing-required-width-property-when-runni
          // fill
          src={src}
          alt={alt ?? ""}
          // onClick={onClick}
          width={1000}
          height={1000}
          // fill
          // objectFit="contain"
          style={{ cursor: "pointer", margin: 0 }}
          // fill

          // layout="fill"
          // objectFit="cover"
          // fill
          // width={100}
          // height={100}

          // style={{
          //   cursor: "pointer",
          //   width: "100%",
          //   height: "auto",
          //   objectFit: "cover",
          // }}
        />

        <button
          className="absolute right-0 top-0 bg-slate-100 p-5 rounded-full m-1"
          onClick={onClick}
        >
          <PencilIcon className="text-darkFont" size={50} />
        </button>
      </div>
    </>
  );
};

export default CustomImage;
