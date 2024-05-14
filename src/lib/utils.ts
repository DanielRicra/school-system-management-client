import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPaginationLinks(
  total: number,
  active: number
): Array<number | null> {
  if (total < 1) return [];

  if (total <= 5 && total >= 1) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (active < 3) {
    return [1, 2, 3, null, total];
  }

  if (active === 3) {
    return [1, 2, 3, 4, null, total];
  }

  const halfLeft = active - 1;

  if (halfLeft >= total - 3) {
    return [1, null, total - 3, total - 2, total - 1, total];
  }

  const halfLinks = Array.from({ length: 3 }, (_, i) => halfLeft + i);

  return [1, null, ...halfLinks, null, total];
}
