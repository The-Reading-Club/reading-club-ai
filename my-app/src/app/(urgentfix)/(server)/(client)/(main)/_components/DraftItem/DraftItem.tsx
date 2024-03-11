import Image from "next/image";
import React from "react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { PlusCircleIcon } from "lucide-react";

interface DraftItemProps {
  //   id?: Id;
  title: string;
  author: string;
  coverUrl: string;
  onClick?: () => void;
  colorClassName?: string;
  hoverColorClassName?: string;
  titleBgColorClassname?: string;
  showCoverImage?: boolean;
  authorColorClassname?: string;
  titleColorClassname?: string;
  showUnpublishedWatermark?: boolean;
}

// const DEFAULT_COVER_URL = "https://www.readingclub.ai/_next/image?url=https%3A%2F%2F0opmmv83e2pndbdg.public.blob.vercel-storage.com%2Fbeta%2Fimages%2F2024-02-06%2F52748-HV7IOqdDaK-Y7ivpxbBS8B4zZFovicu3BtfiBSZhc.png&w=2048&q=75";
// const DEFAULT_COVER_URL =
//   "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/reading-club-ai-logo.jpg";
const DEFAULT_COVER_URL =
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/reading-club-Ai-vertical-white.png";

const DraftItem: React.FC<DraftItemProps> = ({
  title,
  author,
  coverUrl,
  onClick,
  colorClassName = "bg-primary",
  hoverColorClassName = "bg-accent",
  titleBgColorClassname = "bg-white",
  showCoverImage = true,
  authorColorClassname = "",
  titleColorClassname = "",
  showUnpublishedWatermark: showPublishedWatermark = false,
}) => {
  // return <div>THIS IS ANOTHER TEST</div>;
  return (
    <div
      className={`${colorClassName} p-5 rounded-xl relative basis-[250px] cursor-pointer hover:${hoverColorClassName} transition-all duration-300 ease-in-out flex flex-col relative`}
      // ${
      //   showCoverImage ? "justify-around" : ""
      // }
      // hover:bg-accent2 transition-all duration-300 ease-in-out"
      // style={{ width: 225, height: 400 }}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        minHeight: 350,
      }}
      onClick={onClick}
    >
      <div className="flex flex-row justify-center pb-2">
        {showCoverImage == true ? (
          <Image
            src={
              coverUrl !== undefined && coverUrl !== null && coverUrl !== ""
                ? coverUrl
                : DEFAULT_COVER_URL
            }
            width={200}
            height={200}
            // fill
            // objectFit="cover"
            // alt="Book cover image"
            alt={coverUrl}
            className="rounded-xl"
            // style={{ border: "2px solid red" }}
          />
        ) : (
          <div
            className="rounded-xl w-full"
            style={{ height: "auto" }}
            // onClick={onCreate}
          >
            <div className="pb-2 text-center text-white flex flex-col justify-center items-center">
              <div className="font-bold border-2 border-white rounded-lg  h-[210px] w-full flex flex-col justify-center items-center gap-5">
                Write a new book
                <PlusCircleIcon size={50} />
              </div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${titleBgColorClassname} p-5 rounded-xl text-center flex flex-col justify-center gap-3 basis-full-cancel`}
      >
        {/* <div>{d.coverImage}</div> */}

        <div className={`font-bold ${titleColorClassname}`}>
          {!title ? "Untitled" : title}
        </div>
        <div className={`${authorColorClassname}`}>{author}</div>
      </div>
      {/* https://chat.openai.com/c/d21525f3-ff2c-44b0-a984-5ab08df6ff6a */}
      {showPublishedWatermark && (
        <div className="absolute -rotate-45 left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] text-4xl font-bold text-neutral-500/75">
          <p>UNPUBLISHED</p>
        </div>
      )}
    </div>
  );
};

export default DraftItem;
