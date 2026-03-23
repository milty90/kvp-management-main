import type { State, Priority } from "../types";

interface FormColor {
  pdcaState: State;
  targetDate: string;
  priority: Priority;
}

export function kvpInputFormColor({
  pdcaState,
  targetDate,
  priority,
}: FormColor) {
  const priorityTextColor =
    priority === "High"
      ? "text-red-700"
      : priority === "Medium"
        ? "text-yellow-700"
        : priority === "Low"
          ? "text-green-700"
          : "text-gray-400";

  const pcdaTextColor =
    pdcaState === "Plan"
      ? "text-blue-700"
      : pdcaState === "Do"
        ? "text-violet-700"
        : pdcaState === "Check"
          ? "text-yellow-700"
          : pdcaState === "Act"
            ? "text-green-700"
            : "text-gray-400";

  const targetDateTextColor = targetDate
    ? new Date(targetDate) < new Date()
      ? "text-red-700"
      : "text-gray-700"
    : "text-gray-400";
  return {
    priorityTextColor,
    pcdaTextColor,
    targetDateTextColor,
  };
}
