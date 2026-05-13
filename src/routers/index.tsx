import type { LocalesValues } from "@intlayer/types"
import { getHTMLTextDir, localeMap } from "intlayer"
import { useEffect } from "react"
import { IntlayerProvider } from "react-intlayer"
import { createBrowserRouter, Outlet } from "react-router"
import { GROUPS, ROUTES_KEYS } from "../constants"
import { AuthProvider } from "../contexts"
import { Plan, Price } from "../features/admin"
import { Stats } from "../features/analitical"
import { RegisterPage, RegisterSuccessPage, SignInPage } from "../features/auth"
import { Report } from "../features/maintainer"
import { Agent, Chat, Group, Subscription } from "../features/member"
import { ProfilePage, SubscriptionPage } from "../features/onboarding"
import { LandingPage, NotFoundPage } from "../features/public"
import { Home, Profile, Settings } from "../features/shared"
import { OnboardingLayout } from "../layouts"
import DashboardLayout from "../layouts/DashboardLayout"
import {
  DashboardGuardian,
  OnboardingProfileGuardian,
  OnboardingSubscriptionGuardian,
  OnboardinGuardian,
  RoleGuardian,
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
            <DashboardGuardian children={<DashboardLayout />} />
          </AuthProvider>
        ),
        children: [
          {
            index: true,
            element: (
              <RoleGuardian
                children={<Home />}
                roles={[
                  GROUPS.ADMIN,
                  GROUPS.ANALITICAL,
                  GROUPS.MAINTAINER,
                  GROUPS.MEMBER,
                ]}
              />
            ),
          },
          {
            path: "chat/",
            element: (
              <RoleGuardian children={<Chat />} roles={[GROUPS.MEMBER]} />
            ),
          },
          {
            path: "group/",
            element: (
              <RoleGuardian children={<Group />} roles={[GROUPS.MEMBER]} />
            ),
          },
          {
            path: "agent/",
            element: (
              <RoleGuardian children={<Agent />} roles={[GROUPS.MEMBER]} />
            ),
          },
          {
            path: "subscription/",
            element: (
              <RoleGuardian
                children={<Subscription />}
                roles={[GROUPS.MEMBER]}
              />
            ),
          },
          {
            path: "report/",
            element: (
              <RoleGuardian children={<Report />} roles={[GROUPS.MAINTAINER]} />
            ),
          },
          {
            path: "stat/",
            element: (
              <RoleGuardian children={<Stats />} roles={[GROUPS.ANALITICAL]} />
            ),
          },
          {
            path: "plan/",
            element: (
              <RoleGuardian children={<Plan />} roles={[GROUPS.ADMIN]} />
            ),
          },
          {
            path: "price/",
            element: (
              <RoleGuardian children={<Price />} roles={[GROUPS.ADMIN]} />
            ),
          },
          {
            path: "profile/",
            element: (
              <RoleGuardian
                children={<Profile />}
                roles={[
                  GROUPS.ADMIN,
                  GROUPS.ANALITICAL,
                  GROUPS.MAINTAINER,
                  GROUPS.MEMBER,
                ]}
              />
            ),
          },
          {
            path: "setting/",
            element: (
              <RoleGuardian
                children={<Settings />}
                roles={[
                  GROUPS.ADMIN,
                  GROUPS.ANALITICAL,
                  GROUPS.MAINTAINER,
                  GROUPS.MEMBER,
                ]}
              />
            ),
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
