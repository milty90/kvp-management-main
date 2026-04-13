import type { KvpManagementState, KvpManagementAction } from "../types";

export default function kvpManagmentReducer(
  state: KvpManagementState,
  action: KvpManagementAction,
) {
  let updatedState: KvpManagementState;

  switch (action.type) {
    case "ADD_KVP":
      updatedState = [...state, action.kvp];
      break;
    case "UPDATE_KVP":
      updatedState = state.map((kvp) =>
        kvp.id === action.kvp.id ? action.kvp : kvp,
      );
      break;
    case "DELETE_KVP":
      updatedState = state.filter((kvp) => kvp.id !== action.kvp.id);
      break;
    case "ARCHIVE_KVP":
      updatedState = state.map((kvp) =>
        kvp.id === action.kvp.id ? { ...kvp, state: "Archived" } : kvp,
      );
      break;
    case "REJECT_KVP":
      updatedState = state.map((kvp) =>
        kvp.id === action.kvp.id ? { ...kvp, state: "Rejected" } : kvp,
      );
      break;
    case "SET_KVPS":
      updatedState = action.kvps;
      break;
    default:
      return state;
  }
  return updatedState;
}
