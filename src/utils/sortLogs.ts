import { type ActivityLog } from "../types";

export function sortLogsByTimestamp(logs: ActivityLog[]): ActivityLog[] {
  return logs.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}