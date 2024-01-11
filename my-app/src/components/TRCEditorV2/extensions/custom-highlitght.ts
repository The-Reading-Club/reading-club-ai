// https://tiptap.dev/docs/editor/api/extensions/bubble-menu
// I will need something like a bubble menu

import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface CustomHighlightOptions {
  multicolor: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customHighlight: {
      /**
       * Set a custom highlight mark
       */
      setCustomHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Toggle a custom highlight mark
       */
      toggleCustomHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Unset a custom highlight mark
       */
      unsetCustomHighlight: () => ReturnType;
    };
  }
}

export const CustomHighlight = Mark.create<CustomHighlightOptions>({
  name: "customHighlight",
  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }

    return {
      color: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color} color: inherit`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setCustomHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark("customHighlight", attributes);
        },
      toggleCustomHighlight:
        () =>
        ({ commands }) => {
          return commands.toggleMark("customHighlight");
        },
      unsetCustomHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark("customHighlight");
        },
    };
  },
});
