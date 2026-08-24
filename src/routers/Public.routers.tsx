import type { RouteObject } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { RegisterPage, RegisterSuccessPage, SignInPage } from "../features/auth"
import { LandingPage } from "../features/public"

export const publicRouters = (): RouteObject[] => [
  {
    element: <LandingPage />,
    index: true,
  },
  {
    path: ROUTES_KEYS.LOGIN.slice(1),
    element: <SignInPage />,
  },
  {
    path: ROUTES_KEYS.REGISTER.slice(1),
    element: <RegisterPage />,
  },
  {
    path: ROUTES_KEYS.REGISTER_SUCCESS.slice(1),
    element: <RegisterSuccessPage />,
  },
]
