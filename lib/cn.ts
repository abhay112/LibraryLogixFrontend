import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using `clsx` and resolves conflicts using `tailwind-merge`
 * @param inputs - List of class names or conditional class objects
 * @returns A merged class name string
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
