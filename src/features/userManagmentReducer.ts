import type { UserManagementState, UserManagementAction } from "../types";

export default function userManagmentReducer(
  state: UserManagementState,
  action: UserManagementAction,
) {

 switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];

    case "UPDATE_USER":
      return state.map((user) =>
        user.userId === action.user.userId ? action.user : user,
      );

    case "DELETE_USER":
      return state.filter((user) => user.userId !== action.userId);

    case "SET_USERS":
      return action.users;
    default:
      
      return state;
  }
}
