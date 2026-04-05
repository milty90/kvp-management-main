import type { Kvp } from "../types";
import { supabase } from "../utils/supabase";

export async function getKvpsfromDataBase() {
  const { data: kvps, error } = await supabase.from("kvps").select("*");
  if (error) {
    console.error("Error fetching KVPs:", error);
    return [];
  }
  console.log("Fetched KVPs:", kvps);
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

export async function deleteKvpFromDataBase(id: number) {
  const { error } = await supabase.from("kvps").delete().eq("id", id);
  if (error) {
    console.error("Error deleting KVP:", error);
  }
}
