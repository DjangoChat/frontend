import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { GROUPS } from "../constants/Groups"
import { useAuth } from "../hooks"

type GuardianProps = {
  children?: ReactNode
}

export const OnboardingProfileGuardian = ({ children }: GuardianProps) => {
  const { user } = useAuth()

  if (user?.user !== null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardingSubscriptionGuardian = ({ children }: GuardianProps) => {
  const { user } = useAuth()

  if (user?.subscription !== null || user.user?.group !== GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardinGuardian = () => {
  const { isAuth, user } = useAuth()

  if (!isAuth) {
    return <Navigate to={ROUTES_KEYS.LOGIN} />
  }

  if (user?.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user?.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <Navigate to={ROUTES_KEYS.DASHBOARD} />
}

export const DashboardGuardian = ({ children }: GuardianProps) => {
  const { isAuth, user } = useAuth()

  if (!isAuth) {
    return <Navigate to={ROUTES_KEYS.LOGIN} />
  }

  if (user?.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user?.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <>{children}</>
}
