export function parseDateFromFilename(filename: string): Date | undefined {
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) {
    const d = new Date(match[1]);
    if (!isNaN(d.getTime())) {
      return d;
    }
  }
  return undefined;
}

export function formatDateDisplay(date: Date): string {
  // Output format: '2 January 2024' (day first, full month, year, no commas)
  return date
    .toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    .replace(/,/g, '');
}
