// https://tiptap.dev/docs/editor/api/extensions/bubble-menu
// I will need something like a bubble menu

// https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-highlight/src/highlight.ts

import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface CustomSuggestionOptions {
  multicolor: boolean;
  HTMLAttributes: Record<string, any>;
}

// https://chat.openai.com/c/19a2cb0e-80cb-45fa-a17f-56f1c212dd4c
import { v4 as uuidv4 } from "uuid"; // Assuming you are using uuid for generating unique IDs

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customSuggestion: {
      /**
       * Set a custom Suggestion mark
       */
      setCustomSuggestion: (attributes?: {
        color?: string;
        uuid: string;
      }) => ReturnType;
      /**
       * Toggle a custom Suggestion mark
       */
      toggleCustomSuggestion: (attributes?: {
        color?: string;
        uuid: string;
      }) => ReturnType;
      /**
       * Unset a custom Suggestion mark
       */
      unsetCustomSuggestion: () => ReturnType;
    };
  }
}

export const CustomSuggestion = Mark.create<CustomSuggestionOptions>({
  name: "customSuggestion",
  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    // extension option
    // I don't see why constraining shit so much.
    // It works out whether the user gives a color or not
    // This thing really messes everything up.
    // I ALWAYS WANT THE PARSING OF MY CONTENT

    // https://chat.openai.com/c/8e11d054-304c-4aa7-ada6-bf7691d629bd
    // if (!this.options.multicolor) {
    //   return {};
    // }

    const attributes: Record<string, any> = {
      color: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.color) {
            return {};
          }

          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`,
          };
        },
      },
      uuid: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const uuid = element.getAttribute("data-suggestion-id");
          console.log("Parsed uuid:", uuid); // Debug log
          return uuid;
        },
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.uuid) {
            return {};
          }

          return {
            "data-suggestion-id": attributes.uuid,
          };
        },
      },
    };

    return attributes;
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // Generate a unique iD for each highlight instance
    const suggestionId =
      HTMLAttributes["data-suggestion-id"] || "uuidv4() FROM RENDER HTML";

    // Merge the unique ID into the existing HTML attributes
    const mergedAttributes = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
      {
        "data-suggestion-id": suggestionId,
        class: "custom-suggestion", // A class for easier CSS/JS targeting
      }
    );

    //https://chat.openai.com/c/19a2cb0e-80cb-45fa-a17f-56f1c212dd4c
    // MERGE-D ED ED dont forget

    return ["mark", mergedAttributes, 0];
    // return [
    //   "mark",
    //   mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    //   0,
    // ];
  },

  addCommands() {
    return {
      setCustomSuggestion:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark("customSuggestion", attributes);
        },
      toggleCustomSuggestion:
        () =>
        ({ commands }) => {
          return commands.toggleMark("customSuggestion");
        },
      unsetCustomSuggestion:
        () =>
        ({ commands }) => {
          return commands.unsetMark("customSuggestion");
        },
    };
  },
});
