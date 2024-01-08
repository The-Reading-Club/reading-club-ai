"use client";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import { EditorContent, useEditor, Editor, nodeInputRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React from "react";
import Toolbar from "./Toolbar";

import { Node, mergeAttributes } from "@tiptap/react";

const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "inline*",
  defining: true,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "callout",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "div.callout",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  // Optionally, define an input rule to quickly create a callout from a markdown-like syntax.
  addInputRules() {
    return [
      nodeInputRule({
        find: /^:::$/, // When the user types ":::" on a new line, create a callout node.
        type: this.type,
      }),
    ];
  },
});

const setHeadingLevelClass = (level: number) => {
  switch (level) {
    case 1:
      return "text-h1";
    case 2:
      return "text-h2";
    case 3:
      return "text-h3";
    default:
      return "";
  }
};

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const id = node.attrs.id;
    HTMLAttributes.class = setHeadingLevelClass(level);
    return [`h${level}`, HTMLAttributes, 0];
  },
});

export default () => {
  const editor = useEditor({
    extensions: [
      Callout,

      TextAlign.configure({
        types: ["heading", "paragraph"], // Specify which types of nodes should be alignable
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      StarterKit.configure({
        listItem: { HTMLAttributes: { class: "bg-yellow-500" } },
        bulletList: {
          HTMLAttributes: {
            class: "bg-red-500 list-disc pl-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "bg-blue-500 list-decimal pl-5",
          },
        },
      }),
      Document,
      Paragraph,
      Text,
      CustomHeading.configure({ levels: [1, 2, 3] }),
    ],
    content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </>
  );
};
