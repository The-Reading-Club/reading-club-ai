import { dev } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { ExternalToast } from "sonner";
import { twMerge } from "tailwind-merge";

import { toast } from "sonner";
import { allowDevAlerts } from "../../config";
import { TRCDictionary } from "./internationalization/dictionary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function devAlert(message?: any) {
  //@ts-ignore
  if (allowDevAlerts == true && dev == true) alert(message);
}

// dev console
export function devConsoleLog(message?: any, ...optionalParams: any[]) {
  if (dev == true) console.log(message, ...optionalParams);
}

export function capitalizeFirstLetter(str: string) {
  if (str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return str;
  }
}

// cool function
export async function fetchAndReadStream(
  url: string,
  fetchOptions: RequestInit,
  callback: (content: string) => void
) {
  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8"); // Creates a TextDecoder instance
    let content = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        content += decoder.decode(value, { stream: true });

        callback(content);
      }
    }

    return content;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

type ToastData = {
  loading: string;
  success: string;
  errorCallback: (msg: string) => string;
};

// This is actually ugly code, won't use it
export async function wrapWithToast(callback: Function, data: ToastData) {
  const loadingToast = toast.loading(data.loading, {
    duration: Infinity,
  });

  try {
    const result = await callback();

    toast.success(data.success, {
      id: loadingToast,
      duration: 5000,
    });

    return result;
  } catch (e: any) {
    console.log(e);
    toast.error(data.errorCallback(e.message), {
      id: loadingToast,
      duration: 5000,
    });
  }
}

// https://chat.openai.com/c/1dadbf23-e1e2-4fbf-b040-654f8a89c14b
export async function generateSHA256Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

// // Example usage:
// const input = "example input";
// generateSHA256Hash(input).then(hash => console.log(hash));

export function countStringSpaces(str: string): number {
  // Use a regular expression to match spaces in the string
  const matches = str.match(/ /g);
  // If matches is null (i.e., no spaces found), return 0; otherwise, return the length of the matches array
  return matches ? matches.length : 0;
}

export function decodeJWT(token: string) {
  const base64Url = token.split(".")[1]; // Get payload
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert Base64Url to Base64
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// https://chat.openai.com/c/d2607a19-1aae-48fe-9c24-a74be168d543
export function getRandomIndexes(arrLength: number, count: number): number[] {
  // Create an array of indexes
  let indexes = Array.from({ length: arrLength }, (v, k) => k);

  // Shuffle the array of indexes (Fisher-Yates shuffle)
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]]; // Swap elements
  }

  // Select the first 'count' indexes
  return indexes.slice(0, count);
}

// // // Example usage
// const arrLength = 20; // Assuming the array has more than 10 elements
// const randomIndexes = getRandomIndexes(arrLength, 10);
// console.log(randomIndexes);

export function getTimeUntilReset(resetTimestamp: number): string {
  const currentTime: Date = new Date();
  const resetTime: Date = new Date(resetTimestamp);

  // If it's negative
  if (resetTime.getTime() < currentTime.getTime()) {
    // return "Reset has already occurred";
    return "";
  }

  // Calculate the difference in milliseconds
  const difference: number = resetTime.getTime() - currentTime.getTime();

  // Convert milliseconds to different time measures
  const seconds: number = Math.floor(difference / 1000);
  const minutes: number = Math.floor(difference / (1000 * 60));
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  // Determine the most appropriate unit of time to display
  if (days > 0) {
    // return `Resets in ${days} day${days > 1 ? "s" : ""}, ${hours % 24} hour${
    //   hours % 24 > 1 ? "s" : ""
    return `Resets in ${days} day${days > 1 ? "s" : ""}, ${hours % 24} h, ${
      minutes % 60
    } m, ${seconds % 60} s`;
  } else if (hours > 0) {
    // return `Resets in ${hours} hour${hours > 1 ? "s" : ""}`;
    return `Resets in ${hours} hour${hours > 1 ? "s" : ""}, ${
      minutes % 60
    } m, ${seconds % 60} s`;
  } else if (minutes > 0) {
    // return `Resets in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    return `Resets in ${minutes} minute${minutes > 1 ? "s" : ""} and ${
      seconds % 60
    } seconds`;
  } else {
    // return "Resets in less than a minute";
    return `Resets in ${seconds} seconds`;
  }
}

export function pastTime(resetTimestamp: number): boolean {
  const currentTime: Date = new Date();
  const resetTime: Date = new Date(resetTimestamp);

  return resetTime.getTime() < currentTime.getTime();
}

export type CharacterTraitType =
  | "gender"
  | "species"
  | "age"
  | "eyeColor"
  | "hairLength"
  | "hairType"
  | "hairColor"
  | "skinTone"
  | "outfit"
  | "placeOfOrigin"
  | "name"
  | "facialHair";

export const getCharacterTraitKeyLabel = (
  key: CharacterTraitType,
  dictionary: TRCDictionary
) => {
  return dictionary?.components.characterCard[key] || key;
};
