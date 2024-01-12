"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
  // FloatingMenuProps, // excludes element
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

// https://tiptap.dev/docs/editor/api/extensions/collaboration
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
// https://github.com/ueberdosis/tiptap/blob/main/demos/src/Experiments/MultipleEditors/Vue/index.vue
const ydoc = new Y.Doc();

import { PluginKey } from "prosemirror-state";

import { v4 as uuidv4 } from "uuid"; // Assuming you are using uuid for generating unique IDs

import { EB_Garamond } from "next/font/google";
const garamondFont = EB_Garamond({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  weight: ["400", "800"],
  // https://github.com/vercel/next.js/issues/44456
  display: "swap",
});

import "@/styles/prosemirror.css";
import { getPrevText } from "@/lib/editor";
import { useCompletion } from "ai/react";

// https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-highlight/src/highlight.ts
// https://www.npmjs.com/package/@tiptap/extension-highlight
// https://tiptap.dev/docs/editor/api/marks/highlight
import Highlight from "@tiptap/extension-highlight";
import TRCEditorBubbleMenu from "./TRCEditorBubbleMenu";
import { CustomHighlight } from "./extensions/custom-highlitght";
import { CustomSuggestion } from "./extensions/custom-suggestion";
import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu";
// import FloatingMenu from "@tiptap/extension-floating-menu";

import useMounted from "@/lib/hooks/useMounted";
import { CustomBubbleMenu } from "./CustomBubbleMenu";
import {
  caveStoryTestTipTapJSON,
  caveStoryTestTipTapJSONV2,
  contentWithSuggestions,
} from "./default-content";
import { useTRCEditorStore } from "@/stores/store";
import { Mark } from "@tiptap/pm/model";
import { BoldIcon, CheckIcon, X, XIcon } from "lucide-react";

import { diffChars } from "diff";
import { dev } from "@/config";

interface TRCEditorV2Props {
  editorContent?: JSONContent | string;
  bgClass?: string;
  fontClass?: string;
  editorContainerClass?: string;
  editorKey: string;
}

