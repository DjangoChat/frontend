import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { errorMiddleware } from "./middleware"
import { api } from "./services"
import {
  agentReducer,
  notificationReducer,
  profileReducer,
  registerReducer,
  signinReducer,
  socketReducer,
} from "./slices"
import { socketMiddleware } from "./sockets"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    agentPage: agentReducer,
    notification: notificationReducer,
    signin: signinReducer,
    register: registerReducer,
    profile: profileReducer,
    sockets: socketReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      api.middleware,
      errorMiddleware,
      socketMiddleware,
    ),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export * from "./services"
export * from "./slices"
export * from "./sockets"
