import { AuthProvider } from "../contexts"
import { dashboardRoutes } from "./Dashboard.routers"
import { AuthenticatedGuardian, UserSetUpGuardian } from "./Guardians"
import { onboardingRoutes } from "./Onboarding.routers"

export const authenticatedRoutes = () => [
  {
    element: <AuthProvider />,
    children: [
      {
        element: <AuthenticatedGuardian />,
        children: [
          {
            element: <UserSetUpGuardian />,
            children: [...onboardingRoutes(), ...dashboardRoutes()],
          },
        ],
      },
    ],
  },
]
