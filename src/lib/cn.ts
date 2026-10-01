type ClassValue = string | number | bigint | boolean | null | undefined

/** Joins truthy class names. Kept dependency-free on purpose. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ')
}
