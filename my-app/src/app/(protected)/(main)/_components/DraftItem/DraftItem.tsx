import Image from "next/image";
import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface DraftItemProps {
  //   id?: Id;
  title: string;
  author: string;
  coverUrl: string;
  onClick: () => void;
}

const DraftItem: React.FC<DraftItemProps> = ({
  title,
  author,
  coverUrl,
  onClick,
}) => {
  return (
    <div
      className="bg-primary p-5 rounded-xl relative"
      // style={{ width: 225, height: 400 }}
      onClick={onClick}
    >
      <div className="flex flex-row justify-center pb-2">
        <Image
          src={
            "https://www.readingclub.ai/_next/image?url=https%3A%2F%2F0opmmv83e2pndbdg.public.blob.vercel-storage.com%2Fbeta%2Fimages%2F2024-02-06%2F52748-HV7IOqdDaK-Y7ivpxbBS8B4zZFovicu3BtfiBSZhc.png&w=2048&q=75"
          }
          width={200}
          height={200}
          // fill
          // objectFit="cover"
          alt="Book cover image"
          className="rounded-xl"
          // style={{ border: "2px solid red" }}
        />
      </div>
      <div className="bg-white p-5 rounded-xl text-center flex flex-col gap-3">
        {/* <div>{d.coverImage}</div> */}

        <div className="font-bold">{title}</div>
        <div>{author}</div>
      </div>
    </div>
  );
};

export default DraftItem;