const TRCEditorV2: React.FC<TRCEditorV2Props> = ({
  editorContent,
  bgClass = "bg-[#FAF8DA]",
  fontClass = garamondFont.className,
  editorContainerClass = `${bgClass} ${fontClass} text-[#7B3F00] max-w-screen-sm overflow-scroll`,
  editorKey,
}) => {
  const mounted = useMounted();

  // Suggestions state
  const { suggestionsIDs, setSuggestionsIDs } = useTRCEditorStore();
  // const [suggestionsIDs, setSuggestionsIDs] = useState<string[]>([]);

  //#region ****** USE COMPLETION START ******
  const { complete, completion, isLoading, stop } = useCompletion({
    id: "trc-editor-v2",
    api: "api/generate",
    // body:Extra body object to be sent with the API request.
    onFinish: (prompt, completion) => {
      editor?.commands.setTextSelection({
        // basically you set the cursor back to where it was
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });

      // Right now all completions are for suggestions, but I wonder if I should do it differently later on
      updateExtensionsState();
    },
    onError: (err) => {
      // toast.error(err.message)
      alert(err.message);
      // there's gotta be a more formal status code for this
      if (err.message == "Rate limit exceeded for the day") {
        //va.track("Rate Limit Reached")
        alert("Rate Limit Reached");
      }
    },
  });
  //#endregion ****** USE COMPLETION END ******

  //#region ****** TIPTAP EDITOR START ******

  // Unique plugin keys
  const customSuggestionPluginKey = new PluginKey("customSuggestionPlugin");
  const imagePluginKey = new PluginKey("imagePlugin");

  const editor = useEditor({
    extensions: [
      Collaboration.configure({
        document: ydoc,
        field: editorKey,
      }),
      StarterKit,
      // duplicates in starterkit
      // Document,
      // Heading,
      //Paragraph,
      // Text,
      TextAlign,
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: "100%",
            },
            height: {
              default: null,
            },
          };
        },
      }),
      Link,
      // Highlight.configure({
      //   HTMLAttributes: {
      //     class: "bg-primary",
      //   },
      // }),
      // CustomHighlight.configure({
      //   HTMLAttributes: {
      //     class: "bg-primary",
      //   },
      // }),
      CustomSuggestion.configure({
        // multicolor: true,
        HTMLAttributes: {
          class: "bg-primary",
        },
      }),
      // BubbleMenuExtension.configure({
      //   pluginKey: "bubbleMenuOne",
      //   // This should target your menu's root element
      //   element:
      //     mounted == true
      //       ? (document.querySelector(".custom-suggestion") as HTMLElement)
      //       : null,
      //   shouldShow: ({ editor }) => true,
      // }),
      // FloatingMenu.configure({
      //   element: document.querySelector(".custom-suggestion") as HTMLElement,
      // }),
    ],
    content: editorContent ?? caveStoryTestTipTapJSON,
    editorProps: {
      attributes: {
        //    class: `novel-prose-lg novel-prose-stone dark:novel-prose-invert prose-headings:novel-font-title novel-font-default focus:novel-outline-none novel-max-w-full`,
        class: `prose-lg focus:outline-none max-w-full`,
      },
    },
    onUpdate: (e) => {
      // this is to know wherever the cursor is really
      // the next function only uses the cursor position
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2, // should change the name of this prop to lastManyChars
        // and lastManyOffset
      });

      if (lastTwo == "++" && !isLoading) {
        // alert("Autocomplete Shortcut Used");
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(getPrevText(e.editor, { chars: 5000 })); // I probably should aim for the whole story text
        // va.track("Autocomplete Shortcut Used")
        console.log("Autocomplete Shortcut Used");
      } else {
        // whatever you would do if last two are not ++
        // I wonder if I could trigger spontaneous feedback by the AI
        // with a voiceover, that would be cool
      }
    },
  });

  //#endregion ****** TIPTAP EDITOR END ******

  const prev = useRef("");
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;

    // editor?.commands.setHighlight();
    // editor?.commands.setCustomHighlight();

    // One argument against doing it like this is that I may be calling setCustomSuggestion many times for the same piece of content.
    // editor?.commands.setCustomSuggestion({ uuid: "uuidv4()" });
    // editor?.commands.setCustomSuggestion();

    // https://chat.openai.com/c/8e11d054-304c-4aa7-ada6-bf7691d629bd
    if (editor?.isActive("customSuggestion") == false && completion != "") {
      // alert("Setting a new suggestion! " + completion);
      editor.commands.setCustomSuggestion({
        // color: "blue",
        uuid: uuidv4(),
      });
    }
    // else {
    //   alert(
    //     "Missing the first time??? diff: " + diff + " completion: " + completion
    //   );
    // }
    // updateSuggestionButtonsPosition();

    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  const editorRef = useRef<Editor | null>(null);
  useEffect(() => {
    editorRef.current = editor;
    updateExtensionsState();
  }, [editor]);

  type CustomSuggestionMarkAttrs = {
    "data-suggestion-id": string;
    // Define other attributes here if needed
  };

  const updateExtensionsState = () => {
    let suggestionMarks: Mark[] = [];
    // alert("test 1" + editor);
    editorRef.current?.view.state.doc.content;
    editorRef.current?.view.state.doc.descendants((node, pos) => {
      // alert("test 2");
      // alert(node.marks);
      const nodeSuggestionsMarks = node.marks.filter(
        (mark) => mark.type.name == "customSuggestion"
      );
      suggestionMarks = [...suggestionMarks, ...nodeSuggestionsMarks];
    });
    // alert(JSON.stringify(suggestionMarks));
    setSuggestionsIDs(
      suggestionMarks.map((mark) => {
        const attrs = mark.attrs;
        return attrs["uuid"];
      })
    );
  };

  // Dummy function for handling accept/reject
  // const handleSuggestionAction = () => {
  //   console.log("Suggestion action handled");
  // };

  // const [suggestionButtonsPosition, setSuggestionButtonsPosition] = useState({
  //   top: 0,
  //   left: 0,
  // });
  // const updateSuggestionButtonsPosition = () => {
  //   const suggestionElement = document.querySelector(".custom-suggestion");

  //   if (suggestionElement) {
  //     const rect = suggestionElement.getBoundingClientRect();
  //     setSuggestionButtonsPosition({
  //       top: rect.top,
  //       left: rect.left,
  //     });
  //   }
  // };

  useEffect(() => {
    if (editor) {
      // const diffs = diffChars(
      //   JSON.stringify(caveStoryTestTipTapJSON),
      //   JSON.stringify(caveStoryTestTipTapJSONV2)
      // );
      // let formattedContent = [];
      // diffs.forEach((part) => {
      //   const span = part.added
      //     ? {
      //         type: "paragraph",
      //       }`<span class="bg-green-200">${part.value}</span>`
      //     : part.removed
      //     ? `<span class="bg-red-200">${part.value}</span>`
      //     : `<span>${part.value}</span>`;
      //   formattedContent += span;
      // });
      // editor.commands.setContent(contentWithSuggestions);
      updateExtensionsState();
    }
  }, [editor]);

  useEffect(() => {
    console.log(suggestionsIDs);
    // Additional logs if necessary
  }, [suggestionsIDs]);

  if (!editor) {
    return null;
  }

  return (
    <div className={editorContainerClass}>
      {/* <p>{JSON.stringify({ suggestionsIDs })}</p> */}
      <div>
        <EditorContent editor={editor} />
      </div>
      <TRCEditorBubbleMenu editor={editor} />
      {/* {false && (
        <BubbleMenu editor={editor}>
          <h1>HELLO WORLD</h1>
        </BubbleMenu>
      )} */}
      {/* <FloatingMenu className="test" editor={editor}></FloatingMenu> */}
      {suggestionsIDs.map((suggestionID, i) => {
        // alert("Rendering " + suggestionID);
        console.log("RENDERING " + suggestionsIDs);
        console.log("THIS ONE" + suggestionID);
        return (
          // <BubbleMenuPortal key={`portal-${suggestionID}`}>
          <TRCEditorBubbleMenu
            key={`suggestion-bubble-menu-TRC-${suggestionID}`}
            editor={editor}
            customTippyOptions={{
              getReferenceClientRect: (): DOMRect => {
                const element = document.querySelector(
                  // https://chat.openai.com/c/b9b1cdbf-2bf5-47f9-8439-9a418ccc774e
                  `.custom-suggestion[data-suggestion-id="${suggestionID}"]`
                );
                if (element) {
                  // Assuming getBoundingClientRect is available on the element
                  return element.getBoundingClientRect();
                } else {
                  // Fallback to a default DOMRect if the element is not found
                  return new DOMRect();
                }
              },
            }}
            customBubbleMenuProps={{
              shouldShow: () => true,
              pluginKey: `pluginkey-bubble-menu-suggestion-${suggestionID}`,
            }}
            bubbleMenuItems={[
              {
                name: "accept",
                command: () => {
                  if (dev == true) alert("accept " + suggestionID);
                  removeMarkWithId(editor, "customSuggestion", suggestionID);
                  // return;
                  setSuggestionsIDs([
                    ...suggestionsIDs.filter((id) => id != suggestionID),
                  ]);
                },
                isActive: () => false,
                icon: CheckIcon,
              },
              {
                name: "reject",
                command: () => {
                  if (dev == true) alert("reject " + suggestionID);
                  // return;
                  removeMarkWithId(
                    editor,
                    "customSuggestion",
                    suggestionID,
                    true
                  );
                  // return;
                  setSuggestionsIDs([
                    ...suggestionsIDs.filter((id) => id != suggestionID),
                  ]);
                },
                isActive: () => false,
                icon: XIcon,
              },
            ]}
            containerClassName="bg-primary divide-x divide-white rounded border border-white shadow-xl"
            buttonClassName="p-2 text-white hover:bg-accent active:bg-accent2"
          >
            {/* <h1>TEST</h1>
      <button className=""></button> */}
          </TRCEditorBubbleMenu>

          // </BubbleMenuPortal>
        );
      })}
      {/* <CustomBubbleMenu editor={editor}>
        <h1 className="bg-red-200">TEST</h1>
        <button className=""></button>
      </CustomBubbleMenu> */}
      <div id="bubble-menu-root"></div>
    </div>
  );
};

