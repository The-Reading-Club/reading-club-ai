"use server";
import React from "react";
import Landing3Client from "./Landing3Client";
import { fromTRCtoTiptapFormat, testData } from "@/data/json/tests";

import { promises as fs } from "fs";
import { readFileSync } from "fs";
import { TRCDictionary } from "@/lib/internationalization/dictionary";

interface Landing3ServerProps {
  dictionary: TRCDictionary;
}

const Landing3Server: React.FC<Landing3ServerProps> = async ({
  dictionary,
}) => {
  // const trcStoriesTestFileNames = [
  //   "monkeyupdownJunior1",
  //   "peacockandcraneJunior1",
  //   "goodelephantJunior1",
  //   "fairestcontestJunior1",
  //   "sunrisesuperpowerJunior1",
  //   "berrycountJunior1",
  //   "bearchangedJunior1",
  //   "eggrollJunior1",
  //   "wheresmycheeseJunior1",
  // ];

  const trcStoriesTestFileNames: string[] = [];

  const storiesTiptapFormat: any[] = [];

  trcStoriesTestFileNames.forEach((fileName) => {
    // check out how was supposed to be done in vercel guide
    const file = readFileSync(
      process.cwd() + `/src/data/json/${fileName}.json`,
      "utf8"
    );

    const fileContentJSON = JSON.parse(file);

    const storyTiptap = fromTRCtoTiptapFormat(fileContentJSON);

    storiesTiptapFormat.push(storyTiptap);
  });

  //   const trcTestData = testData;
  //   const tiptapTestData = fromTRCtoTiptapFormat(trcTestData);

  // read file from local server
  //   https://vercel.com/guides/loading-static-file-nextjs-api-route

  //   fs.readFile("public/data/json/tests.json", "utf8");

  //   https://vercel.com/guides/loading-static-file-nextjs-api-route#step-3-read-the-file
  //   const file = await fs.readFile(
  //     process.cwd() + "/src/data/json/sunrisesuperpowerJunior1.json",
  //     "utf8"
  //   );

  //   const test = fromTRCtoTiptapFormat(JSON.parse(file));

  return (
    <Landing3Client
      data={{
        // storiesTiptapFormat: [tiptapTestData],
        storiesTiptapFormat,
      }}
      dictionary={dictionary}
    />
  );
};

export default Landing3Server;
