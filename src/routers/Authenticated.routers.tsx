import { AuthProvider } from "../contexts"
import { dashboardRoutes } from "./Dashboard.routers"
import { AuthenticatedGuardian } from "./Guardians"
import { onboardingRoutes } from "./Onboarding.routers"

export const authenticatedRoutes = () => [
  {
    element: <AuthProvider />,
    children: [
      {
        element: <AuthenticatedGuardian />,
        children: [...onboardingRoutes(), ...dashboardRoutes()],
      },
    ],
  },
]
