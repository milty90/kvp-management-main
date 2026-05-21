import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { getLogActivities } from "../../storage/kvpDatabase";
import type { ActivityLog } from "../../types";

interface LogActivityModalProps {
  onClose: () => void;
}

export function LogActivityModal({ onClose }: LogActivityModalProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getLogActivities();
      setActivities(logs);
    };
    fetchLogs();
  }, []);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl font-bold pl-1">{"Activity Log"}</h2>
        <button
          type="button"
          className="absolute top-4 right-6 text-3xl bg-ground-600/80 text-secondary hover:text-text-primary"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="border-t border-border my-4"></div>
        <p className="text-sm font-semibold text-text-primary mb-2">Logs</p>
        {activities.length === 0 ? (
          <p className="text-sm text-text-secondary">No activity</p>
        ) : (
          activities.map((log) => (
            <div
              key={log.entityId + log.timestamp}
              className="flex justify-between text-sm text-text-secondary my-0.5"
            >
              <span>{log.details}</span>
              <span>{log.action}</span>
              <span>{log.userName}</span>
              <span className="text-xs">{formatDate(log.timestamp)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
