export type LoginRequest = {
  email: string
  password: string
}

export type UserBasic = {
  first_name: string
  last_name: string
  nickname: string
  group: string
}

export type SuscriptionBasic = {
  plan: string
  status: string
  current_period_end: Date
}

export type AccessBasic = {
  has_access: boolean
  last_day: Date
}

export type LoginResponse = {
  user: UserBasic | null
  subscription: SuscriptionBasic | null
  has_access: AccessBasic | null
}

export type Register = {
  email: string
  phone: string
  password1: string
  password2: string
}
