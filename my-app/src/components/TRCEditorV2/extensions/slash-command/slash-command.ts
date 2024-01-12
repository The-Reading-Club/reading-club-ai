import { Editor, Extension } from "@tiptap/react";
import { Suggestion as Hint } from "@tiptap/suggestion";

interface CommandProps {
  editor: Editor;
  range: Range;
}

const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      hint: {
        char: "/",
        command: ({ editor, range, props }: CommandProps & { props: any }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Hint({
        editor: this.editor,
        ...this.options.hint,
      }),
    ];
  },
});
