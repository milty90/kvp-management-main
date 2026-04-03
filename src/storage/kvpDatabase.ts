import type { Kvp } from "../types";
import { supabase } from "../utils/supabase";

export async function getKvpsfromDataBase() {
  const { data: kvps, error } = await supabase.from("kvps").select("*");
  if (error) {
    console.error("Error fetching KVPs:", error);
    return [];
  }
  return kvps;
}

export function setKvpsToDataBase(kvps: Kvp[]) {
  kvps.forEach(async (kvp) => {
    const { error } = await supabase
      .from("kvps")
      .upsert(kvp, { onConflict: "id" });
    if (error) {
      console.error("Error saving KVP:", error);
    }
  });
}
