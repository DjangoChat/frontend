import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ProfileBasic } from "../../types"
import { isNotBlank } from "../../utils"

type ProfileErrors = {
  nickname?: string
  first_name?: string
  last_name?: string
  gender?: string
  custom_gender?: string
  birth_date?: string
  avatar?: string
}

type ProfileState = Partial<ProfileBasic> & {
  errors: ProfileErrors
  isLoading: boolean
  isSaving: boolean
}

const initialState: ProfileState = {
  id: undefined,
  nickname: "",
  first_name: "",
  last_name: "",
  gender: "",
  custom_gender: "",
  birth_date: undefined,
  avatar: undefined,
  errors: {},
  isLoading: false,
  isSaving: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action: PayloadAction<Partial<ProfileBasic>>) {
      Object.assign(state, action.payload)
      state.errors = {}
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload
      state.errors.nickname = undefined
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.first_name = action.payload
      state.errors.first_name = undefined
    },
    setLastName(state, action: PayloadAction<string>) {
      state.last_name = action.payload
      state.errors.last_name = undefined
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload
      state.errors.gender = undefined
    },
    setCustomGender(state, action: PayloadAction<string>) {
      state.custom_gender = action.payload
      state.errors.custom_gender = undefined
    },
    setBirthDate(state, action: PayloadAction<Date>) {
      state.birth_date = action.payload
      state.errors.birth_date = undefined
    },
    setAvatar(state, action: PayloadAction<File | undefined>) {
      state.avatar = action.payload
      state.errors.avatar = undefined
    },
    setErrors(state, action: PayloadAction<ProfileErrors>) {
      state.errors = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload
    },
    resetProfile() {
      return initialState
    },
    validateProfile(state) {
      const errors: ProfileErrors = {}

      if (!isNotBlank(state.nickname ?? "")) {
        errors.nickname = "Nickname is required"
      }

      if (!isNotBlank(state.first_name ?? "")) {
        errors.first_name = "First name is required"
      }

      if (!isNotBlank(state.last_name ?? "")) {
        errors.last_name = "Last name is required"
      }

      if (!isNotBlank(state.gender ?? "")) {
        errors.gender = "Gender is required"
      }

      if (state.gender === "custom" && !isNotBlank(state.custom_gender ?? "")) {
        errors.custom_gender = "Please specify your gender"
      }

      if (!state.birth_date) {
        errors.birth_date = "Birth date is required"
      }

      state.errors = errors
    },
  },
})

export const {
  setProfileData,
  setNickname,
  setFirstName,
  setLastName,
  setGender,
  setCustomGender,
  setBirthDate,
  setAvatar,
  setErrors,
  setLoading,
  setSaving,
  resetProfile,
  validateProfile,
} = profileSlice.actions

export const profileReducer = profileSlice.reducer
