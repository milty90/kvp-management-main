import type { State, Priority } from "../types";
import type { FormColor } from "../types";

const PRIORITY_COLORS: Record<Priority, string> = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
};

const PDCA_COLORS: Record<State, string> = {
  Plan: "text-blue-500",
  Do: "text-violet-500",
  Check: "text-yellow-500",
  Act: "text-green-500",
  Rejected: "text-red-500",
  Archived: "text-gray-400",
};

export function kvpInputFormColor({
  pdcaState,
  targetDate,
  priority,
}: FormColor) {
  const priorityTextColor = priority
    ? PRIORITY_COLORS[priority as Priority]
    : "text-text-secondary";
  const pcdaTextColor = pdcaState
    ? PDCA_COLORS[pdcaState as State]
    : "text-text-secondary";

  const targetDateTextColor = !targetDate
    ? "text-text-secondary"
    : new Date(targetDate) < new Date()
      ? "text-red-500"
      : "text-text-primary";

  return { priorityTextColor, pcdaTextColor, targetDateTextColor };
}
