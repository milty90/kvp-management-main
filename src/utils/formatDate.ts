export function formatDate(dateString: string): string {
  const date = new Date(parseInt(dateString, 10));
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString();
}