export default TRCEditorV2;

function removeMarkWithId(
  editor: Editor,
  markType: string,
  uuid: string,
  deleteRange = false
) {
  const { state } = editor;
  const { tr, schema } = state;
  const mark = schema.marks[markType];

  state.doc.descendants((node, pos) => {
    node.marks.forEach((mark) => {
      if (mark.type.name === markType) {
        const attrs = mark.attrs;
        if (attrs["uuid"] == uuid) {
          alert("FOUND MARK AND REMOVING IT " + uuid);
          tr.removeMark(pos, pos + node.nodeSize, mark);
          // https://chat.openai.com/c/6b311811-c9c5-481a-bb4f-5a872447aa5f gold too
          if (deleteRange == true) tr.deleteRange(pos, pos + node.nodeSize);
        }
      }
    });
  });

  // https://chat.openai.com/c/8d391210-3ceb-4d28-a092-10d7b4bdb640 gold
  editor.view.dispatch(tr);
}

//  AMAZING CODE, I AM USING A DIFFERENT KIND OF BUBBLE MENU RIGHT NOW

// <div key={`suggestion-bubble-menu-FRAGMENT-${suggestionID}`}>
// <BubbleMenu
//   key={`suggestion-bubble-menu-TIPTAP-${suggestionID}`}
//   // https://chat.openai.com/c/b27ce5e7-dbc2-4d9c-9f0a-1260e2fee818
//   // https://tiptap.dev/docs/editor/api/extensions/floating-menu
//   // WITHOUT PLUGIN KEY, TIPPY DOESN'T WORK, REACT THINKS IT'S STILL THERE
//   // WHEN IS NOT
//   pluginKey={`pluginkey-bubble-menu-suggestion-${suggestionID}`}
//   editor={editor}
//   shouldShow={() => true}
//   tippyOptions={{
//     getReferenceClientRect: (): DOMRect => {
//       const element = document.querySelector(
//         // https://chat.openai.com/c/b9b1cdbf-2bf5-47f9-8439-9a418ccc774e
//         `.custom-suggestion[data-suggestion-id="${suggestionID}"]`
//       );
//       if (element) {
//         // Assuming getBoundingClientRect is available on the element
//         return element.getBoundingClientRect();
//       } else {
//         // Fallback to a default DOMRect if the element is not found
//         return new DOMRect();
//       }
//     },
//   }}
// >
//   <h1>{suggestionID}</h1>
//   <button
//     key={`suggestion-bubble-menu-ACCEPT-${suggestionID}`}
//     onClick={() => {
//       alert("accept " + suggestionID);
//       removeMarkWithId(editor, "customSuggestion", suggestionID);
//       // return;
//       // setSuggestionsIDs([
//       //   ...suggestionsIDs.filter((id) => id != suggestionID),
//       // ]);

//       updateExtensionsState();
//     }}
//   >
//     ACCEPT
//   </button>
//   <button
//     key={`suggestion-bubble-menu-REJECT-${suggestionID}`}
//     onClick={() => {
//       alert("reject " + suggestionID);
//       // return;
//       removeMarkWithId(
//         editor,
//         "customSuggestion",
//         suggestionID,
//         true
//       );
//       // return;

//       updateExtensionsState();
//     }}
//   >
//     REJECT
//   </button>
// </BubbleMenu>
// </div>
