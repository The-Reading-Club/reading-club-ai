import { ImageIcon } from "lucide-react";
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];

      // log analytics?

      if (item) {
        command(item);
      }
    },
    [command, editor, items]
  );

  useEffect(() => {
    const navigationKeys = [
      "ArrowUp",
      "ArrowDown",
      "Enter",
      // "Escape"
    ];

    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key == "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key == "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key == "Enter") {
          selectItem(selectedIndex);
          return true;
        }

        return false;
      }
    };

    // I am always confused by this type of code
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const commandListContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  if (items.length > 0 == false) return null;

  return (
    <div
      id="slash-command"
      ref={commandListContainer}
      // className="novel-z-50 novel-h-auto novel-max-h-[330px] novel-w-72 novel-overflow-y-auto novel-rounded-md novel-border novel-border-stone-200 novel-bg-white novel-px-1 novel-py-2 novel-shadow-md novel-transition-all"
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            key={`slash-command-iten-${index}`}
            onClick={() => selectItem(index)}
          >
            <div>{item.icon}</div>
            <div>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CommandList;

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > container.scrollTop + containerHeight) {
    container.scrollTop += bottom - (container.scrollTop + containerHeight) + 5;
  }
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
