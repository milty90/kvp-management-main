import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/formatDate";
import { getLogActivities } from "../../storage/kvpDatabase";
import type { ActivityLog } from "../../types";
import LoadingSpinner from "./LoadingSpinner";
import { useTranslation } from "../../utils/useTranslation";

interface LogActivityModalProps {
  onClose: () => void;
}

export function LogActivityModal({ onClose }: LogActivityModalProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const translations = useTranslation();

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const logs = await getLogActivities();

      setActivities(logs);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className=" bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full md:h-auto max-w-4xl relative">
        <div className="flex  items-center justify-between">
          <h2 className="text-xl font-bold pl-1">
            {translations.activityLog.title}
          </h2>
        </div>
        <button
          type="button"
          className="absolute top-4 right-6 text-3xl bg-ground-600/80 text-secondary hover:text-text-primary"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="border-t border-border my-4"></div>

        {activities.length === 0 ? (
          <div className="flex items-center justify-center h-50 mt-8 rounded-lg">
            {loading ? (
              <LoadingSpinner
                text={translations.activityLog.loading}
                size="medium"
              />
            ) : (
              <p className="text-sm text-text-secondary">
                {translations.activityLog.noActivities}
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-auto md:max-h-[60vh] scrollbar-none">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="py-2 px-3">
                    {translations.activityLog.entityType}
                  </th>
                  <th className="py-2 px-3">
                    {translations.activityLog.details}
                  </th>
                  <th className="py-2 px-3">
                    {translations.activityLog.action}
                  </th>
                  <th className="py-2 px-3">{translations.activityLog.user}</th>
                  <th className="py-2 px-3 text-center">
                    {translations.activityLog.timestamp}
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((log) => (
                  <tr
                    key={log.entityId + log.timestamp}
                    className="border-b border-border/50 hover:bg-ground-600/30"
                  >
                    <td className="py-2 px-3 text-text-secondary">
                      {log.entityType}
                    </td>
                    <td className="py-2 px-3">{log.details}</td>
                    <td className="py-2 px-3">{log.action}</td>
                    <td className="py-2 px-3">{log.userName}</td>
                    <td className="py-2 px-3 text-xs text-center">
                      {formatDateTime(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
