"use client";

// REACT BOILERPLATE
import React, { useEffect, useRef, useState } from "react";

// TIPTAP REACT CORE
import {
  BubbleMenu,
  Editor,
  EditorContent,
  // FloatingMenu,
  // FloatingMenuProps, // excludes element
  JSONContent,
  useEditor,
} from "@tiptap/react";

import { Mark } from "@tiptap/pm/model";

// PROSEMIRROR

// import { PluginKey } from "prosemirror-state";
import "@/styles/prosemirror.css";

// THIRD PARTY UTILITY LIBRARIES

import { useCompletion } from "ai/react";
import { RequestOptions } from "ai";
import { v4 as uuidv4 } from "uuid"; // Assuming you are using uuid for generating unique IDs
import { BoldIcon, CheckIcon, X, XIcon } from "lucide-react";
// import { diffChars } from "diff";

// IN-HOUSE UTILITY LIBRARIES AND HOOKS

import { getPrevText } from "@/lib/editor";
import useMounted from "@/lib/hooks/useMounted";

// IN-HOUSE COMPONENTS

import TRCEditorBubbleMenu from "./components/TRCEditorBubbleMenu";
// import { CustomBubbleMenu } from "./CustomBubbleMenu"; // Good but I don't need to manipulate too many inner workings

// DEFAULT DATA
import {
  caveStoryTestTipTapJSON,
  caveStoryTestTipTapJSONV2,
  contentWithSuggestions,
} from "./data/default-content";
import { dev } from "@/config";

// STATE MANAGEMENT (ZUSTAND)
import { useTRCAppConfigStore, useTRCEditorStore } from "@/stores/store";

// FONT (should probably move somewhere else)

import { EB_Garamond } from "next/font/google";
import {
  defaultCustomExtensions,
  defaultTiptapExtensions,
  getConfiguredCollaborationExtension,
} from "./extensions";
import SlashCommand from "./extensions/slash-command";
import { CustomSuggestion } from "./extensions/custom-suggestion";
import { DebouncedState, useDebouncedCallback } from "use-debounce";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { MetadataExtension } from "./extensions/metadata";
import { useProModal } from "@/lib/hooks/useModals";
import { devAlert } from "@/lib/utils";
import { ImageResizer } from "./extensions/image-resizer";
const garamondFont = EB_Garamond({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  weight: ["400", "800"],
  // https://github.com/vercel/next.js/issues/44456
  display: "swap",
});

//  TRCEditorV2 COMPONENT

interface TRCEditorV2Props {
  editorContent?: JSONContent; //| string;
  bgClass?: string;
  fontClass?: string;
  editorContainerClass?: string;
  editorKey: string;
  enableLocalStorage?: boolean;
  onEditorChange?: (content: JSONContent) => void;
  editable?: boolean;
  title?: string;
  author?: string;
}

