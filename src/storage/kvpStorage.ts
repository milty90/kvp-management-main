import type { Kvp } from "../types";

export function loadKvps(): Kvp[] {
  const stored = localStorage.getItem("local-kvp-management");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      return [];
    }
  }
  return [];
}

export function saveKvps(kvps: Kvp[]) {
  localStorage.setItem("local-kvp-management", JSON.stringify(kvps));
}
