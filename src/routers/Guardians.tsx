import type { ReactNode } from "react"
import { useEffect } from "react"
import { Navigate } from "react-router"
import { LoadingPage } from "../components"
import { AUTH_STATES, ROUTES_KEYS } from "../constants"
import type { GroupKey } from "../constants/Groups"
import { GROUPS } from "../constants/Groups"
import { useAuth } from "../hooks"

type GuardianProps = {
  children?: ReactNode
}

export const OnboardingProfileGuardian = ({ children }: GuardianProps) => {
  const { user, status } = useAuth()

  if (status === AUTH_STATES.LOADING) {
    return <LoadingPage />
  }

  if (!user || status === AUTH_STATES.UNAUTHENTICATED) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (user.user !== null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardingSubscriptionGuardian = ({ children }: GuardianProps) => {
  const { user, status } = useAuth()

  if (status === AUTH_STATES.LOADING) {
    return <LoadingPage />
  }

  if (!user || status === AUTH_STATES.UNAUTHENTICATED) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (user.subscription !== null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  if (user.user?.group !== GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <>{children}</>
}

export const OnboardinGuardian = () => {
  const { user, status, refetchData } = useAuth()

  useEffect(() => {
    void refetchData()
  }, [refetchData])

  if (status === AUTH_STATES.LOADING) {
    return <LoadingPage />
  }

  if (!user || status === AUTH_STATES.UNAUTHENTICATED) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (
    user.user !== null &&
    user.subscription !== null &&
    user.has_access !== null
  ) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  if (user.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <Navigate to={ROUTES_KEYS.DASHBOARD} />
}

export const DashboardGuardian = ({ children }: GuardianProps) => {
  const { user, status } = useAuth()

  if (status === AUTH_STATES.LOADING) {
    return <LoadingPage />
  }

  if (!user || status === AUTH_STATES.UNAUTHENTICATED) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (user.user === null) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user.subscription === null && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <>{children}</>
}

type RoleGuardianProps = {
  children?: ReactNode
  roles: GroupKey[]
}

export const RoleGuardian = ({ children, roles }: RoleGuardianProps) => {
  const { user } = useAuth()

  if (!user?.user?.group || !roles.includes(user.user.group as GroupKey)) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  return <>{children}</>
}
