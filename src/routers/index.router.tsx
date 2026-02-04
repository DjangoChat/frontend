import type { LocalesValues } from "@intlayer/types"
import { getHTMLTextDir, localeMap } from "intlayer"
import { useEffect } from "react"
import { IntlayerProvider } from "react-intlayer"
import { createBrowserRouter, Outlet } from "react-router"
import { LandingPage } from "../features/public/screens"

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
    ],
  })),
])

export default router
