import { ImageIcon } from "lucide-react";
import { ReactNode } from "react";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const getHintItems = ({ query }: { query: string }) => {
  return [
    {
      title: "Upload Image",
      description: "Upload an image from your computer",
      searchTerms: [
        "upload",
        "image",
        "photo",
        "media",
        "picture",
        // "illustration", // maybe
      ],
      icon: <ImageIcon size={18} />,
      //   command:
    },
  ];
};
