interface CapitalizeParams {
  string: string
}

export const capitalize = ({ string }: CapitalizeParams): string => {
  if (typeof string !== 'string' || string.length === 0) return string

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
