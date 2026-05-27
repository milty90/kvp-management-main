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
import { getCurrentUser } from "../features/authDatabase";
import userManagmentReducer from "../features/userManagmentReducer";
import {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../features/userActions";
import { logActivity } from "../storage/kvpDatabase";

interface UserContextType {
  user: SupabaseUser | null;
  setUser: (user: SupabaseUser | null) => void;
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
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
    getCurrentUser().then((data) => setUser(data ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    getUsers(dispatch);

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("users")
      .select("userId")
      .eq("userId", user.id)
      .single()
      .then(({ data: existing }) => {
        if (!existing) {
          addUser(dispatch, {
            userId: user.id,
            userEmail: user.email ?? "",
            userName: user.email?.split("@")[0] ?? "",
            photoUrl: user.user_metadata?.avatar_url ?? "",
            department: "",
            role: "",
            firstName: "",
            lastName: "",
            createdAt: new Date().toISOString(),
            lastSignIn: new Date().toISOString(),
          });
          logActivity({
            id: Date.now().toString(),
            userId: user.id,
            userName: user.email ?? "",
            action: "SIGNED_UP",
            entityType: "AUTH",
            entityId: undefined,
            details: user.email?.split("@")[0] ?? "",
            timestamp: new Date().toISOString(),
          });
        }
      });

    logActivity({
      id: Date.now().toString(),
      userId: user.id,
      userName: user.email ?? "",
      action: "LOGGED_IN",
      entityType: "AUTH",
      entityId: undefined,
      details: user.email?.split("@")[0] ?? "",
      timestamp: new Date().toISOString(),
    });
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        addUser: (user: User) => addUser(dispatch, user),
        updateUser: (user: User) => updateUser(dispatch, user),
        deleteUser: (userId: string) => deleteUser(dispatch, userId),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
