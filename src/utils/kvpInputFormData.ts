import type {InsertKvp, Kvp, State, Priority } from "../types";

interface FormData {
  title: string;
  description: string;
  category: string;
  pdcaState: State;
  assignedTo: string;
  targetDate: string;
  priority: Priority;
  benefit: string;
  initialData?: Kvp;
  createdBy: string;
}

export function kvpInputFormData({
  title,
  description,
  category,
  pdcaState,
  assignedTo,
  targetDate,
  priority,
  benefit,
  initialData,
  createdBy,
}: FormData) {
  const newKvp: InsertKvp = {
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    state: pdcaState,
    assignedTo: assignedTo.trim(),
    targetDate,
    priority,
    createdBy: createdBy,
    createdAt: new Date().toISOString().split("T")[0],
    benefit: benefit.trim(),
  };

  const updateKvpData: Kvp = {
    id: initialData?.id ?? Date.now(),
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    state: pdcaState,
    assignedTo: assignedTo.trim(),
    targetDate,
    priority,
    createdBy: initialData?.createdBy ?? createdBy,
    createdAt: initialData?.createdAt ?? new Date().toISOString().split("T")[0],
    benefit: benefit?.trim(),
  };

  return {
    newKvp,
    updateKvpData,
  };
}
