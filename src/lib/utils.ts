import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes with proper order
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a CSS color variable with fallback to a tailwind compatible format
 * Example: colorVar("--primary", "#000") => "oklch(var(--primary, #000))"
 */
export function colorVar(variable: string, fallback?: string) {
  return `oklch(var(${variable}${fallback ? `, ${fallback}` : ""}))`;
}
