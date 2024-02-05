import { NextResponse } from "next/server";
// SET UP OPEN AI
import OpenAI from "openai";

// RATE LIMITING
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import {
  BasicCharacterAttributes,
  callOpenaiIdentifyCharacter,
  parseNewCharactersJSON,
} from "../character/identify/utils";
import {
  callOpenAIAPICreateCharacter,
  parseCharacterChatCompletion,
} from "../character/create/utils";
import {
  ChosenCharacterFields,
  callOpenaiChooseCharacter,
  parseChosenCharactersJSON,
} from "../character/choose/utils";
import { CharacterAttributes } from "@/data/character";
import { IllustrationGenerationBody } from "@/components/TRCEditorV2/plugins/upload-generate-images";

import { put } from "@vercel/blob";

import { nanoid } from "nanoid";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@/auth";
import { validatePaidSubscription } from "../utils";
import { callDalleAPI } from "./utils";

// const idLength = 10; // You can choose the length
// const uniqueID = nanoid(idLength);

const config = {
  apiKey: process.env.OAI_KEY,
};

const openaiSDK = new OpenAI(config);

// export const runtime = "edge";

// https://stackoverflow.com/questions/77503770/how-to-increase-timeout-limit-on-vercel-serverless-functions
export const maxDuration = 300; // 5 seconds
export const dynamic = "force-dynamic";

// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello, world!" }, { status: 200 });
// }

