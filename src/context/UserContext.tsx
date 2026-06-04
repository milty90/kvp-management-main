import type { User } from "../types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { supabase } from "../utils/supabase";
import userManagmentReducer from "../features/userManagmentReducer";
import {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../features/userActions";
import { logActivity } from "../storage/kvpDatabase";
import { useSessionContext } from "./SessionContext";

interface UserContextType {
  user: SupabaseUser | null;
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => Promise<void>;
  isDeleting: React.RefObject<boolean>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  users: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: async () => {},
  isDeleting: { current: false },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, authEvent } = useSessionContext();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [users, dispatch] = useReducer(userManagmentReducer, []);
  const prevUserRef = useRef<SupabaseUser | null>(null);
  const isDeleting = useRef(false);
  const hasLoggedInRef = useRef(false);

  useEffect(() => {
    if (session?.user) {
      prevUserRef.current = session.user;
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      getUsers(dispatch);
    }
  }, [session?.user?.id]);

  const handleSignIn = useCallback(async (currentUser: SupabaseUser) => {
    const userName = currentUser.email?.split("@")[0] ?? "Unknown User";

    const { data: existing } = await supabase
      .from("users")
      .select("userId")
      .eq("userId", currentUser.id)
      .single();

    if (!existing) {
      await addUser(dispatch, {
        userId: currentUser.id,
        userEmail: currentUser.email ?? "",
        userName,
        photoUrl: currentUser.user_metadata?.avatar_url ?? "",
        department: "",
        role: "",
        firstName: "",
        lastName: "",
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString(),
      });

      await logActivity({
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.email ?? "",
        action: "SIGNED_UP",
        entityType: "AUTH",
        entityId: currentUser.id,
        details: `User ${userName} signed up.`,
        timestamp: new Date().toISOString(),
      });
    }

    await logActivity({
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.email ?? "",
      action: "LOGGED_IN",
      entityType: "AUTH",
      entityId: currentUser.id,
      details: `User ${userName} logged in.`,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handleSignOut = useCallback(async (loggedOutUser: SupabaseUser) => {
    const userName = loggedOutUser.email?.split("@")[0] ?? "Unknown User";

    await logActivity({
      id: Date.now().toString(),
      userId: loggedOutUser.id,
      userName: loggedOutUser.email ?? "",
      action: "LOGGED_OUT",
      entityType: "AUTH",
      entityId: loggedOutUser.id,
      details: `User ${userName} logged out.`,
      timestamp: new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    if (authEvent === "SIGNED_IN" && user) {
      const alreadyLogged = sessionStorage.getItem(`logged_${user.id}`);
      if (!alreadyLogged && !hasLoggedInRef.current) {
        sessionStorage.setItem(`logged_${user.id}`, "true");
        hasLoggedInRef.current = true;
        void handleSignIn(user);
      }
    }

    if (authEvent === "SIGNED_OUT") {
      hasLoggedInRef.current = false;
      sessionStorage.clear();

      if (isDeleting.current) {
        isDeleting.current = false;
        return;
      }

      prevUserRef.current = null;
    }
  }, [authEvent, user, handleSignIn, handleSignOut]);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isDeleting,
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
