export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function valueUpdater(
  row: Record<string, any>,
  key: string,
  value: any
) {
  row[key] = value;
}
