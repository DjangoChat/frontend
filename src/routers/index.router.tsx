import type { LocalesValues } from "@intlayer/types"
import { getHTMLTextDir, localeMap } from "intlayer"
import { useEffect } from "react"
import { IntlayerProvider } from "react-intlayer"
import { createBrowserRouter, Outlet } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { RegisterPage, RegisterSuccessPage, SignInPage } from "../features/auth"
import { LandingPage, NotFoundPage } from "../features/public/screens"

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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  })),
])

export default router
