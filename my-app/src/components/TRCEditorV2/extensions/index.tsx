// import Highlight from "./custom-highlitght";

// TIPTAP EXTENSIONS (NOT MINE)

import StarterKit from "@tiptap/starter-kit";

// import Document from "@tiptap/extension-document";
// import Heading from "@tiptap/extension-heading";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
// import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
// https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-highlight/src/highlight.ts
// https://www.npmjs.com/package/@tiptap/extension-highlight
// https://tiptap.dev/docs/editor/api/marks/highlight
// import Highlight from "@tiptap/extension-highlight";
// import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu";
// import FloatingMenu from "@tiptap/extension-floating-menu";

import TiptapImage from "@tiptap/extension-image";

// https://tiptap.dev/docs/editor/api/extensions/collaboration
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { Extensions } from "@tiptap/react";
// https://github.com/ueberdosis/tiptap/blob/main/demos/src/Experiments/MultipleEditors/Vue/index.vue
const ydoc = new Y.Doc();

// TIPTAP EXTENSIONS (MINE) & CUSTOM PLUGINS

import SlashCommand from "./slash-command";
// import { CustomHighlight } from "./extensions/custom-highlitght"; // Just a replication test
import { CustomSuggestion } from "./custom-suggestion";
import UploadImagesPlugin from "../plugins/upload-images";

export const defaultTiptapExtensions: Extensions = [
  StarterKit.configure({
    // https://github.com/ueberdosis/tiptap/issues/2827
    // https://github.com/nextcloud/text/issues/3805
    // https://github.com/ueberdosis/tiptap/issues/2761
    // The Collaboration extension comes with its own history handling
    history: false,
  }),
  // I need to clean this super huge component
  // duplicates in starterkit
  // Document,
  // Heading,
  //Paragraph,
  // Text,
  TextAlign,
  TiptapImage.extend({
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
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()];
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "novel-rounded-lg novel-border novel-border-stone-200",
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
  Placeholder.configure({
    placeholder: ({ node }) => {
      // if (node.type.name === "heading") {
      //   return `Heading ${node.attrs.level}`;
      // }
      return "Press '/' for commands, or '++' for autocomplete...";
    },
    includeChildren: true,
  }),
];

export const defaultCustomExtensions: Extensions = [
  SlashCommand,
  CustomSuggestion.configure({
    // multicolor: true,
    HTMLAttributes: {
      class: "bg-primary",
    },
  }),
];

export const getConfiguredCollaborationExtension = (editorKey: string) => {
  return Collaboration.configure({
    document: ydoc,
    field: editorKey,
  });
};

// export { Highlight as CustomHighlight };
// maybe like this
// export { CustomHighlight as CustomHighlightExtension };
