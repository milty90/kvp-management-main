export type Priority = "Low" | "Medium" | "High";
export type State = "Plan" | "Do" | "Check" | "Act" | "Abgelehnt";
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

export type KvpManagementAction = {
  type: "ADD_KVP" | "UPDATE_KVP" | "DELETE_KVP" | "ARCHIVE_KVP";
  kvp: Kvp;
};

export type ColorButtonType =
  | "blue"
  | "green"
  | "violet"
  | "red"
  | "gray"
  | "white";
