import type { InsertKvp, Kvp, ActivityLog } from "../types";
import { supabase } from "../utils/supabase";

export async function getKvpsfromDataBase() {
  const { data: kvps, error } = await supabase.from("kvps").select("*");
  if (error) {
    return [];
  }
  return kvps;
}

export async function addKvpToDataBase(kvp: InsertKvp) {
  const { error } = await supabase.from("kvps").insert(kvp);
  if (error) throw new Error(error.message); 
}

export async function updateKvpInDataBase(kvp: Kvp) {
  const { id, ...updateData } = kvp;
  const { error } = await supabase
    .from("kvps")
    .update(updateData) 
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteKvpFromDataBase(id: number) {
  const { error } = await supabase.from("kvps").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function archiveKvpInDataBase(id: number) {
  const { error } = await supabase
    .from("kvps")
    .update({ state: "Archived" })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function rejectKvpInDataBase(id: number) {
  const { error } = await supabase
    .from("kvps")
    .update({ state: "Rejected" })
    .eq("id", id);

  if (error) throw new Error(error.message);
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

  if (error) throw new Error(error.message);
  
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