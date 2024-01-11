// https://github.com/ueberdosis/tiptap/blob/develop/packages/react/src/BubbleMenu.tsx

import {
  BubbleMenuPlugin,
  BubbleMenuPluginProps,
} from "@tiptap/extension-bubble-menu";
import React, { useEffect, useState } from "react";

// import { useCurrentEditor } from "./Context.js";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BubbleMenuProps = Omit<
  Optional<BubbleMenuPluginProps, "pluginKey" | "editor">,
  "element"
> & {
  className?: string;
  children: React.ReactNode;
  updateDelay?: number;
};

export const CustomBubbleMenu = (props: BubbleMenuProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const { editor: currentEditor } = props;
  //   const { editor: currentEditor } = useCurrentEditor();

  useEffect(() => {
    if (!element) {
      return;
    }

    if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
      return;
    }

    const {
      pluginKey = "bubbleMenu",
      editor,
      tippyOptions = {
        getReferenceClientRect: (): DOMRect => {
          const element = document.querySelector(".custom-suggestion");
          if (element) {
            // Assuming getBoundingClientRect is available on the element
            return element.getBoundingClientRect();
          } else {
            // Fallback to a default DOMRect if the element is not found
            return new DOMRect();
          }
        },
      },
      updateDelay,
      shouldShow = () => true,
    } = props;

    const menuEditor = editor || currentEditor;

    if (!menuEditor) {
      console.warn(
        "BubbleMenu component is not rendered inside of an editor component or does not have editor prop."
      );
      return;
    }

    const plugin = BubbleMenuPlugin({
      updateDelay,
      editor: menuEditor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    });

    menuEditor.registerPlugin(plugin);
    return () => menuEditor.unregisterPlugin(pluginKey);
  }, [props.editor, currentEditor, element]);

  return (
    <div
      ref={(dom) => {
        setElement(dom);
        // return;

        /* TESTS START
        if (dom) {
          dom.style.border = "5px solid red";
          if (dom.parentElement != null) {
            dom.parentElement.style.border = "5px solid green";

            if (document.querySelector(".custom-suggestion") != null) {
              const test = document.querySelector(
                ".custom-suggestion"
              ) as HTMLElement;

              test.style.border = "5px solid blue";
            }

            // document.querySelector(".custom-suggestion")?.insertAdjacentHTML()

            // setElement(
            //   document.querySelector(".custom-suggestion") as HTMLDivElement
            // );
          }
          //   dom.textContent = dom.textContent == "HELLO" ? "WORLD" : "HELLO";

          setElement(dom);

          //   setElement(
          //     dom.parentElement.querySelector(".custom-suggestion") as HTMLElement
          //   );
        }
        */ //TESTS START

        // setElement(
        //   document.querySelector(".custom-suggestion") as HTMLDivElement
        // );
      }}
      className={props.className}
      style={{ visibility: "hidden" }}
    >
      {props.children}
    </div>
  );
};
// import {
//   BubbleMenuPlugin,
//   BubbleMenuPluginProps,
// } from "@tiptap/extension-bubble-menu";
// import { Editor } from "@tiptap/react";
// import React, { useEffect, useRef, useState } from "react";

// // import { useCurrentEditor } from "./Context.js";

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// // export type BubbleMenuProps = BubbleMenuPluginProps & {
// //   className?: string;
// //   children: React.ReactNode;
// //   updateDelay?: number;
// // };

// export type BubbleMenuProps = Omit<
//   Optional<BubbleMenuPluginProps, "pluginKey" | "editor">,
//   "element"
// > & {
//   className?: string;
//   children: React.ReactNode;
//   updateDelay?: number;
// };

// export const CustomBubbleMenu = (props: BubbleMenuProps) => {
//   const [element, setElement] = useState<HTMLElement | null>(null);
//   //   const element = useRef(null);

//   const { editor: currentEditor } = props;

//   //   const elementRef = React.useRef<HTMLDivElement>(null);
//   //   useEffect(() => {
//   //     setElement(document.querySelector(".custom-suggestion") as HTMLElement);
//   //   }, [props.editor]);

//   //   const {
//   //     pluginKey,
//   //     // elementClassName
//   //   } = props;
//   //   const element = document.querySelector(".custom-suggestion") as HTMLElement;

//   //   if (element != null) {
//   //     alert(element);
//   //   }
//   useEffect(() => {
//     if (!element) {
//       return;
//     }

//     if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
//       return;
//     }

//     const {
//       pluginKey = "floatingMenu",
//       editor,
//       tippyOptions = {},
//       updateDelay,
//       shouldShow = null,
//     } = props;

//     const menuEditor = editor || currentEditor;

//     if (!menuEditor) {
//       console.warn(
//         "BubbleMenu component is not rendered inside of an editor component or does not have editor prop."
//       );
//       return;
//     }

//     // setElement();

//     const plugin = BubbleMenuPlugin({
//       updateDelay,
//       editor: menuEditor,
//       element,
//       pluginKey,
//       shouldShow,
//       tippyOptions,
//     });

//     menuEditor.registerPlugin(plugin);
//     return () => menuEditor.unregisterPlugin(pluginKey);
//   }, [props.editor?.getHTML(), props.editor, currentEditor]);

//   return (
//     <div
//       ref={setElement}
//       className={props.className}
//       //   style={{ visibility: "hidden" }}
//     >
//       {props.children}
//     </div>
//   );
// };
