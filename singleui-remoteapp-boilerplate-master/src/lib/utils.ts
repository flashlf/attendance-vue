import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sanitize(input: string, patterns: RegExp[]): string {
  return patterns.reduce((acc, pattern) => acc.replace(pattern, ' '), input).trim()
}
