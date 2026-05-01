import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { GROUPS } from "../constants/Groups"
import { useAuth } from "../hooks"

type GuardianProps = {
  children?: ReactNode
}

export const OnboardingProfileGuardian = ({ children }: GuardianProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (user?.user !== null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardingSubscriptionGuardian = ({ children }: GuardianProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={ROUTES_KEYS.LOGIN} />
  }

  // Allow access only if subscription is incomplete AND user is a MEMBER
  if (user.subscription !== null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  if (user.user?.group !== GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardinGuardian = () => {
  const { isAuth, user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuth) {
    return <Navigate to={ROUTES_KEYS.LOGIN} />
  }

  if (!user) {
    return <Navigate to={ROUTES_KEYS.LOGIN} />
  }

  // If all onboarding steps are complete, redirect to dashboard
  if (
    user.user !== null &&
    user.subscription !== null &&
    user.has_access !== null
  ) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  // Check each incomplete step in order
  if (user.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  // If user is on /onboarding/ index without being redirected above,
  // they've completed all steps - redirect to dashboard
  return <Navigate to={ROUTES_KEYS.DASHBOARD} />
}

export const DashboardGuardian = ({ children }: GuardianProps) => {
  const { isAuth, user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuth) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (!user) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  // Redirect incomplete profiles to onboarding
  if (user.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  // Redirect members without subscription to subscription onboarding
  if (user.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <>{children}</>
}
