"use client";
import { Editor as NovelEditor } from "novel";
import React, { useState } from "react";

import { EB_Garamond } from "next/font/google";

// https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx
import UpdatedImage from "@/components/NovelEditorExtensions/updated-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

const garamondFont = EB_Garamond({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  weight: ["400", "800"], // can add more weights, pretty cool
  // style: "italic",
  //   variable: "--font-title",
});

const EditorPage = () => {
  // I want to check out my database
  // I want to download my JSON files
  // Cache this shit please with Redis instead and use secure links
  // and then take the JSON files, and parse them here into this format
  // And let people edit shit

  //   const [docContent, setDocContent] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: "5px solid red",
      }}
      className="bg-[#FCF29A]"
    >
      {/* {`Write & Publish Children's Books with AI`} */}

      <NovelEditor
        defaultValue={myOwnDamnEditorContent}
        disableLocalStorage={true}
        // https://www.npmjs.com/package/novel
        /**
         * "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
         */
        className={`${garamondFont.className} bg-[#FAF8DA] text-[#7B3F00] max-w-screen-sm`}
        editorProps={{
          attributes: {
            class: `novel-prose-lg novel-prose-stone dark:novel-prose-invert  novel-font-default focus:novel-outline-none novel-max-w-full`,
          },
          //prose-headings-CANCEL-THIS:novel-font-title-CANCEL-THIS
        }}
        extensions={[
          UpdatedImage.configure({
            HTMLAttributes: {
              class: "novel-rounded-lg novel-border novel-border-stone-200",
            },
          }),
        ]}
        storageKey="reading__club__ai__novel__content"
      />
    </div>
  );
};

export default EditorPage;

const myOwnDamnEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Small World" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Once upon a time, deep in a dark cave, there lived a large family of bats. I don't know how many bats. It was somewhere between 50 and 100 bats. It was a very big bat family.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This bat family never left their cave.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Why? Why did they never leave it?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The strange truth is that all the bats had been born deep in the heart of the cave. Since none of them had ever left the cave, none even knew they were in a cave. The cave, for them, was the whole entire world.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "And life in the cave was not too bad.",
        },
      ],
    },
    // https://pjrjxbdononaezaz.public.blob.vercel-storage.com/1-cave-crowd.jpg-HJ59IUC563MnlCkNz9S9lxm3AiuqXd.jpeg
    {
      type: "image",
      attrs: {
        src: "https://pjrjxbdononaezaz.public.blob.vercel-storage.com/1-cave-crowd.jpg-HJ59IUC563MnlCkNz9S9lxm3AiuqXd.jpeg",
        alt: "banner.png",
        title: "banner.png",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "And life in the cave was not too bad.",
        },
      ],
    },
  ],
};

const exampleContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/steven-tey/novel",
                target: "_blank",
                class:
                  "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
              },
            },
          ],
          text: "Hello World from Novel, Jose here!",
        },
        {
          type: "text",
          text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                class:
                  "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
              },
            },
          ],
          text: "Tiptap",
        },
        { type: "text", text: " + " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://sdk.vercel.ai/docs",
                target: "_blank",
                class:
                  "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
              },
            },
          ],
          text: "Vercel AI SDK",
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Installation" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "npm i novel" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Usage" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: 'import { Editor } from "novel";\n\nexport default function App() {\n  return (\n     <Editor />\n  )\n}',
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI autocomplete (type " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        alt: "banner.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star us on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/steven-tey/novel",
                        target: "_blank",
                        class:
                          "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                      },
                    },
                  ],
                  text: "GitHub",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Install the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://www.npmjs.com/package/novel",
                        target: "_blank",
                        class:
                          "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                      },
                    },
                  ],
                  text: "NPM package",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://vercel.com/templates/next.js/novel",
                        target: "_blank",
                        class:
                          "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                      },
                    },
                  ],
                  text: "Deploy your own",
                },
                { type: "text", text: " to Vercel" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
