import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Register } from "../../types"
import {
  hasLowercase,
  hasNumber,
  hasSpecialCharacter,
  hasUppercase,
  isMaxLength,
  isMinLength,
  isNotBlank,
  isOnlyNumbers,
  isValidEmail,
} from "../../utils"

type RegisterErrors = {
  email?: string
  phone?: string
  password1?: string
  password2?: string
}

type RegisterState = Register & {
  errors: RegisterErrors
}

const initialState: RegisterState = {
  email: "",
  phone: "",
  password1: "",
  password2: "",
  errors: {},
}

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
      state.errors.email = undefined
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
      state.errors.phone = undefined
    },
    setPassword1(state, action: PayloadAction<string>) {
      state.password1 = action.payload
      state.errors.password1 = undefined
    },
    setPassword2(state, action: PayloadAction<string>) {
      state.password2 = action.payload
      state.errors.password2 = undefined
    },
    clearRegister(state) {
      state.email = ""
      state.phone = ""
      state.password1 = ""
      state.password2 = ""
      state.errors = {}
    },
    validateRegister(state) {
      const errors: RegisterErrors = {}

      if (!isNotBlank(state.email)) {
        errors.email = "Email is required"
      } else if (!isValidEmail(state.email)) {
        errors.email = "Invalid email format"
      }

      if (!isNotBlank(state.phone)) {
        errors.phone = "Phone number is required"
      } else if (!isOnlyNumbers(state.phone)) {
        errors.phone = "Phone number must contain only digits"
      } else if (!isMinLength(state.phone, 9)) {
        errors.phone = "Phone must be at least 9 characters"
      } else if (!isMaxLength(state.phone, 9)) {
        errors.phone = "Phone must be at most 9 characters"
      }

      if (!isNotBlank(state.password1)) {
        errors.password1 = "Password is required"
      } else if (!isMinLength(state.password1, 10)) {
        errors.password1 = "Password must be at least 10 characters"
      } else if (!isMaxLength(state.password1, 25)) {
        errors.password1 = "Password must be at most 25 characters"
      } else if (!hasUppercase(state.password1)) {
        errors.password1 = "Password must contain at least one uppercase letter"
      } else if (!hasLowercase(state.password1)) {
        errors.password1 = "Password must contain at least one lowercase letter"
      } else if (!hasNumber(state.password1)) {
        errors.password1 = "Password must contain at least one number"
      } else if (!hasSpecialCharacter(state.password1)) {
        errors.password1 =
          "Password must contain at least one special character"
      }

      if (!isNotBlank(state.password2)) {
        errors.password2 = "Please confirm your password"
      } else if (state.password1 !== state.password2) {
        errors.password2 = "Passwords do not match"
      }

      state.errors = errors
    },
  },
})

export const {
  setRegisterEmail,
  setPhone,
  setPassword1,
  setPassword2,
  clearRegister,
  validateRegister,
} = registerSlice.actions
export const registerReducer = registerSlice.reducer
