import { dev } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { ExternalToast } from "sonner";
import { twMerge } from "tailwind-merge";

import { toast } from "sonner";
import { allowDevAlerts } from "../../config";

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
