import type { Kvp } from "../types";
import { supabase } from "../utils/supabase";

export async function getKvpsfromDataBase() {
  const { data: kvps, error } = await supabase.from("kvps").select("*");
  if (error) {
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
    }
  });
}

export async function deleteKvpFromDataBase(id: number) {
  const { error } = await supabase.from("kvps").delete().eq("id", id);
  if (error) {
  }
}

export async function logActivity({
  userId,
  userName,
  action,
  entityType,
  entityId,
  details,
}: {
  userId: string;
  userName: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "LOGIN" | "LOGOUT";
  entityType: "KVP" | "USER" | "AUTH";
  entityId?: string;
  details?: string;
}

) {
  await supabase.from("activity_log").insert({
    user_id: userId,
    user_name: userName,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details,
  });
}

export async function getLogActivities() {
  const { data: activities, error } = await supabase
    .from("activity_log")
    .select("*")
     
    if(error) {
      return [];
    }
  return activities;
}