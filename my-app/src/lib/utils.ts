import { dev } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function devAlert(message?: any) {
  if (true && dev == true) alert(message);
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
  }
}
