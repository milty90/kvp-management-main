import type { User } from "../types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { supabase } from "../utils/supabase";
import userManagmentReducer from "../features/userManagmentReducer";
import { addUser, updateUser, deleteUser } from "../features/userActions";

interface UserContextType {
  user: SupabaseUser | null;
  setUser: (user: SupabaseUser | null) => void;
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  users: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [users, dispatch] = useReducer(userManagmentReducer, []);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data as SupabaseUser | null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SupabaseUser | null) ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        addUser: (user: User) => addUser(dispatch, user),
        updateUser: (user: User) => updateUser(dispatch, user),
        deleteUser: (userId: number) => deleteUser(dispatch, userId),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

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
    console.error("Error getting current user:", error);
    return null;
  }
  return data.user;
}
