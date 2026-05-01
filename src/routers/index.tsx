import type { LocalesValues } from "@intlayer/types"
import { getHTMLTextDir, localeMap } from "intlayer"
import { useEffect } from "react"
import { IntlayerProvider } from "react-intlayer"
import { createBrowserRouter, Outlet } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { AuthProvider } from "../contexts"
import { RegisterPage, RegisterSuccessPage, SignInPage } from "../features/auth"
import { ProfilePage, SubscriptionPage } from "../features/onboarding"
import { LandingPage, NotFoundPage } from "../features/public"
import { OnboardingLayout } from "../layouts"
import DashboardLayout from "../layouts/DashboardLayout"
import {
  DashboardGuardian,
  OnboardingProfileGuardian,
  OnboardingSubscriptionGuardian,
  OnboardinGuardian,
} from "./Guardians"

const useI18nHTMLAttributes = (locale: LocalesValues) => {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = getHTMLTextDir(locale)
  }, [locale])
}

const LocaleLayout = ({ locale }: { locale: LocalesValues }) => {
  useI18nHTMLAttributes(locale)
  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  )
}

const router = createBrowserRouter([
  ...localeMap(({ locale, urlPrefix }) => ({
    path: urlPrefix,
    element: <LocaleLayout locale={locale} />,
    children: [
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
      {
        path: ROUTES_KEYS.ONBOARDING.slice(1),
        element: (
          <AuthProvider>
            <OnboardingLayout />
          </AuthProvider>
        ),
        children: [
          {
            index: true,
            element: <OnboardinGuardian />,
          },
          {
            path: "profile/",
            element: (
              <OnboardingProfileGuardian>
                <ProfilePage />
              </OnboardingProfileGuardian>
            ),
          },
          {
            path: "subscription/",
            element: (
              <OnboardingSubscriptionGuardian>
                <SubscriptionPage />
              </OnboardingSubscriptionGuardian>
            ),
          },
        ],
      },
      {
        path: ROUTES_KEYS.DASHBOARD.slice(1),
        element: (
          <AuthProvider>
            <DashboardGuardian />
          </AuthProvider>
        ),
        children: [
          {
            index: true,
            element: <DashboardLayout />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  })),
])

export default router
