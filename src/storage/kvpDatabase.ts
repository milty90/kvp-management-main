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

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error signing in with Google:", error);
  }
}

export async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error("Error signing in with GitHub:", error);
  }
}

export async function signInWithSlack() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "slack",
  });
  if (error) {
    console.error("Error signing in with Slack:", error);
  }
}

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error signing in with email:", error);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
}
