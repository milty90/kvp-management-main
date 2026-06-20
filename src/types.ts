import type { Tables, TablesInsert } from "./types/supabase";

export type Priority = "Low" | "Medium" | "High";
export type State = "Plan" | "Do" | "Check" | "Act" | "Rejected" | "Archived";
export type Statreport = "Total" | "Completed" | "Assigned" | "High Priority";


export type Kvp = Tables<"kvps">

export type InsertKvp = Omit<TablesInsert<"kvps">, "id" >;

export type User = Tables<"users">;

export type InsertUser = TablesInsert<"users">;

export type ActivityLog = Tables<"activity_logs">;

export type InsertActivityLog = Omit<TablesInsert<"activity_logs">, "id">;

export type ActivityAction = "CREATED" | "UPDATED" | "DELETED" | "REJECTED" | "ARCHIVED" | "RESTORED" | "SIGNED_UP" | "LOGGED_IN" | "LOGGED_OUT" | "PASSWORD_UPDATED";



export type FormColor = {
  pdcaState?: State ;
  targetDate?: string;
  priority?: Priority ;
};

export type KvpManagementState = Kvp[];

export type KvpManagementAction =
  | {
      type:
        | "ADD_KVP"
        | "UPDATE_KVP"
        | "DELETE_KVP"
        | "ARCHIVE_KVP"
        | "REJECT_KVP";
      kvp: Kvp;
    }
  | { type: "SET_KVPS"; kvps: Kvp[] };

export type UserManagementState = User[];

export type UserManagementAction =
  | {
      type: "ADD_USER" | "UPDATE_USER";
      user: User;
    }
  | { type: "DELETE_USER"; userId: string }
  | { type: "SET_USERS"; users: User[] };

export type ColorButtonType =
  | "color"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "gray"
  | "white";
