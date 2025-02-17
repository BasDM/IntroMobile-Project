export function formatDate(dateToFormat: Date) {
  const date = new Date(dateToFormat);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat(undefined, options).format(date);
}