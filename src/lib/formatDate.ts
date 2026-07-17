export function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
