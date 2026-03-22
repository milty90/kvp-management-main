import type { Kvp } from "../types";

export function loadKvps(): Kvp[] {
  const stored = localStorage.getItem("local-kvp-management");
  return stored ? JSON.parse(stored) : [];
}

export function saveKvps(kvps: Kvp[]) {
  localStorage.setItem("local-kvp-management", JSON.stringify(kvps));
}