// platform.openai.com/docs/api-reference/images/create
export async function POST(request: Request) {
  // // Should put this check into a single function in all relevant routes!
  // const isPro = await checkSubscription();
  // // FIRST THING IN ROUTE IS TO SET RATE LIMIT
  // if (
  //   isPro == false &&
  //   // process.env.NODE_ENV != "development" &&
  //   process.env.KV_REST_API_URL &&
  //   process.env.KV_REST_API_TOKEN
  // ) {
  //   const ip = request.headers.get("x-forwarded-for");

  //   const ratelimit = new Ratelimit({
  //     redis: kv,
  //     limiter: Ratelimit.slidingWindow(5, "1 d"),
  //   });

  //   const session = await auth();
  //   const rateLimitKey = session?.user.email || ip;

  //   const { success, limit, reset, remaining } = await ratelimit.limit(
  //     `trc_ratelimit_${rateLimitKey}-illustration`
  //   );

  //   if (!success) {
  //     return NextResponse.json(
  //       { msg: "Rate limit exceeded for the day" },
  //       {
  //         status: 429,
  //         headers: {
  //           "X-RateLimit-Limit": limit.toString(),
  //           "X-RateLimit-Remaining": remaining.toString(),
  //           "X-RateLimit-Reset": reset.toString(),
  //         },
  //       }
  //     );
  //   }
  // }

  await validatePaidSubscription(request, {
    slidingWindowTokens: 5,
    slidingWindowDuration: "1 d",
    feature: "illustration",
  });

  const reqJSON = await request.json();
  console.log(reqJSON);
  const {
    prevContextText,
    prevParagraphText,
    postContextText,
    existingCharacters,
    characterDefinitions,
    chosenCharacter,
  } = reqJSON.body as IllustrationGenerationBody;

  // IDENTIFY NEW CHARACTERS
  // const existingCharacters: BasicCharacterAttributes[] = [];
  const storyText = prevContextText + postContextText;

  // console.log("\n\n\n ****** EXISTING CHARACTERS CHECK ****");
  // console.log(existingCharacters);

  // const newCharactersJSON = parseNewCharactersJSON(
  //   await callOpenaiIdentifyCharacter(existingCharacters, storyText)
  // )["newCharactersJSON"];

  // console.log(newCharactersJSON);

  // const updatedExistingCharacters = [
  //   ...existingCharacters,
  //   ...newCharactersJSON,
  // ];

  // updatedExistingCharacters = [
  //   {
  //     name: "Plato",
  //     description:
  //       "A young, curious, and energetic bat who discovers the entrance to the cave and the world outside.",
  //   },
  //   {
  //     name: "Aris",
  //     description:
  //       "The oldest bat and the leader of the bat family, who uses a small stick for support and learns about the world outside the cave from Plato.",
  //   },
  // ];
  // updatedExistingCharacters = [
  //   {
  //     name: "Plato",
  //     description:
  //       "A young, energetic and curious bat who discovers the world outside the cave.",
  //   },
  //   {
  //     name: "Aris",
  //     description:
  //       "The oldest bat and the bat leader who initially doubts the existence of a world beyond the cave, but later acknowledges the truth and leads the bats to explore the new world.",
  //   },
  // ];

  // CREATE NEW CHARACTERS IF NECESSSARY
  // Iterate through each new character and create them if they don't exist
  // const characterDefinitions = [];

  // CHARACTER DEFINITIONS CHECK
  // console.log("\n\n\n ****** CHARACTER DEFINITIONS CHECK ****");
  // console.log(characterDefinitions);

  // console.log("About to create new characters if needed");
  // for (const newCharacter of newCharactersJSON) {
  //   console.log("CREATING NEW CHARACTER");
  //   const newCharacterDefinition = parseCharacterChatCompletion(
  //     await callOpenAIAPICreateCharacter(newCharacter)
  //   );
  //   characterDefinitions.push(newCharacterDefinition);
  // }
  // console.log("Done creating new characters if needed");

  // characterDefinitions = [
  //   {
  //     name: "Plato",
  //     age: "7",
  //     gender: "Male",
  //     appearance:
  //       "Tiny with a charcoal-black fur, large glowing eyes, and wings that shimmer with a hint of violet under the moonlight.",
  //     personalityTraits: "Inquisitive, Brave, Compassionate, Playful",
  //     likes: "Exploring, starry nights, juicy fruits",
  //     dislikes: "Loud noises, being underestimated, bright lights",
  //     fears: "Losing his way, predators, being alone in the dark",
  //     backstory:
  //       "Born in the heart of an ancient forest, Plato was always more curious than his peers, questioning every sound and shadow.",
  //     motivations:
  //       "A thirst for knowledge and a desire to map the entire cave system to ensure no bat ever gets lost again.",
  //     relationships:
  //       "Son of the Bat Colony's leader, has a close-knit group of friends who join his adventures.",
  //     roleInStory: "Main character, guide, young hero",
  //     specialAbilitiesOrSkills:
  //       "Exceptional echolocation, acute hearing, swift flyer",
  //     culturalBackground: "Bat Colony of the Evernight Forest",
  //     languageSpoken:
  //       "Chiropteran, a sophisticated system of high-pitch chirps and ecological cues",
  //     hobbies: "Fruit gathering, echolocation games, cave racing",
  //     signatureItems:
  //       "A map of the cave system that he updates, a compass stone from his father",
  //   },
  //   {
  //     name: "Aris",
  //     age: "87 (in bat years)",
  //     gender: "Female",
  //     appearance:
  //       "A wispy, silver-furred bat with gentle eyes, and a small walking stick adorned with glowing cave crystals.",
  //     personalityTraits: "Wise, gentle, curious, and a little forgetful",
  //     likes:
  //       "Listening to the echoes of the cave, the taste of ripe figs, storytelling",
  //     dislikes: "Abrupt noises, the cold, discord among her family",
  //     fears:
  //       "Losing her sight completely, the cave being discovered by predators",
  //     backstory:
  //       "Aris was born into a legendary line of bats known for their longevity and wisdom. Over the years, she became the matriarch of the bat colony and is highly revered. Her experience has allowed her to navigate through tough times, and she once saved the colony from a great flood by finding a higher cavern for them to roost.",
  //     motivations:
  //       "To share her knowledge with the younger generation, keep her family safe, and understand the changes happening in the world outside her cave",
  //     relationships:
  //       "Matriarch of the bat family, mentor to many younger bats, most notably her keen protégé, Plato",
  //     roleInStory:
  //       "A mentor figure who provides guidance and occasionally intervenes with her wisdom to resolve conflicts or provide insight",
  //     specialAbilitiesOrSkills:
  //       "Exceptional echolocation ability despite her age, a vast knowledge of cave lore and natural remedies",
  //     culturalBackground:
  //       "Part of a mystical cave-dwelling bat culture that values oral tradition and the wisdom of elders",
  //     languageSpoken:
  //       "A mix of high-pitched bat vocalizations and an ancient dialect understood by nocturnal creatures",
  //     hobbies:
  //       "Organizing gatherings, telling old folktales, collecting cave crystals",
  //     signatureItems:
  //       "Her glowing walking stick and a tattered shawl made of woven spider silk",
  //   },
  // ];

  // console.log(characterDefinitions);

  // CHOOSE CHARACTER
  // const chosenCharacter: ChosenCharacterFields = parseChosenCharactersJSON(
  //   await callOpenaiChooseCharacter(
  //     updatedExistingCharacters,
  //     storyText,
  //     prevParagraphText
  //   )
  // )["chosenCharacter"][0];

  // CHOSEN CHARACTER CHECK
  console.log("\n\n\n ****** CHOSEN CHARACTER CHECK ****");
  console.log(chosenCharacter);

  const chosenCharacterAttributes = characterDefinitions.find(
    (character: ChosenCharacterFields) =>
      character.name === chosenCharacter.name
  );

  const chosenCharacterDescription = existingCharacters.find(
    (character: BasicCharacterAttributes) =>
      character.name === chosenCharacter.name
  )?.description;

  console.log("\n\n\n ****** CHOSEN CHARACTER ATTRIBUTES CHECK ****");
  console.log(chosenCharacterAttributes);
  // return;

  // CREATE ILLUSTRATION

  // Create a highly detailed image of a ${gender} character named ${name}. ${name} has the following characteristics: age ${age}, from ${country}, with ${hair} hair, and ${eyes} eyes. ${name} has an ${figure} figure, with a height of around ${height}. ${name}'s facial features include ${features}. ${name}'s skin tone is ${skin}, and ${name} has a ${beautyMark}. ${name}'s wearing ${clothes}. ${name} is in ${location}. ${name} is in a ${setting}, ${pose}.

  const c = chosenCharacterAttributes!;

  //   const consistentPrompt = `
  // Create a highly detailed children's book illustration of a ${c.gender} character named ${c.name}: ${c.appearance}. ${c.name} has the following characteristics: age ${c.age}, from ${c.country}, with ${c.hair} hair, and ${c.eyes} eyes. ${c.name} has an ${c.figure} figure, with a height of around ${c.height}. ${c.name}'s facial features include ${c.features}. ${c.name}'s skin tone is ${c.skin}, and ${c.name} has a ${c.beautyMark}. ${c.name}'s wearing ${c.clothes}. ${c.name} is in ${c.location}. ${c.name} is in a ${c.setting}, ${c.pose}.
  //   `;

  // With special abilities or skills such as ${c.specialAbilitiesOrSkills}, ${c.name} comes from a ${c.culturalBackground} and speaks ${c.languageSpoken}.
  // A notable fear includes ${c.fears}. ${c.name}'s story began ${c.backstory} and is driven by motivations such as ${c.motivations}.
  // and exhibits personality traits of being ${c.personalityTraits}
  // This character enjoys ${c.likes} and dislikes ${c.dislikes}.
  // Hobbies include ${c.hobbies} and always identified by signature items like ${c.signatureItems}.
  // ${c.name} is ${c.age}.
  // In the narrative, ${c.name} is ${c.roleInStory} and has relationships like ${c.relationships}.
  // const consistentPrompt =
  //   `Create a vivid children's book illustration of a ${c.gender} character named ${c.name}: ${c.appearance}. ${c.name} is ${c.age}. In the narrative, ${c.name} is ${c.roleInStory}. In the scene, we have ${chosenCharacter.scene}.`.replaceAll(
  //     "..",
  //     "."
  //   );

  const consistentPrompt = `Create a children's book illustration of ${c.name} (${c.gender}): ${c.appearance}. ${c.name} looks ${c.age} of age. ${c.name} has ${c.eyeColor} eyes. ${c.name} is ${c.height} in height, has a ${c.build} build, and ${c.skinTone} skin. Notable features include ${c.distinguishingMarks}. The character's facial hair is described as ${c.facialHair} and ${c.name} is in ${c.physicalCondition} physical condition. In the background, ${chosenCharacter.background}. In this scene, ${c.name} is ${chosenCharacter.scene}.
  `;

  console.log("Undefined?", c);

  const consistentPrompt2 = `Imagine colorful drawing. In the center, ${c.name}, ${chosenCharacterDescription}: ${c.appearance}. In this scene, ${chosenCharacter.scene}. The background is ${chosenCharacter.background}. The entire scene should evoke a sense of adventure suitable for a children's storybook.`;
  console.log("\n****** CONSISTENT PROMPT ****");
  console.log(consistentPrompt);

  const consistentPrompt3 = `In a vibrant, storybook-style illustration, the central character is ${c.name}, a ${c.species}: ${c.appearance}. ${c.name} has ${c.hairColor} hair with large, ${c.eyeColor} eyes, and ${c.distinguishingMarks}. The scene shows ${c.name} ${chosenCharacter.scene}, with a ${chosenCharacter.background}. The setting evokes an air of adventure and wonder, typical of a children's storybook.`;

  //   const response = await openai.createImage({
  //     prompt: "This is a photo of a dog named Bolt. The photo is very blurry. ",
  //     n: 1,
  //     size: "1024x1024",
  //   });

  const style1 =
    "Illustrate a playful scene in children's style, inspired by early 20th century illustrators, with its whimsical charm and vintage aesthetics, primarily done using watercolor and ink.";

  // pixar style
  const style2 =
    "Illustrate a scene in Pixar style, with its signature 3D-rendered look, and its vibrant colors and lighting.";

  let prompt = `
SEED FOR DALL-E IMAGE GENERATOR: 173311839

ILLUSTRATION: "...${(prevParagraphText as string).trim()}..."

STYLE: ${style2}

CHARACTERS:
  - Ted: Large-eyed, friendly bear

Generate a children's book illustration based on the context of the story. (Pro-tip: Procure big eyes in characters, children's love that.)

STORY CONTEXT:

"""

${prevContextText}

<INSERT ILLUSTRATION HERE>

${postContextText}
"""
  `;
  prompt = prompt.replace(/\n{3,}/g, "\n\n");
  // console.log(prompt);

  // metaprompt = metaprompt.replaceAll("\n", "").replaceAll('"', "'");
  // console.log(metaprompt);

  const testPrompt = `
Create a highly detailed image of a female character named Eva. Eva has the following characteristics: age 25, from Guatemala, with long, wavy black hair, and deep brown eyes. She has an elegant and slim figure, with a height of around 5'7". Her facial features include high cheekbones, a small nose, and a gentle smile. Eva's skin tone is olive, and she has a small beauty mark just above her right lip. She's wearing a simple white blouse and blue jeans, with a silver necklace. She is in space fixing an issue in the international space station. Eva is in a serene yoga studio, performing a yoga pose with grace and concentration.
  `;

  const name = `Eva`;
  const gender = `female`;
  const age = `25`;
  const country = `Guatemala`;
  const hair = `long, wavy black`;
  const eyes = `deep brown`;
  const figure = `elegant and slim`;
  const height = `5'7"`;
  const features = `high cheekbones, a small nose, and a gentle smile`;
  const skin = `olive`;
  const beautyMark = `small beauty mark just above her right lip`;
  const clothes = `simple white blouse and blue jeans, with a silver necklace`;
  const location = `space fixing an issue in the international space station`;
  const setting = `serene yoga studio`;
  const pose = `performing a yoga pose with grace and concentration`;

  const templatePrompt = `
Create a highly detailed image of a ${gender} character named ${name}. ${name} has the following characteristics: age ${age}, from ${country}, with ${hair} hair, and ${eyes} eyes. ${name} has an ${figure} figure, with a height of around ${height}. ${name}'s facial features include ${features}. ${name}'s skin tone is ${skin}, and ${name} has a ${beautyMark}. ${name}'s wearing ${clothes}. ${name} is in ${location}. ${name} is in a ${setting}, ${pose}.
  `;

  // console.log(templatePrompt);

  const {
    image,
    storedImageUrls,
    // imageBlobStored,
    dalleImageUrls,
  } = await callDalleAPI(consistentPrompt3, reqJSON);

  // console.log("response", image.data);
  console.log("response", image);

  return NextResponse.json(
    {
      imageData: image.data[0],
      // should get rid of this actually, I am already doing it way before in the client
      newCharacters: existingCharacters,
      characterDefinitions,
      // storedImageUrl: imageBlobStored == true ? storedImageUrl : dalleImageUrl,
      storedImageUrl: storedImageUrls[0],
      // will this sometimes be undefined?
      revisedPrompt: image.data[0].revised_prompt,
    } as GenerateIllustrationResponse,
    { status: 200 }
  );
}
