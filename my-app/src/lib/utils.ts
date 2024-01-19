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
