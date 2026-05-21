import type { Kvp, ActivityLog } from "../types";
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
      console.error("Failed to upsert KVP:", error);
    }
  });
}

export async function deleteKvpFromDataBase(id: number) {
  const { error } = await supabase.from("kvps").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete KVP:", error);
  }
}

export async function logActivity(log: ActivityLog) {
  const { error } = await supabase.from("activity_logs").insert({
    id: log.id,
    userId: log.userId,
    userName: log.userName,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    details: log.details,
    timestamp: log.timestamp,
  });

  if (error) {
    console.error("Failed to log activity:", error);
  }
}

export async function getLogActivities() {
  const { data: activities, error } = await supabase
    .from("activity_logs")
    .select("*")
     
    if(error) {
      return [];
    }
  return activities;
}