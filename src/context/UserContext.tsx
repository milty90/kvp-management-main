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
