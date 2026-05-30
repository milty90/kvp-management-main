import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/formatDate";
import { getLogActivities } from "../../storage/kvpDatabase";
import type { ActivityLog } from "../../types";
import LoadingSpinner from "./LoadingSpinner";
import { useTranslation } from "../../utils/useTranslation";
import { useTheme } from "../../context/ThemeContext";

interface LogActivityModalProps {
  onClose: () => void;
}

export function LogActivityModal({ onClose }: LogActivityModalProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const translations = useTranslation();
  const { theme } = useTheme();

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
      <div className="bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full md:max-w-4xl relative h-full md:h-auto flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold pl-1">
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
          <div className="flex items-center justify-center h-150 md:h-80">
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
          <div className="overflow-auto flex-1 md:max-h-[60vh] scrollbar-none">
            <div className="md:hidden flex flex-col gap-2 pb-4">
              {activities.map((log) => (
                <div
                  key={log.entityId + log.timestamp}
                  className="border border-border rounded-lg p-3 text-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-xs text-text-secondary">
                      {formatDateTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-text-secondary text-xs mb-1">
                    {log.details}
                  </p>
                  <div className="flex gap-2 text-xs text-text-secondary">
                    <span className="font-semibold">{log.entityType}</span>
                    <span>
                      #
                      {theme === "dark" ? (
                        <img
                          src="/user-white.svg"
                          alt="User Icon"
                          className="inline w-3 h-3 mb-1 ml-1 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src="/user.svg"
                          alt="User Icon"
                          className="inline w-3 h-3 mb-1 ml-1 rounded-full object-cover"
                        />
                      )}
                    </span>
                    <span>{log.userName}</span>
                  </div>
                </div>
              ))}
            </div>

            <table className="hidden md:table w-full text-sm">
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
                      <span className="font-medium">{log.entityType}</span>
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
