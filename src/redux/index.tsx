import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { api } from "./services"
import { registerReducer, signinReducer } from "./slices"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    signin: signinReducer,
    register: registerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export * from "./services"
export * from "./slices"
