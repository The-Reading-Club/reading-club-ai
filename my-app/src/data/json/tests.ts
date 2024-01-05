export function fromTRCtoTiptapFormat(data: any) {
  const trcPages = data["paragraphs"];

  const paragraphsArray: any = [];

  trcPages.forEach((page: any, page_i: number) => {
    const paragraphs = page["sentences"];

    paragraphs.forEach((paragraph: any, paragraph_j: number) => {
      const isIllustrationPage = page["illustration"] ? true : false;

      const text =
        page["illustration"] ??
        paragraph["words"]
          .map((w: any) => {
            return w["startPunctuation"] + w["word"] + w["endPunctuation"];
          })
          .join(" ");

      // For simplicity, if any of the words it's a bold, bold the whole paragraph.
      // and possibly, make it a heading, too.
      // The first and second paragraphs could be just headings actually.
      // The last one too. It does the job.

      let tiptapContentNode: any;

      if (isIllustrationPage == false) {
        tiptapContentNode = {
          type:
            (page_i == 0 && paragraph_j < 3) ||
            ["THE END", "THE END."].includes(text.toUpperCase())
              ? "heading"
              : "paragraph", // should be heading depending on situation,
          content: [
            {
              type: "text", // should be bold depending on situation
              // text: "<Paragraph text goes here>",
              text,
            },
          ],
        };
      } else {
        tiptapContentNode = {
          type: "image",
          attrs: {
            src: `https://storage.googleapis.com/reading-club-covers/images/${page["illustration"]}`,
            alt: page["illustration"],
            title: page["illustration"],
            width: "100%",
            height: null,
          },
        };
      }

      if (page_i == 0 && paragraph_j > 0 && paragraph_j < 3) {
        tiptapContentNode = { ...tiptapContentNode, attrs: { level: 2 } };
      }
      paragraphsArray.push(tiptapContentNode);
    });
  });

  const tiptapFormat = {
    type: "doc",
    content: paragraphsArray,
  };

  console.log(data);
  console.log(JSON.stringify(tiptapFormat, null, 2));

  return tiptapFormat;
}

