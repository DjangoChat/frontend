import { ROUTES_KEYS } from "../constants"
import { ProfilePage, SubscriptionPage } from "../features/onboarding"
import { OnboardingLayout } from "../layouts"
import {
  OnboardingProfileGuardian,
  OnboardingSubscriptionGuardian,
} from "./Guardians"

export const onboardingRoutes = () => [
  {
    path: ROUTES_KEYS.ONBOARDING.slice(1),
    element: <OnboardingLayout />,
    children: [
      {
        path: "profile/",
        element: <OnboardingProfileGuardian />,
        children: [
          {
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "subscription/",
        element: <OnboardingSubscriptionGuardian />,
        children: [
          {
            element: <SubscriptionPage />,
          },
        ],
      },
    ],
  },
]
