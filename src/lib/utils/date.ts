import { format, formatDistance, formatRelative, parseISO } from 'date-fns';

export function formatDate(date: string | Date, pattern = 'PPP'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern);
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true });
}

export function formatListingDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatRelative(d, new Date());
}
