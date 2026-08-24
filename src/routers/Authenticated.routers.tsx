import type { RouteObject } from "react-router"
import { AuthProvider } from "../contexts"
import { dashboardRoutes } from "./Dashboard.routers"
import { AuthenticatedGuardian, UserSetUpGuardian } from "./Guardians"
import { onboardingRoutes } from "./Onboarding.routers"

export const authenticatedRoutes = (): RouteObject[] => [
  {
    element: <AuthProvider />,
    children: [
      {
        element: <AuthenticatedGuardian />,
        children: [
          {
            index: true,
            element: <UserSetUpGuardian />,
          },
          ...onboardingRoutes(),
          ...dashboardRoutes(),
        ],
      },
    ],
  },
]
