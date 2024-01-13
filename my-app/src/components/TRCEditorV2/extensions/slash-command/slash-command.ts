import { Editor, Extension, ReactRenderer } from "@tiptap/react";
import { Suggestion as Hint } from "@tiptap/suggestion";
import CommandList, { getHintItems } from "./CommandList";

// impressive
import tippy from "tippy.js";

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
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // what a hacker
      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onkeydown: (props: { editor: Editor; event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      // why???
      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

// I could have added this on the react editor component
const SlashCommand = Command.configure({
  hint: {
    items: getHintItems,
    render: renderItems,
  },
});

export default SlashCommand;
