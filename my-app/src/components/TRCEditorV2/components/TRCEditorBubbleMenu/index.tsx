import React from "react";

import { BoldIcon, ItalicIcon, LucideIcon } from "lucide-react";
import {
  BubbleMenu as TiptapBubbleMenu,
  Editor,
  BubbleMenuProps,
} from "@tiptap/react";
import { cn } from "@/lib/utils";
import { BsTranslate } from "react-icons/bs";
import { IconType } from "react-icons";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useProModal } from "@/lib/hooks/useModals";

interface TRCBubbleMenuItem {
  name: string;
  isActive: (editor: Editor) => boolean;
  command: (editor: Editor) => void;
  icon: LucideIcon | IconType; //typeof BoldIcon;
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
    // containerClassName = "bg-white divide-x divide-stone-200 rounded border border-stone-200 shadow-xl",
    containerClassName = "bg-secondary divide-x divide-primary rounded border border-primary shadow-xl",

    // buttonClassName = "p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200",
    buttonClassName = "p-2 text-darkFont hover:bg-secondary3 active:bg-secondary2",
  } = props;

  const tiptapBubbleMenuProps: TiptapBubbleMenuProps = {
    ...props, // I wonder why it doesn't work if I don't do it this way
    shouldShow: ({ state, editor }) => {
      // return false;
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
            className={cn(buttonClassName, {
              // "text-blue-500": item.isActive(editor),
              // "bg-accent2": item.isActive(editor),
            })}
            type="button"
          >
            <item.icon
              size={24}
              className={cn(
                "novel-h-4 novel-w-4",
                // this is for when it's bolded already, for example
                {
                  // "text-blue-500": item.isActive(editor),
                  "text-accent2": item.isActive(editor),
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
  {
    name: "translate",
    isActive: () => false, //(editor) => editor.isActive("italic"),
    // command: (editor) => editor.chain().focus().toggleItalic().run(),
    command: async (editor) => {
      // editor.chain().focus().insertContent("TRANSLATE").run();
      // No insert it at the next node
      // editor.chain().insertContentAt(3, "TRANSLATE").run();
      // https://stackoverflow.com/questions/68146588/tiptap-insert-node-below-at-the-end-of-the-current-one

      // This works well to insert at the end of the current node

      const selection = editor.state.selection;
      const { from, to } = selection;
      // https://github.com/ueberdosis/tiptap/issues/369
      const selectedText = editor.state.doc.textBetween(from, to);

      const endPos = editor.state.selection.$to.end();
      editor.setEditable(false);
      editor
        .chain()
        .clearNodes()
        .insertContentAt(endPos, {
          type: "paragraph",
          // https://chat.openai.com/c/a570721f-340b-4579-ab35-0100a3114241
          content: [{ type: "text", text: "Translating..." }],
        })
        .run();

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/translate`,
          {
            // textsToTranslate: ["Hello world"],
            textsToTranslate: [selectedText],
            targetLocale: "en",
          }
        );

        const data = response.data as { translatedParagraphs: string[] };

        // Find the position of the "translating..." text to replace it
        // Assuming "translating..." is the only occurrence or identifying it specifically might require additional logic
        // const translatingPos =
        //   // editor.state.doc.content.findDiffStart("translating...").from;

        // status code 429
        // if (response.status === 429) {
        //   throw new Error("Too many requests");
        // }

        const nextPos = endPos + "Translating...".length + 2;

        editor
          .chain()
          .deleteRange({ from: endPos, to: nextPos })
          .insertContentAt(endPos, {
            type: "paragraph",
            // content: [{ type: "text", text: "TRANSLATE" }],
            content: [
              {
                type: "text",
                text: data.translatedParagraphs[0].replaceAll("&quot;", '"'),
              },
            ],
            // content: [{ type: "text", text: selectedText }],
          })
          .run();

        editor.setEditable(true);
        // https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
        // https://github.com/axios/axios/issues/3612
      } catch (err) {
        const error = err as Error | AxiosError;
        // https://github.com/axios/axios/issues/3612#issuecomment-1046542497

        console.error("Error translating:", error);
        // Delete the range
        editor
          .chain()
          .deleteRange({
            from: endPos,
            to: endPos + "Translating...".length + 2,
          })
          .run();

        // Tell the user
        toast.error(
          "Error translating text"
          // + JSON.stringify(error)
        );

        editor.setEditable(true);

        // if status code 429

        // if (!axios.isAxiosError(error))
        //   if ((error as any).status === 429) {
        //     toast.error("Too many requests. Please try again later.");
        //   }
        if ((err as any).response) {
          if ((err as any).response.status === 429) {
            toast.error("Rate limited exceeded for the day.");
            useProModal.getState().onOpen();
          }
        }
      }

      // But I want to create a new node next to the current one
      // const { tr } = editor.state;
      // const { from, to } = editor.state.selection;
      // const newNode = editor.state.schema.text("TRANSLATE");
      // tr.insert(to, newNode);
      // editor.view.dispatch(tr);

      // Wrong approach
      // const endPos = editor.state.selection.$to.end();
      // const newNode = editor.state.schema.text("TRANSLATE");
      // const { tr } = editor.state;
      // tr.insert(endPos, newNode);
      // editor.view.dispatch(tr);
    },
    icon: BsTranslate,
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