const TRCEditorV2: React.FC<TRCEditorV2Props> = ({
  editorContent,
  bgClass = "bg-[#FAF8DA]",
  fontClass = garamondFont.className,
  editorContainerClass = `${bgClass} ${fontClass} text-[#7B3F00] max-w-screen-sm overflow-scroll w-full`,
  editorKey,
  enableLocalStorage = false,
  onEditorChange,
  editable = true,
  title,
  author,
}) => {
  // REACT REFS
  const editorRef = useRef<Editor | null>(null);
  // HYDRATION
  const mounted = useMounted();
  const [hydrated, setHydrated] = useState(false);

  // STATE MANAGEMENT
  const {
    suggestionsIDs,
    setSuggestionsIDs,
    // editorContent: editorContentState,
    // setEditorContent,
    storiesData,
    setStoriesData,

    setEditorInstance,
  } = useTRCEditorStore();
  // const [suggestionsIDs, setSuggestionsIDs] = useState<string[]>([]);

  const updateSuggestionsState = () => {
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

  const [editorContentPersistedState, setEditorContentPersistedState] =
    useLocalStorage(
      `TRC-EDITOR-CONTENT-TEST-${editorKey}`, //editorContent ??
      caveStoryTestTipTapJSON
    );

  // Default: Hydrate the editor with the content from localStorage.
  // If disableLocalStorage is true, hydrate the editor with the defaultValue.
  useEffect(() => {
    if (!editorRef.current || hydrated) return;

    const value =
      enableLocalStorage == true ? editorContentPersistedState : editorContent;

    if (title && value) {
      // editorRef.current.commands.setTitle(title);
      const titleTiptapJSON = {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: title,
          },
        ],
      };

      const authorTiptapJSON = {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: `By ${author ?? "Anonymous"}`,
          },
        ],
      };

      value["content"] = [
        titleTiptapJSON,
        authorTiptapJSON,
        ...(value["content"] ? value["content"] : []),
      ];
    }

    if (value) {
      editorRef.current.commands.setContent(value);
      setHydrated(true);
    }
  }, [
    editorRef.current,
    editorContent,
    editorContentPersistedState,
    hydrated,
    enableLocalStorage,
  ]);

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: Editor }) => {
      const editorJSON = editor.getJSON();

      if (enableLocalStorage == true) {
        setEditorContentPersistedState(editorJSON);

        // we'll move to this only later
        setStoriesData({
          [editorKey]: {
            ...storiesData[editorKey],
            tiptapEditorContent: editorJSON,
          },
        });
      }

      if (onEditorChange) {
        onEditorChange(editorJSON);
      }
    },
    750
  );

  //#region ****** AI COMPLETION START ******

  const { complete, completion, isLoading, stop } = useTRCEditorV2Completion(
    editorRef,
    updateSuggestionsState
  );

  //#endregion ****** AI COMPLETION END ******

  //#region ****** TIPTAP EDITOR START ******

  // const editorContent_ =
  //   editorContentPersistedState == null
  //     ? editorContent ?? caveStoryTestTipTapJSON
  //     : editorContentPersistedState;

  const editor = useTRCEditorV2TiptapEditor(
    editorContentPersistedState,
    editorKey,
    isLoading,
    complete,
    debouncedUpdates,
    editable
  );

  // https://chat.openai.com/c/df2cbdbd-8f35-4dfc-b8ed-09b32261ca58
  useEffect(() => {
    if (editor) {
      setEditorInstance(editor);
    }
    // Cleanup editor on component unmount
    return () => editor?.destroy();
  }, [editor, setEditorInstance]);

  // Do I need this use effect
  // Yes, it is very important
  useEffect(() => {
    editorRef.current = editor;
    updateSuggestionsState();
  }, [editor]);

  //#endregion ****** TIPTAP EDITOR END ******

  // verify whether this is actually needed
  // no, it doesnt seem so
  // useEffect(() => {
  //   if (editor) {
  //     updateSuggestionsState();
  //   }
  // }, [editor]);

  // REACT TSX
  if (!editor) {
    return null;
  }

  return (
    <div
      className={editorContainerClass}
      style={{
        // border: "2px solid red",
        minHeight: "100vh",
      }}
    >
      {/* <p>{JSON.stringify({ suggestionsIDs })}</p> */}
      <div>
        {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
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

// COMPONENT FUNCTIONS

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
          if (dev == true) alert("FOUND MARK AND REMOVING IT " + uuid);
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

// COMPONENT HOOKS

function useTRCEditorV2Completion(
  editorRef: React.MutableRefObject<Editor | null>,
  updateSuggestionsState: () => void
) {
  //#region ****** USE COMPLETION START ******
  const completionResult = useCompletion({
    id: "trc-editor-v2",
    // api: "api/generate",
    api: `${process.env.NEXT_PUBLIC_APP_URL}/api/generate`,
    // body:Extra body object to be sent with the API request.
    onFinish: (prompt, completion) => {
      editorRef.current?.commands.setTextSelection({
        // basically you set the cursor back to where it was
        from: editorRef.current.state.selection.from - completion.length,
        to: editorRef.current.state.selection.from,
      });

      // Right now all completions are for suggestions, but I wonder if I should do it differently later on
      updateSuggestionsState();

      useTRCAppConfigStore.getState().addUpApiSuccessCallsCount();
    },
    onError: (err) => {
      // toast.error(err.message)
      alert(err.message);
      // there's gotta be a more formal status code for this
      // if (err.message == "Rate limit exceeded for the day")
      // TODO: SERIOUSLY SWITCH TO STATUS CODES!!!
      devAlert("AI COMPLETION ERROR: " + JSON.stringify(err));
      if (err.message == "Free trial has expired") {
        //va.track("Rate Limit Reached")
        alert("Rate Limit Reached");

        useProModal.getState().onOpen();
      }
    },
  });

  const { completion, isLoading } = completionResult;

  // move this to ai completion hook
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
    if (
      editorRef.current?.isActive("customSuggestion") == false &&
      completion != ""
    ) {
      // alert("Setting a new suggestion! " + completion);
      editorRef.current.commands.setCustomSuggestion({
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

    editorRef.current?.commands.insertContent(diff);
  }, [isLoading, editorRef.current, completion]);

  return completionResult;
  //#endregion ****** USE COMPLETION END ******
}

function useTRCEditorV2TiptapEditor(
  editorContent: JSONContent | string,
  editorKey: string,
  isLoading: boolean,
  complete: (
    prompt: string,
    options?: RequestOptions | undefined
  ) => Promise<string | null | undefined>,
  debouncedUpdates: DebouncedState<({ editor }: any) => Promise<void>>,
  editable: boolean
) {
  const editor = useEditor({
    extensions: [
      ...defaultTiptapExtensions,
      ...defaultCustomExtensions,
      getConfiguredCollaborationExtension(editorKey),
      MetadataExtension.configure({
        key: editorKey,
      }),
    ],
    editable: editable,
    // content: editorContent,
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

        debouncedUpdates(e);
      }
    },
  });

  return editor;
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
