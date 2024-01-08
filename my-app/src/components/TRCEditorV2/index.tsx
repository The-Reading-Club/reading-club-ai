"use client";
import React from "react";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import { EB_Garamond } from "next/font/google";
const garamondFont = EB_Garamond({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  weight: ["400", "800"],
  // https://github.com/vercel/next.js/issues/44456
  display: "swap",
});

import "@/styles/prosemirror.css";

interface TRCEditorV2Props {
  editorContent?: JSONContent | string;
  bgClass?: string;
  fontClass?: string;
  editorContainerClass?: string;
}

const TRCEditorV2: React.FC<TRCEditorV2Props> = ({
  editorContent,
  bgClass = "bg-[#FAF8DA]",
  fontClass = garamondFont.className,
  editorContainerClass = `${bgClass} ${fontClass} text-[#7B3F00] max-w-screen-sm`,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // duplicates in starterkit
      // Document,
      // Heading,
      //Paragraph,
      // Text,
      TextAlign,
      Image,
      Link,
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        //    class: `novel-prose-lg novel-prose-stone dark:novel-prose-invert prose-headings:novel-font-title novel-font-default focus:novel-outline-none novel-max-w-full`,
        class: `prose-lg focus:outline-none max-w-full`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={editorContainerClass}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TRCEditorV2;

const testcontent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Small World?",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "By Alexis Diamond.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "© 2023 The Reading Club, Inc. All Rights Reserved.",
        },
      ],
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
        src: "https://storage.googleapis.com/reading-club-covers/images/1-cave-crowd.jpg",
        alt: "1-cave-crowd.jpg",
        title: "1-cave-crowd.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "There was a little stream in the cave, which gave the bats water to drink. The cave was also home to insects that the bats loved to eat.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Among the many bats living in the cave, there was one small bat different from all the rest. This bat's name was Plato. He was a young bat, and he was always flying around the cave. In fact, Plato had so much energy that he was always zooming!",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/2-bat.jpg",
        alt: "2-bat.jpg",
        title: "2-bat.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato was curious about everything, including the cave where he lived with his family. He spent his days flying through the cave tunnels, exploring everything and everywhere.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "One day, Plato flew so far from his home that, for the first time, he found the cave entrance. There, at the mouth of the cave, he saw the light of the sun. He didn't know what sunlight was, but he knew he did not like it. Sunlight was too bright for his eyes.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "When Plato saw the cave entrance, he also saw, to his surprise, that he had been living in a cave.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/3-bat-2.jpg",
        alt: "3-bat-2.jpg",
        title: "3-bat-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The next day, and every day after, Plato made the long trip from his home to the cave entrance. Each time, he grew braver and braver, and he came closer and closer and closer to stepping out of the cave and into the sunshine. Little by little, his eyes became more used to the sunlight.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "One day, as the sun was setting and the sky grew dark, Plato peeked his head out of the cave. And what he saw was so pretty that it took his breath away.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/4-bat-3.jpg",
        alt: "4-bat-3.jpg",
        title: "4-bat-3.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato saw the sea, and he saw mountains, and trees. Plato saw birds flying. This was the first time that Plato had ever seen a bird.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato also saw the sun, low in sky, bathing everything in a golden light that made the sea sparkle. Even as it was setting, the sun was brighter than anything Plato had ever imagined.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/5-river.jpg",
        alt: "5-river.jpg",
        title: "5-river.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato was so excited! He zoomed back into the cave to share his news. He couldn't wait to tell the other bats about the world outside their cave.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato arrived home to find his family hunting tiny insects, lightning bugs, which glowed yellow and cast shadows on the cave walls.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/6-cave-2.jpg",
        alt: "6-cave-2.jpg",
        title: "6-cave-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Then Plato saw Aris, the oldest of the bats. Aris was the bat leader. Aris was so old that when she walked, she leaned on a small stick that the bats had found floating in the stream where they drank their water.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/7-bat-cave.jpg",
        alt: "7-bat-cave.jpg",
        title: "7-bat-cave.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Aris wasn't watching the bats, and she wasn't watching the lightning bugs. Aris was watching the cave wall, where light from the lightening bugs cast dark shadows.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Aris focused her old eyes on the wall as the dark bat shadows swirled and swooped, as the other bats flew wildly up, down, and all around the cave.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/8-bat-flying.jpg",
        alt: "8-bat-flying.jpg",
        title: "8-bat-flying.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: '"Why are you watching the wall?" Plato asked Aris',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `"I'm watching the world,” Aris answered, “so I can understand it."`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Well, I have big news for you!” Plato said.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“If you want to understand the world, then you should stop watching shadows on the wall,” Plato said. “You should leave the shadows behind.”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato took a deep breath.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“In fact,” Plato said, “if you want to understand the world, you should leave this cave behind!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Cave? What are you talking about?” Aris said.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `The other bats came nearer to listen.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/9-cave-crowd-2.jpg",
        alt: "9-cave-crowd-2.jpg",
        title: "9-cave-crowd-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“There is no world but our home here,” Aris said. “Everyone knows that.”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris looked at the other bats gathered around `,
        },
        // metadata could be named special
        // https://chat.openai.com/c/33fd5bda-118c-47b1-9e5d-101c32f79c40
        {
          type: "text",
          marks: [
            {
              type: "bold",
              attrs: {
                metadata: "secondary-isPronoun-objectivePronoun",
              },
            },
          ],
          text: `her`,
        },
        {
          type: "text",
          text: `. “Am I right?” Aris asked the crowd.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Yes, that's right!” the bats shouted. “Our home here is all there is!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato tried to tell the other bats about the outside world, but they just laughed. They told Plato that he was making things up.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“You're too young to understand the real world,” they said to him.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato knew what he had seen was real. He also knew that if he was going to change the other bats' minds, then he needed to show them proof of the world outside the cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `When all the other bats went to bed, Plato flew out to the mouth of the cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `He flew further into the world than he ever had before. At first, Plato was afraid. But as he flew higher, he saw stars twinkling in the sky. He saw the moon glowing yellow, above the trees. Everything looked so lovely!`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/10-bat-flying-night.jpg",
        alt: "10-bat-flying-night.jpg",
        title: "10-bat-flying-night.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `And then he saw it, and Plato knew it was just exactly the proof he needed.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `It was a rose, blooming from the top of a tree stump.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/11-tree.jpg",
        alt: "11-tree.jpg",
        title: "11-tree.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `It took Plato hours to fly home with the rose. He was very tired when he landed in front of Aris, carrying his prize.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/12-bat-flower.jpg",
        alt: "12-bat-flower.jpg",
        title: "12-bat-flower.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris was just waking up to start her day. When she saw the rose, she was stunned.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris knew what the rose meant. She knew that Plato had told the truth about the world outside the cave. She knew then that they all really were living in a cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `She knew that their cave, which had been their whole world, was actually just a tiny part of a much larger universe.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Tonight,” Aris announced to all bats, “Plato will lead us, as we explore this new world together!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `When the bats heard this, they all cheered. They were eager to explore a world they had never dreamed of, full of wonders like the rose Plato had brought them.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `From that day on, Aris chose Plato to be the chief scout of all bats. The bats continued to live in their cave, but now they left the cave, following Plato, almost every night, seeking adventure, learning about the wider world, and of course, living happily ever after.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/13-bats-moon.jpg",
        alt: "13-bats-moon.jpg",
        title: "13-bats-moon.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: `The End.`,
        },
      ],
    },
  ],
};
const myOwnDamnEditorContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Small World?",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "By Alexis Diamond.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "© 2023 The Reading Club, Inc. All Rights Reserved.",
        },
      ],
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
        src: "https://storage.googleapis.com/reading-club-covers/images/1-cave-crowd.jpg",
        alt: "1-cave-crowd.jpg",
        title: "1-cave-crowd.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "There was a little stream in the cave, which gave the bats water to drink. The cave was also home to insects that the bats loved to eat.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Among the many bats living in the cave, there was one small bat different from all the rest. This bat's name was Plato. He was a young bat, and he was always flying around the cave. In fact, Plato had so much energy that he was always zooming!",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/2-bat.jpg",
        alt: "2-bat.jpg",
        title: "2-bat.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato was curious about everything, including the cave where he lived with his family. He spent his days flying through the cave tunnels, exploring everything and everywhere.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "One day, Plato flew so far from his home that, for the first time, he found the cave entrance. There, at the mouth of the cave, he saw the light of the sun. He didn't know what sunlight was, but he knew he did not like it. Sunlight was too bright for his eyes.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "When Plato saw the cave entrance, he also saw, to his surprise, that he had been living in a cave.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/3-bat-2.jpg",
        alt: "3-bat-2.jpg",
        title: "3-bat-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The next day, and every day after, Plato made the long trip from his home to the cave entrance. Each time, he grew braver and braver, and he came closer and closer and closer to stepping out of the cave and into the sunshine. Little by little, his eyes became more used to the sunlight.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "One day, as the sun was setting and the sky grew dark, Plato peeked his head out of the cave. And what he saw was so pretty that it took his breath away.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/4-bat-3.jpg",
        alt: "4-bat-3.jpg",
        title: "4-bat-3.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato saw the sea, and he saw mountains, and trees. Plato saw birds flying. This was the first time that Plato had ever seen a bird.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato also saw the sun, low in sky, bathing everything in a golden light that made the sea sparkle. Even as it was setting, the sun was brighter than anything Plato had ever imagined.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/5-river.jpg",
        alt: "5-river.jpg",
        title: "5-river.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato was so excited! He zoomed back into the cave to share his news. He couldn't wait to tell the other bats about the world outside their cave.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Plato arrived home to find his family hunting tiny insects, lightning bugs, which glowed yellow and cast shadows on the cave walls.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/6-cave-2.jpg",
        alt: "6-cave-2.jpg",
        title: "6-cave-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Then Plato saw Aris, the oldest of the bats. Aris was the bat leader. Aris was so old that when she walked, she leaned on a small stick that the bats had found floating in the stream where they drank their water.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/7-bat-cave.jpg",
        alt: "7-bat-cave.jpg",
        title: "7-bat-cave.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Aris wasn't watching the bats, and she wasn't watching the lightning bugs. Aris was watching the cave wall, where light from the lightening bugs cast dark shadows.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Aris focused her old eyes on the wall as the dark bat shadows swirled and swooped, as the other bats flew wildly up, down, and all around the cave.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/8-bat-flying.jpg",
        alt: "8-bat-flying.jpg",
        title: "8-bat-flying.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: '"Why are you watching the wall?" Plato asked Aris',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `"I'm watching the world,” Aris answered, “so I can understand it."`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Well, I have big news for you!” Plato said.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“If you want to understand the world, then you should stop watching shadows on the wall,” Plato said. “You should leave the shadows behind.”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato took a deep breath.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“In fact,” Plato said, “if you want to understand the world, you should leave this cave behind!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Cave? What are you talking about?” Aris said.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `The other bats came nearer to listen.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/9-cave-crowd-2.jpg",
        alt: "9-cave-crowd-2.jpg",
        title: "9-cave-crowd-2.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“There is no world but our home here,” Aris said. “Everyone knows that.”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris looked at the other bats gathered around `,
        },
        // metadata could be named special
        // https://chat.openai.com/c/33fd5bda-118c-47b1-9e5d-101c32f79c40
        {
          type: "text",
          marks: [
            {
              type: "bold",
              attrs: {
                metadata: "secondary-isPronoun-objectivePronoun",
              },
            },
          ],
          text: `her`,
        },
        {
          type: "text",
          text: `. “Am I right?” Aris asked the crowd.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Yes, that's right!” the bats shouted. “Our home here is all there is!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato tried to tell the other bats about the outside world, but they just laughed. They told Plato that he was making things up.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“You're too young to understand the real world,” they said to him.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Plato knew what he had seen was real. He also knew that if he was going to change the other bats' minds, then he needed to show them proof of the world outside the cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `When all the other bats went to bed, Plato flew out to the mouth of the cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `He flew further into the world than he ever had before. At first, Plato was afraid. But as he flew higher, he saw stars twinkling in the sky. He saw the moon glowing yellow, above the trees. Everything looked so lovely!`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/10-bat-flying-night.jpg",
        alt: "10-bat-flying-night.jpg",
        title: "10-bat-flying-night.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `And then he saw it, and Plato knew it was just exactly the proof he needed.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `It was a rose, blooming from the top of a tree stump.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/11-tree.jpg",
        alt: "11-tree.jpg",
        title: "11-tree.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `It took Plato hours to fly home with the rose. He was very tired when he landed in front of Aris, carrying his prize.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/12-bat-flower.jpg",
        alt: "12-bat-flower.jpg",
        title: "12-bat-flower.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris was just waking up to start her day. When she saw the rose, she was stunned.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `Aris knew what the rose meant. She knew that Plato had told the truth about the world outside the cave. She knew then that they all really were living in a cave.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `She knew that their cave, which had been their whole world, was actually just a tiny part of a much larger universe.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `“Tonight,” Aris announced to all bats, “Plato will lead us, as we explore this new world together!”`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `When the bats heard this, they all cheered. They were eager to explore a world they had never dreamed of, full of wonders like the rose Plato had brought them.`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: `From that day on, Aris chose Plato to be the chief scout of all bats. The bats continued to live in their cave, but now they left the cave, following Plato, almost every night, seeking adventure, learning about the wider world, and of course, living happily ever after.`,
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/reading-club-covers/images/13-bats-moon.jpg",
        alt: "13-bats-moon.jpg",
        title: "13-bats-moon.jpg",
        width: "100%",
        height: null,
      },
    },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: `The End.`,
        },
      ],
    },
  ],
};
