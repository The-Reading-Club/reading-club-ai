import { ImageIcon } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import { Editor, Range } from "@tiptap/react";
import { startImageUpload } from "../../plugins/upload-images";

interface CommandProps {
  editor: Editor;
  range: Range;
}

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  // WHY IS THIS ANY???
  command: any;
  editor: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const selectItem = useCallback((index: number) => {
    const item = items[index];
  });
};

export const getHintItems = ({ query }: { query: string }) => {
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
      command: ({ editor, range }: CommandProps) => {
        // what am I deleteing?
        editor.chain().focus().deleteRange(range).run();
        // image upload
        // wondering if I could have a custom dialog?
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0];
            const pos = editor.view.state.selection.from;
            startImageUpload(file, editor.view, pos);
          }
        };
        input.click();
      },
    },
  ];
};
