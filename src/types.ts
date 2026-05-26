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

export type User = {
  userId: string;
  photoUrl?: string;
  department?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  lastSignIn: string;
  aboutMe?: string;
};

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

export type ActivityLog = {
  id: string;
  userId: string;
  userName: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "REJECTED" | "ARCHIVED" | "RESTORED" | "SIGNED_UP"  | "LOGGED_IN";
  entityType: "PDCA" | "USER" | "AUTH";
  entityId?: string;
  details?: string;
  timestamp: string;
};
