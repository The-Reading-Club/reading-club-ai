"use client";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";

import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React from "react";

const Toolbar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="bg-gray-300 py-4">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "is-active bg-red-500" : ""
        }
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "is-active bg-red-500" : ""
        }
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "is-active bg-red-500" : ""
        }
      >
        H3
      </button>
      <button onClick={() => toggleBulletList(editor)}>Bullet List</button>
      <button onClick={() => toggleOrderedList(editor)}>Ordered List</button>
      <button onClick={() => setHeading(editor, 1)}>H1</button>
      <button onClick={() => setHeading(editor, 2)}>H2</button>
      <button onClick={() => addLink(editor)}>Add Link</button>
      <button onClick={() => removeLink(editor)}>Remove Link</button>
      <button onClick={() => setTextAlign(editor, "left")}>Left</button>
      <button onClick={() => setTextAlign(editor, "center")}>Center</button>
      <button onClick={() => setTextAlign(editor, "right")}>Right</button>
      <button onClick={() => setTextAlign(editor, "justify")}>Justify</button>
      <button onClick={() => insertCallout(editor)}>Callout</button>
    </div>
  );
};

export default Toolbar;

function toggleBulletList(editor: Editor) {
  editor.chain().focus().toggleBulletList().run();
}

function toggleOrderedList(editor: Editor) {
  editor.chain().focus().toggleOrderedList().run();
}

function setHeading(editor: Editor, level: number) {
  editor.chain().focus().toggleHeading({ level }).run();
}

function addLink(editor: Editor) {
  const url = prompt("Enter the URL");
  const text = prompt("Enter the link text");

  if (url && text) {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .insertContent(text)
      .run();
  }
}

function removeLink(editor: Editor) {
  editor.chain().focus().unsetLink().run();
}

function setTextAlign(editor: Editor, alignment: string) {
  editor.chain().focus().setTextAlign(alignment).run();
}

function insertCallout(editor: Editor) {
  const text = prompt("Enter callout text");
  if (text) {
    editor.chain().focus().setNode("callout", { text }).run();
  }

  // where should I place this code when using ::: to create a callout?
  //   // Set cursor position to be inside the callout node
  //   // The exact position will depend on your node's structure
  //   const position = editor.state.selection.anchor - 1; // Adjust as needed
  //   editor.commands.setTextSelection(position);
}
