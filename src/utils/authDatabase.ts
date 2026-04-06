import { supabase } from "../utils/supabase";

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

export async function signUpWithEmailandPassword(
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("Error signing up with email:", error);
  }
  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in with email:", error);
  }
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
  return data.user;
}

export async function fetchUser(
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
) {
  const { data } = await supabase.auth.getUser();
  setUsername(data.user?.email?.split("@")[0] || "Unbekannter Benutzer");
  setEmail(data.user?.email || "Keine E-Mail verfügbar");
}
