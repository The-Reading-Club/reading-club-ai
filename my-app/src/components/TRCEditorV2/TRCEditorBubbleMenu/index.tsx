import React from "react";

import { BoldIcon, ItalicIcon, LucideIcon } from "lucide-react";
import {
  BubbleMenu as TiptapBubbleMenu,
  Editor,
  BubbleMenuProps,
} from "@tiptap/react";
import { cn } from "@/lib/utils";

interface TRCBubbleMenuItem {
  name: string;
  isActive: (editor: Editor) => boolean;
  command: (editor: Editor) => void;
  icon: LucideIcon; //typeof BoldIcon;
}

interface TRCBubbleMenuProps {
  bubbleMenuItems?: TRCBubbleMenuItem[];
  editor: Editor;
  customTippyOptions?: any;
  customBubbleMenuProps?: TiptapBubbleMenuProps;
  containerClassName?: string;
  buttonClassName?: string;
}

type TiptapBubbleMenuProps = Omit<BubbleMenuProps, "children">;

const TRCEditorBubbleMenu: React.FC<TRCBubbleMenuProps> = (props) => {
  const {
    editor,
    bubbleMenuItems = defaultBubbleMenuItems,
    customTippyOptions,
    customBubbleMenuProps,
    containerClassName = "bg-white divide-x divide-stone-200 rounded border border-stone-200 shadow-xl",
    buttonClassName = "p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200",
  } = props;

  const tiptapBubbleMenuProps: TiptapBubbleMenuProps = {
    ...props, // I wonder why it doesn't work if I don't do it this way
    shouldShow: ({ state, editor }) => {
      return false;
      const { selection } = state;
      const { empty } = selection;

      if (editor.isActive("image") || empty) return false;

      return true;
    },
    tippyOptions: {
      // what is this for?
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        // console.log("hidden");
      },
      ...customTippyOptions,
    },
    ...customBubbleMenuProps,
  };

  return (
    <div>
      {/* <h1>HELLO WORLD TEST 1</h1> */}
      {/*       className="novel-flex novel-w-fit novel-divide-x novel-divide-stone-200 novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl"
       */}
      <TiptapBubbleMenu
        {...tiptapBubbleMenuProps}
        className={containerClassName}
      >
        {/* <h1>HELLO WORLD TEST 2</h1> */}
        {bubbleMenuItems.map((item, index) => (
          <button
            key={"bubble-menu-item-" + index}
            onClick={() => item.command(editor)}
            className={buttonClassName}
            type="button"
          >
            <item.icon
              size={24}
              className={cn(
                "novel-h-4 novel-w-4",
                // this is for when it's bolded already, for example
                {
                  "text-blue-500": item.isActive(editor),
                }
              )}
            />
          </button>
        ))}
      </TiptapBubbleMenu>
    </div>
  );
};

export default TRCEditorBubbleMenu;

const defaultBubbleMenuItems: TRCBubbleMenuItem[] = [
  {
    name: "bold",
    isActive: (editor) => editor.isActive("bold"),
    command: (editor) => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon,
  },
  {
    name: "italic",
    isActive: (editor) => editor.isActive("italic"),
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon,
  },
  //   {
  //     name: "underline",
  //     isActive: (editor) => editor.isActive("underline"),
  //     command: (editor) => editor.chain().focus().toggleUnderline().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "strikethrough",
  //     isActive: (editor) => editor.isActive("strike"),
  //     command: (editor) => editor.chain().focus().toggleStrike().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "heading",
  //     isActive: (editor) => editor.isActive("heading"),
  //     command: (editor) =>
  //       editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "blockquote",
  //     isActive: (editor) => editor.isActive("blockquote"),
  //     command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "codeblock",
  //     isActive: (editor) => editor.isActive("codeblock"),
  //     command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "code",
  //     isActive: (editor) => editor.isActive("code"),
  //     command: (editor) => editor.chain().focus().toggleCode().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "horizontalrule",
  //     isActive: (editor) => editor.isActive("horizontalrule"),
  //     command: (editor) => editor.chain().focus().toggleHorizontalRule().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "link",
  //     isActive: (editor) => editor.isActive("link"),
  //     command: (editor) =>
  //       editor
  //         .chain()
  //         .focus()
  //         .toggleLink({ href: "https://www.google.com" })
  //         .run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "bulletlist",
  //     isActive: (editor) => editor.isActive("bulletlist"),
  //     command: (editor) => editor.chain().focus().toggleBulletList().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "orderedlist",
  //     isActive: (editor) => editor.isActive("orderedlist"),
  //     command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  //     icon: BoldIcon,
  //   },
  //   {
  //     name: "listitem",
  //     isActive: (editor) => editor.isActive("listitem"),
  //     command: (editor) => editor.chain().focus().toggleListItem().run(),
  //     icon: BoldIcon,
  //   },
];
