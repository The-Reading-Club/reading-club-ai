import { Editor, Extension, ReactRenderer } from "@tiptap/react";
import { Suggestion as Hint } from "@tiptap/suggestion";
import { getHintItems } from "./CommandList";

const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      hint: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
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


const renderItems = () => {
  let component: ReactRenderer | null = null
  let popup: any | null = null
}

// I could have added this on the react editor component
const SlashCommand = Command.configure({
  hint: {
    items: getHintItems,
    render: renderitem
  }
})


export default 