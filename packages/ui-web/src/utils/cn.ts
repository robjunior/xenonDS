import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - merge class names using clsx and tailwind-merge.
 * Always use this utility for merging class names in xenonDS components.
 *
 * @param inputs - class values
 * @returns merged class string
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}
