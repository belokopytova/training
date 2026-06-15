export function parseDate(input: string): { iso: string; display: string } | null {
  const match = input.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);
  if (!match) return null;

  const [, d, m, y] = match;
  const day = d.padStart(2, '0');
  const month = m.padStart(2, '0');
  const year = y.length === 2 ? `20${y}` : y;
  const iso = `${year}-${month}-${day}`;
  const date = new Date(iso);

  if (isNaN(date.getTime())) return null;
  return { iso, display: `${day}.${month}.${year}` };
}

export function formatDateToDisplay(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}