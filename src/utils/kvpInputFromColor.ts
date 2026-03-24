import type { State, Priority } from "../types";
import type { FormColor } from "../types";

const PRIORITY_COLORS: Record<Priority, string> = {
  High: "text-red-700",
  Medium: "text-yellow-700",
  Low: "text-green-700",
};

const PDCA_COLORS: Record<State, string> = {
  Plan: "text-blue-700",
  Do: "text-violet-700",
  Check: "text-yellow-700",
  Act: "text-green-700",
  Abgelehnt: "text-red-700",
};

export function kvpInputFormColor({
  pdcaState,
  targetDate,
  priority,
}: FormColor) {
  const priorityTextColor = priority
    ? PRIORITY_COLORS[priority as Priority]
    : "text-gray-400";
  const pcdaTextColor = pdcaState
    ? PDCA_COLORS[pdcaState as State]
    : "text-gray-400";

  const targetDateTextColor = !targetDate
    ? "text-gray-400"
    : new Date(targetDate) < new Date()
      ? "text-red-700"
      : "text-gray-700";

  return { priorityTextColor, pcdaTextColor, targetDateTextColor };
}
