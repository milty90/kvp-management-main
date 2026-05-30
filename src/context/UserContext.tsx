import type { User } from "../types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
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
  deleteUser: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  users: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [users, dispatch] = useReducer(userManagmentReducer, []);
  const [authEvent, setAuthEvent] = useState<string | null>(null);
  const prevUserRef = useRef<SupabaseUser | null>(null);
  const userName = user?.email?.split("@")[0] ?? "Unknown User";

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        prevUserRef.current = session.user;
      }
      setUser(session?.user ?? null);

      if (event === "SIGNED_IN") {
        const alreadyLogged = sessionStorage.getItem(
          `logged_${session?.user?.id}`,
        );
        if (!alreadyLogged) {
          sessionStorage.setItem(`logged_${session?.user?.id}`, "true");
          setAuthEvent("SIGNED_IN");
        }
      }

      if (event === "SIGNED_OUT") {
        sessionStorage.clear();
        setAuthEvent("SIGNED_OUT");
      }
    });

    getUsers(dispatch);

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authEvent === "SIGNED_IN" && user) {
      setAuthEvent(null);

      console.log("Logged in user:", user);

      const handleSignIn = async () => {
        const { data: existing } = await supabase
          .from("users")
          .select("userId")
          .eq("userId", user.id)
          .single();

        if (!existing) {
          await addUser(dispatch, {
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

          await logActivity({
            id: Date.now().toString(),
            userId: user.id,
            userName: user.email ?? "",
            action: "SIGNED_UP",
            entityType: "AUTH",
            entityId: user.id,
            details: `User ${userName} signed up.`,
            timestamp: new Date().toISOString(),
          });
        }

        await logActivity({
          id: Date.now().toString(),
          userId: user.id,
          userName: user.email ?? "",
          action: "LOGGED_IN",
          entityType: "AUTH",
          entityId: user.id,
          details: `User ${userName} logged in.`,
          timestamp: new Date().toISOString(),
        });
      };

      handleSignIn();
    }

    if (authEvent === "SIGNED_OUT") {
      setAuthEvent(null);
      const loggedOutUser = prevUserRef.current;

      if (loggedOutUser) {
        prevUserRef.current = null;
        const handleSignOut = async () => {
          await logActivity({
            id: Date.now().toString(),
            userId: loggedOutUser.id,
            userName: loggedOutUser.email ?? "",
            action: "LOGGED_OUT",
            entityType: "AUTH",
            entityId: loggedOutUser.id,
            details: `User ${loggedOutUser?.email?.split("@")[0] || "Unknown User"} logged out.`,
            timestamp: new Date().toISOString(),
          });
        };
        handleSignOut();
      }
    }
  }, [authEvent, user]);

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
