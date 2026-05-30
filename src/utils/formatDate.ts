export function formatDate(dateString: string): string {
  const normalized = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  const normalized = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
