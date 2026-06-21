import { supabase } from "../utils/supabase";

export async function forgotPassword(email: string) {
  if (!email) {
    console.error("Email is required for password reset.");
    return { error: new Error("Email is required for password reset.") };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error("Error sending password reset email:", error);
  } else {
    console.log("Password reset email sent:", data);
  }
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
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}

export const isDemoUser = (email?: string ) => email === "demo@mail.com";

export async function fetchUser(
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setLastSignIn: React.Dispatch<React.SetStateAction<string>>,
) {
  const { data } = await supabase.auth.getUser();
  setUsername(data.user?.email?.split("@")[0] ?? "Unbekannter Benutzer");
  setEmail(data.user?.email ?? "Keine E-Mail verfügbar");
  setLastSignIn(
    data.user?.last_sign_in_at ?? "Keine letzte Anmeldung verfügbar",
  );
}
