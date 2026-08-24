import type { RouteObject } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { ProfilePage, SubscriptionPage } from "../features/onboarding"
import { OnboardingLayout } from "../layouts"
import {
  OnboardingGuardian,
  OnboardingProfileGuardian,
  OnboardingSubscriptionGuardian,
} from "./Guardians"

export const onboardingRoutes = (): RouteObject[] => [
  {
    path: ROUTES_KEYS.ONBOARDING.slice(1),
    element: <OnboardingLayout />,
    children: [
      {
        index: true,
        element: <OnboardingGuardian />,
      },
      {
        path: "profile/",
        element: <OnboardingProfileGuardian />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "subscription/",
        element: <OnboardingSubscriptionGuardian />,
        children: [
          {
            index: true,
            element: <SubscriptionPage />,
          },
        ],
      },
    ],
  },
]
