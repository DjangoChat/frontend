const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isNotBlank(value: string): boolean {
  return value.trim().length > 0
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}

export function isMinLength(value: string, min: number): boolean {
  return value.trim().length >= min
}

export function isMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max
}
