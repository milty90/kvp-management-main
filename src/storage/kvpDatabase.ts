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
    }
  });
}

export async function deleteKvpFromDataBase(id: number) {
  const { error } = await supabase.from("kvps").delete().eq("id", id);
  if (error) {
  }
}

export async function logActivity(log: ActivityLog) {
  await supabase.from("activity_log").insert({
    userId: log.userId,
    userName: log.userName,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    details: log.details,
    timestamp: log.timestamp,
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