export const testData_ = {
  metadata:
    "This is the source file for The Meaning of Life short story.. Chapter 1.",
  paragraphs: [
    {
      sentences: [
        {
          words: [
            {
              word: "Sunrise",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Superpower",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
        {
          words: [
            {
              word: "By",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Alexis",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Diamond",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "©",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "2023",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "The",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Reading",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Club",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Inc",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "All",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rights",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Reserved",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "Once",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "upon",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "small",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "near",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "forest",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "there",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "named",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happy",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "loved",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "nothing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "more",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "than",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "waking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "other",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "animals",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "with",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "loud",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "test",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "1-crow.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "One",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "noticed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "something",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "strange",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Every",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "appeared",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "in",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sky",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "First",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "would",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crow",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Then",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "would",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "come",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "This",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happened",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "after",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "over",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "over",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "again",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
  ],
};

export const testData = {
  metadata:
    "This is the source file for The Meaning of Life short story.. Chapter 1.",
  paragraphs: [
    {
      sentences: [
        {
          words: [
            {
              word: "Sunrise",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Superpower",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
        {
          words: [
            {
              word: "By",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Alexis",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Diamond",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "©",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "2023",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "The",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Reading",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Club",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Inc",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "All",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rights",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Reserved",
              wordType: "italic",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "Once",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "upon",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "small",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "near",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "forest",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "there",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "named",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happy",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "loved",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "nothing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "more",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "than",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "waking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "other",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "animals",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "with",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "loud",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "1-crow.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "One",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "noticed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "something",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "strange",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Every",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "appeared",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "in",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sky",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "First",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "would",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crow",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Then",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "would",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "come",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "This",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happened",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "after",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "over",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "over",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "again",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "2-sunrise.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thought",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "hard",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "why",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "this",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happening",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "For",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "next",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "few",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "days",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "spent",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "hours",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "watching",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "decided",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "maybe",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "causing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "come",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "told",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "other",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "animals",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "They",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "all",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thought",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "it",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "very",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "interesting",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "One",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "horse",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "named",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thought",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "exactly",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "right",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "3-horse.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "Well",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: ",",
            },
            {
              word: "it",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "just",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "so",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "true",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "said",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "who",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "large",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "strong",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "horse",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Every",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "you",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crow",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "comes",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".”",
            },
          ],
        },
        {
          words: [
            {
              word: "You",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "crow",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "then",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "BOOM",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "comes",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".”",
            },
          ],
        },
        {
          words: [
            {
              word: "And",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: ",",
            },
            {
              word: "so",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "said",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "with",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "very",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wise",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "look",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "her",
              wordType: "horse-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "horsey",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "face",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "I",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "think",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "you",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "control",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!”",
            },
          ],
        },
        {
          words: [
            {
              word: "That",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "’s",
            },
            {
              word: "some",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "superpower",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "you’ve",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "got",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "there",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "added",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "You",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "are",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "G.O.A.T.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "roosters",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "-",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Greatest",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "All",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!",
            },
            {
              word: "Keep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "good",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "work",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!”",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "walked",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "away",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "from",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "feeling",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "worried",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "just",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "young",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wasn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sure",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "ready",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "for",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "such",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "big",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "job",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "decided",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "would",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "get",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "an",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "clock",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "help",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "him",
              wordType: "rooster-isPronoun-objectivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wake",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "early",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "After",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "all",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "said",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "himself",
              wordType: "rooster-isPronoun-reflexivePronoun",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "It",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "’s",
            },
            {
              word: "like",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "said",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ":",
            },
            {
              word: "all",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "other",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "animals",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "are",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "counting",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "me",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!”",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wanted",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "do",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "job",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "right",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "4-clock.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "That",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "night",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "before",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "going",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "bed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "set",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "for",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "6:30",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "6:30",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "should",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "be",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "early",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "enough",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thought",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "himself",
              wordType: "rooster-isPronoun-reflexivePronoun",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "feeling",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "so",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "good",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "new",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "clock",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "system",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "so",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "worried",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "waking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "couldn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "fall",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "asleep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "quickly",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "tossed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "turned",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "in",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "bed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "for",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "while",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "until",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "finally",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "mama",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "suggested",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "try",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "counting",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sheep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "in",
              wordType: "normal",
              startPunctuation: "(",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "imagination",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ").",
            },
            {
              word: "So",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "what",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Counting",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sheep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "easy",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "for",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "him",
              wordType: "rooster-isPronoun-objectivePronoun",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "because",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "friends",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "with",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "lots",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sheep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Then",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "fell",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "asleep",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "right",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "away",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "But",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "not",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "go",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "off",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "6:30",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "kept",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sleeping",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "didn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wake",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "7",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
        {
          words: [
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "didn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "even",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wake",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "7:30",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "woke",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "very",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "late",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "8:00",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "What",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happened",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "5-wake-up.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "checked",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "clock",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "realized",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "made",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "mistake",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "set",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "alarm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "clock",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "for",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "6:30",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "p.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "instead",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "6:30",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a.m.",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
        {
          words: [
            {
              word: "Oh",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: ",",
            },
            {
              word: "no",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "what",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "bad",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "mistake",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!”",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thought",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "himself",
              wordType: "rooster-isPronoun-reflexivePronoun",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "All",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "animals",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "were",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "counting",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "me",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!”",
            },
          ],
        },
        {
          words: [
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "ran",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "window",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "great",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "surprise",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "saw",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "its",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "way",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "even",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "though",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "not",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "morning",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "6-door.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "That",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "when",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "realized",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "all",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wrong",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "NOT",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "making",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rise",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Waking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "late",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "morning",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "tested",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "proven",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "false",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "little",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "bit",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sad",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wasn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "true",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "but",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "also",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happy",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "have",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "learned",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "something",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "new",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "also",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "bit",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "relieved",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rising",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "didn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "depend",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "upon",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "him",
              wordType: "rooster-isPronoun-objectivePronoun",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "learned",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "just",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "because",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "two",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "things",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happen",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "same",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "doesn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "mean",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "one",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "causes",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "other",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Later",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "day",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "went",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "over",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "explained",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "everything",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "This",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "took",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "long",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "because",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "not",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "used",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thinking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "hard",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "whether",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theories",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "were",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "true",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "or",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "false",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "write",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "everything",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "down",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "had",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "put",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "her",
              wordType: "horse-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "reading",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "glasses",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
      illustration: "7-glasses.jpg",
    },
    {
      sentences: [
        {
          words: [
            {
              word: "But",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "patient",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "with",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "because",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wanted",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "know",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "truth",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Finally",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "understood",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Even",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "if",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "you’re",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "not",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "moving",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "around",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "you’re",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "still",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "great",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "rooster",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",”",
            },
            {
              word: "said",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Hannah",
              wordType: "horse-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "You’re",
              wordType: "normal",
              startPunctuation: "“",
              endPunctuation: "",
            },
            {
              word: "a",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "great",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "friend",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "too",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".”",
            },
          ],
        },
        {
          words: [
            {
              word: "After",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "more",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "careful",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "when",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "trying",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "understand",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "things",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "He",
              wordType: "rooster-isPronoun-personalPronoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "spent",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "even",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "more",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "watching",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "thinking",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "world",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "around",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "him",
              wordType: "rooster-isPronoun-objectivePronoun",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "And",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "from",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "then",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "on",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "only",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowed",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "when",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "felt",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "like",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "it",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "because",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "he",
              wordType: "rooster-isPronoun-personalPronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "knew",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "farm",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "friends",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "weren’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "depending",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "upon",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "him",
              wordType: "rooster-isPronoun-objectivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "lift",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "into",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sky",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
          ],
        },
        {
          words: [
            {
              word: "Crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "hobby",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "again",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ",",
            },
            {
              word: "not",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "job",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "It",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "much",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "better",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "that",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "way",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "!",
            },
          ],
        },
        {
          words: [
            {
              word: "THE",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "END",
              wordType: "bold",
              startPunctuation: "",
              endPunctuation: "",
            },
          ],
        },
      ],
    },
    {
      sentences: [
        {
          words: [
            {
              word: "1",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "What",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "notice",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "crowing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "2",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "What",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "think",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "was",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "causing",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "sun",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "come",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "up",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "3",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "How",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "realize",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "his",
              wordType: "rooster-isPronoun-possessivePronoun",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "theory",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "wasn’t",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "true",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "4",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "What",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "learn",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "two",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "things",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "happening",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "at",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "same",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "time",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "5",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "How",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "did",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "understanding",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "world",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "change",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "6",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "What",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "can",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "we",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "learn",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "from",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "about",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "being",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "open",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "new",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "ideas",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "7",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "How",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "is",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "experience",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "similar",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "to",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "our",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "own",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "experiences",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "understanding",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "world",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "8",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "How",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "is",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "’s",
            },
            {
              word: "experience",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "different",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "from",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "our",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "own",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "experiences",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "of",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "understanding",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "the",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "world",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
        {
          words: [
            {
              word: "9",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: ".",
            },
            {
              word: "How",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "can",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "we",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "use",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "what",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "Rocky",
              wordType: "rooster-isProperNoun-isCapitalized",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "learned",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "in",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "our",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "own",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "lives",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "and",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "",
            },
            {
              word: "decision-making",
              wordType: "normal",
              startPunctuation: "",
              endPunctuation: "?",
            },
          ],
        },
      ],
    },
  ],
};

// fromTRCtoTiptapFormat(testData);

const myOwnDamnEditorContent = {
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
