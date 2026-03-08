/**
 * cn — class name composer
 * Accepts strings, conditionals, objects, and arrays.
 * Eliminates ALL inline .join(' ') and template strings for classNames.
 *
 * Usage:
 *   cn('base', isActive && 'active', { 'extra': condition })
 *   cn('base', ['always', isActive && 'conditional'])
 */
type ClassValue =
  | string
  | undefined
  | null
  | false
  | 0
  | ClassValue[]
  | Record<string, boolean | undefined | null>

export const cn = (...inputs: ClassValue[]): string => {
  const out: string[] = []

  const process = (val: ClassValue): void => {
    if (!val && val !== 0) return
    if (typeof val === 'string') { out.push(val); return }
    if (Array.isArray(val)) { val.forEach(process); return }
    if (typeof val === 'object') {
      Object.entries(val).forEach(([k, v]) => { if (v) out.push(k) })
    }
  }

  inputs.forEach(process)
  return out.join(' ')
}

/**
 * cv — class variants builder
 * Defines a base + variant map, returns a composer function.
 * Replaces repeating ternary chains for component variants.
 *
 * Usage:
 *   const pill = cv(
 *     'px-3 py-1.5 rounded-xl transition-colors',
 *     {
 *       intent: {
 *         active:   'bg-primary/15 text-primary border border-primary/30',
 *         inactive: 'text-muted-foreground hover:text-foreground',
 *       },
 *       size: {
 *         sm: 'text-xs',
 *         md: 'text-sm',
 *       }
 *     }
 *   )
 *   pill({ intent: 'active', size: 'md' })
 */
type VariantMap = Record<string, Record<string, string>>
type VariantKeys<T extends VariantMap> = { [K in keyof T]?: keyof T[K] }

export const cv = <T extends VariantMap>(
  base: string,
  variants: T,
) => (
  selected: VariantKeys<T>,
  extra?: ClassValue,
): string => {
  const variantClasses = Object.entries(selected)
    .map(([key, value]) => variants[key]?.[value as string] ?? '')
    .filter(Boolean)
  return cn(base, ...variantClasses, extra)
}
