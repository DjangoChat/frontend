import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Login } from "../../types"
import { isMinLength, isNotBlank, isValidEmail } from "../../utils"

type SignInErrors = {
  email?: string
  password?: string
}

type SignInState = Login & {
  errors: SignInErrors
}

const initialState: SignInState = {
  email: "",
  password: "",
  errors: {},
}

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
      state.errors.email = undefined
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
      state.errors.password = undefined
    },
    clear(state) {
      state.email = ""
      state.password = ""
      state.errors = {}
    },
    validate(state) {
      const errors: SignInErrors = {}

      if (!isNotBlank(state.email)) {
        errors.email = "Email is required"
      } else if (!isValidEmail(state.email)) {
        errors.email = "Invalid email format"
      }

      if (!isNotBlank(state.password)) {
        errors.password = "Password is required"
      } else if (!isMinLength(state.password, 8)) {
        errors.password = "Password must be at least 8 characters"
      }

      state.errors = errors
    },
  },
})

export const { setEmail, setPassword, clear, validate } = signinSlice.actions
export const signinReducer = signinSlice.reducer
