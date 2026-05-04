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
  photoUrl: string;
  department: string;
  role: string;
  firstName: string;
  lastName: string;
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

export type UserManagementState = User[];

export type UserManagementAction =
  | {
      type: "ADD_USER" | "UPDATE_USER";
      user: User;
    }
  | { type: "DELETE_USER"; userId: number }
  | { type: "SET_USERS"; users: User[] };

export type ColorButtonType =
  | "color"
  | "blue"
  | "green"
  | "violet"
  | "red"
  | "gray"
  | "white";
