import { Image } from "openai/resources/images.mjs";

export interface GenerateIllustrationPromptResponse {
  imageData: Image[];
  storedImageUrls: string[];
  revisedPrompts: string[];
}
