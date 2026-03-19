export type Priority = "Low" | "Medium" | "High";
export type State = "Plan" | "Do" | "Check" | "Act" | "Abgelehnt" | "Closed";
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
  expectedBenefit?: string;
};

export type ColorButtonType =
  | "blue"
  | "green"
  | "violet"
  | "red"
  | "gray"
  | "white";
