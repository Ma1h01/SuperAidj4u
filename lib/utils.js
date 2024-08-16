import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function camelCaseToSpaceDelimited(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}
