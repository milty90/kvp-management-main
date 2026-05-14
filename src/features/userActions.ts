import type { User, UserManagementAction } from "../types";
import { supabase } from "../utils/supabase";

type Dispatch = (action: UserManagementAction) => void;

export const addUser = async (dispatch: Dispatch, user: User) => {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();
  if (error) {
    console.error("Error adding user:", error);
    return;
  }

  dispatch({ type: "ADD_USER", user: data });
};

export const updateUser = async (dispatch: Dispatch, user: User) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("userId", user.userId)
    .select()
    .single();
  if (error) {
    console.error("Error updating user:", error);
    return;
  }

  dispatch({ type: "UPDATE_USER", user: data });
};

export const deleteUser = async (dispatch: Dispatch, userId: string) => {
  const { error } = await supabase.functions.invoke("delete-user", {
    body: { userId },
  });
  if (error) {
    console.error("Error deleting user:", error);
    return;
  }

  dispatch({ type: "DELETE_USER", userId });
};

export const getUsers = async (dispatch: Dispatch) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error fetching users:", error);

    return;
  }
  console.log("Fetched users:", data);

  dispatch({ type: "SET_USERS", users: data });
};
