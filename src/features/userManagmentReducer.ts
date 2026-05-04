import type { UserManagementState, UserManagementAction } from "../types";

export default function userManagmentReducer(
  state: UserManagementState,
  action: UserManagementAction,
) {
  let updatedState: UserManagementState;

  switch (action.type) {
    case "ADD_USER":
      return (updatedState = [...state, action.user]);

    case "UPDATE_USER":
      return (updatedState = state.map((user) =>
        user.id === action.user.id ? action.user : user,
      ));

    case "DELETE_USER":
      return state.filter((user) => user.id !== action.userId);
    case "SET_USERS":
      return (updatedState = action.users);
    default:
      return state;
  }
}
