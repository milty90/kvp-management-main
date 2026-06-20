import { type ActivityLog } from "../types";

export function sortLogsByTimestamp(logs: ActivityLog[]): ActivityLog[] {
  
   return logs.sort((a, b) => {
    const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return dateA - dateB;
  });
}