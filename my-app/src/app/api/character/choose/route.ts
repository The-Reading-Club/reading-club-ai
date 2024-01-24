import { CHARACTER_ATTRIBUTES } from "@/data/character";

export const runtime = "edge";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { BasicCharacterAttributes } from "../identify/utils";
import {
  callOpenaiChooseCharacter,
  callOpenaiChooseCharacterStream,
  parseChosenCharactersJSON,
} from "./utils";

const openaiOfficialSDK = new OpenAI({ apiKey: process.env.OAI_KEY });

export async function POST(request: Request) {
  const reqJSON = await request.json();
  const { existingCharacters, storyText, sceneText } = reqJSON.body;

  try {
    const response = await callOpenaiChooseCharacterStream(
      existingCharacters,
      storyText,
      sceneText
    );

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);

    // const chosenCharacterJSON = parseChosenCharactersJSON(results);

    // console.log(chosenCharacterJSON);

    // return NextResponse.json(chosenCharacterJSON, { status: 200 });
  } catch (e) {
    console.log(e);

    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const results = await callOpenaiChooseCharacter(
      existingCharactersTest,
      storyTextTest,
      "When Plato saw the cave entrance, he also saw, to his surprise, that he had been living in a cave."
    );

    const chosenCharacterJSON = parseChosenCharactersJSON(results);

    console.log(chosenCharacterJSON);

    return NextResponse.json(chosenCharacterJSON, { status: 200 });
  } catch (e) {
    console.log(e);

    return new NextResponse("Error", { status: 500 });
  }
}

const existingCharactersTest: BasicCharacterAttributes[] = [
  {
    name: "Zephyr Tailspring",
    description:
      "Zephyr has curly auburn hair, bright green eyes with specks of gold, and a smattering of freckles across her nose. She wears a purple hoodie and patched denim jeans with floral embroidery.",
  },
  {
    name: "Plato",
    description:
      "Plato is a young, curious bat with boundless energy, who discovers the wider world beyond the cave he's always known.",
  },
  {
    name: "Aris",
    description:
      "Aris is the oldest of the bats and the leader of their cave community. She leans on a small stick for support and has old eyes that focus on the shadows cast on their cave walls, contemplating them to understand the world.",
  },
];

const storyTextTest = `Small World?

By Alexis Diamond.

© 2023 The Reading Club, Inc. All Rights Reserved.

Once upon a time, deep in a dark cave, there lived a large family of bats. I don't know how many bats. It was somewhere between 50 and 100 bats. It was a very big bat family.

This bat family never left their cave.

Why? Why did they never leave it?

The strange truth is that all the bats had been born deep in the heart of the cave. Since none of them had ever left the cave, none even knew they were in a cave. The cave, for them, was the whole entire world.

And life in the cave was not too bad.

There was a little stream in the cave, which gave the bats water to drink. The cave was also home to insects that the bats loved to eat.

Among the many bats living in the cave, there was one small bat different from all the rest. This bat's name was Plato. He was a young bat, and he was always flying around the cave. In fact, Plato had so much energy that he was always zooming!

Plato was curious about everything, including the cave where he lived with his family. He spent his days flying through the cave tunnels, exploring everything and everywhere.

One day, Plato flew so far from his home that, for the first time, he found the cave entrance. There, at the mouth of the cave, he saw the light of the sun. He didn't know what sunlight was, but he knew he did not like it. Sunlight was too bright for his eyes.

When Plato saw the cave entrance, he also saw, to his surprise, that he had been living in a cave.

The next day, and every day after, Plato made the long trip from his home to the cave entrance. Each time, he grew braver and braver, and he came closer and closer and closer to stepping out of the cave and into the sunshine. Little by little, his eyes became more used to the sunlight.

One day, as the sun was setting and the sky grew dark, Plato peeked his head out of the cave. And what he saw was so pretty that it took his breath away.

Plato saw the sea, and he saw mountains, and trees. Plato saw birds flying. This was the first time that Plato had ever seen a bird.

Plato also saw the sun, low in sky, bathing everything in a golden light that made the sea sparkle. Even as it was setting, the sun was brighter than anything Plato had ever imagined.

Plato was so excited! He zoomed back into the cave to share his news. He couldn't wait to tell the other bats about the world outside their cave.

Plato arrived home to find his family hunting tiny insects, lightning bugs, which glowed yellow and cast shadows on the cave walls.

Then Plato saw Aris, the oldest of the bats. Aris was the bat leader. Aris was so old that when she walked, she leaned on a small stick that the bats had found floating in the stream where they drank their water.

Aris wasn't watching the bats, and she wasn't watching the lightning bugs. Aris was watching the cave wall, where light from the lightening bugs cast dark shadows.

Aris focused her old eyes on the wall as the dark bat shadows swirled and swooped, as the other bats flew wildly up, down, and all around the cave.

"Why are you watching the wall?" Plato asked Aris

"I'm watching the world,” Aris answered, “so I can understand it."

“Well, I have big news for you!” Plato said.

“If you want to understand the world, then you should stop watching shadows on the wall,” Plato said. “You should leave the shadows behind.”

Plato took a deep breath.

“In fact,” Plato said, “if you want to understand the world, you should leave this cave behind!”

“Cave? What are you talking about?” Aris said.

The other bats came nearer to listen.

“There is no world but our home here,” Aris said. “Everyone knows that.”

Aris looked at the other bats gathered around her. “Am I right?” Aris asked the crowd.

“Yes, that's right!” the bats shouted. “Our home here is all there is!”

Plato tried to tell the other bats about the outside world, but they just laughed. They told Plato that he was making things up.

“You're too young to understand the real world,” they said to him.

Plato knew what he had seen was real. He also knew that if he was going to change the other bats' minds, then he needed to show them proof of the world outside the cave.

When all the other bats went to bed, Plato flew out to the mouth of the cave.

He flew further into the world than he ever had before. At first, Plato was afraid. But as he flew higher, he saw stars twinkling in the sky. He saw the moon glowing yellow, above the trees. Everything looked so lovely!

And then he saw it, and Plato knew it was just exactly the proof he needed.

It was a rose, blooming from the top of a tree stump.

It took Plato hours to fly home with the rose. He was very tired when he landed in front of Aris, carrying his prize.

Aris was just waking up to start her day. When she saw the rose, she was stunned.

Aris knew what the rose meant. She knew that Plato had told the truth about the world outside the cave. She knew then that they all really were living in a cave.

She knew that their cave, which had been their whole world, was actually just a tiny part of a much larger universe.

“Tonight,” Aris announced to all bats, “Plato will lead us, as we explore this new world together!”

When the bats heard this, they all cheered. They were eager to explore a world they had never dreamed of, full of wonders like the rose Plato had brought them.

From that day on, Aris chose Plato to be the chief scout of all bats. The bats continued to live in their cave, but now they left the cave, following Plato, almost every night, seeking adventure, learning about the wider world, and of course, living happily ever after.

The End.`;
