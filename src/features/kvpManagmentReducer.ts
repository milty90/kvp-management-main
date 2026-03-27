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
      // Hier könnte man eine Archivierungslogik implementieren, z.B. durch Setzen eines "archived" Flags oder Verschieben des KVPs in eine separate Liste. Für jetzt wird es einfach gelöscht.
      updatedState = state.map((kvp) =>
        kvp.id === action.kvp.id ? { ...kvp, isArchived: true } : kvp,
      );
      break;
    case "REJECT_KVP":
      // Hier könnte man eine Ablehnungslogik implementieren, z.B. durch Setzen eines "rejected" Flags oder Verschieben des KVPs in eine separate Liste. Für jetzt wird es einfach gelöscht.
      updatedState = state.map((kvp) =>
        kvp.id === action.kvp.id ? { ...kvp, isRejected: true } : kvp,
      );
      break;
    default:
      return state;
  }
  return updatedState;
}
