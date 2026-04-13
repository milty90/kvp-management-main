export type Priority = "Low" | "Medium" | "High";
export type State = "Plan" | "Do" | "Check" | "Act" | "Rejected" | "Archived";
export type Statreport = "Total" | "Completed" | "Assigned" | "High Priority";

export type Kvp = {
  id: number;
  title: string;
  category: string;
  assignedTo: string;
  description: string;
  state: State;
  priority: Priority;
  createdBy: string;
  createdAt: string;
  targetDate: string;
  benefit?: string;
};

export type User = {
  id: number;
  userName: string;
  userEmail: string;
  createdAt: string;
  lastSignIn: string;
};

export type FormColor = {
  pdcaState?: State | "";
  targetDate?: string;
  priority?: Priority | "";
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

export type ColorButtonType =
  | "blue"
  | "green"
  | "violet"
  | "red"
  | "gray"
  | "white";
