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
export function isOnlyNumbers(value: string): boolean {
  return /^\d+$/.test(value.trim())
}

export function hasUppercase(value: string): boolean {
  return /[A-Z]/.test(value)
}

export function hasLowercase(value: string): boolean {
  return /[a-z]/.test(value)
}

export function hasNumber(value: string): boolean {
  return /\d/.test(value)
}

export function hasSpecialCharacter(value: string): boolean {
  return /[!@#$%^&*()_+\-=[]{};':"\\|,.<>?]/.test(value)
}
