import type { Kvp, State, Priority } from "../types";

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
}: FormData) {
  const newKvp: Kvp = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    state: pdcaState,
    assignedTo: assignedTo.trim(),
    targetDate,
    priority,
    createdBy: "Aktueller Benutzer",
    createdAt: new Date().toISOString().split("T")[0],
    benefit: benefit.trim(),
  };

  const updateKvpData: Kvp = {
    id: initialData?.id || Date.now(),
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    state: pdcaState,
    assignedTo: assignedTo.trim(),
    targetDate,
    priority,
    createdBy: initialData?.createdBy || "Aktueller Benutzer",
    createdAt: initialData?.createdAt || new Date().toISOString().split("T")[0],
    benefit: initialData?.benefit || benefit.trim(),
  };

  return {
    newKvp,
    updateKvpData,
  };
}
