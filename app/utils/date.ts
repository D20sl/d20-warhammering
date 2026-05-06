export function formatDate(date: Date | string | null | undefined) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
