export function LogActivity({
  userId,
  userName,
  action,
  entityType,
  entityId,
  details,
}: {
  userId: string;
  userName: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "LOGIN" | "LOGOUT";
  entityType: "KVP" | "USER" | "AUTH";
  entityId?: string;
  details?: string;
}) {
  return (
    <div className="border-b border-gray-300 py-2">
      <div className="text-sm font-medium text-gray-800">{userName}</div>
      <div className="text-xs text-gray-500">
        {action} {entityType} {entityId ? `(${entityId})` : ""} -{" "}
        {new Date().toLocaleString()}
      </div>
      {details && <div className="text-sm text-gray-700 mt-1">{details}</div>}
    </div>
  );
}
