export type LoginRequest = {
  email: string
  password: string
}

export type UserBasic = {
  required: boolean
  first_name: string
  last_name: string
  nickname: string
  group: string
  avatar: string | null
}

export type SuscriptionBasic = {
  required: boolean
  plan: string
  status: string
  current_period_end: Date
}

export type AccessBasic = {
  required: boolean
  has_access: boolean
  last_day: Date
}

export type LoginResponse = {
  user: UserBasic
  subscription: SuscriptionBasic
  has_access: AccessBasic
}

export type Register = {
  email: string
  phone: string
  password1: string
  password2: string
}
