import { dev } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function devAlert(message?: any) {
  if (false && dev == true) alert(message);
}

// dev console
export function devConsoleLog(message?: any, ...optionalParams: any[]) {
  if (dev == true) console.log(message, ...optionalParams);
}
