import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"
import { LoadingPage } from "../components"
import { AUTH_STATES, ROUTES_KEYS } from "../constants"
import type { GroupKey } from "../constants/Groups"
import { useAuth, useAuthenticatedAuth, useLoadParticipants } from "../hooks"

type RoleGuardianProps = {
  children?: ReactNode
  roles: GroupKey[]
}

export const AuthenticatedGuardian = () => {
  const { status } = useAuth()

  if (status == AUTH_STATES.LOADING) {
    return <LoadingPage />
  }

  if (status == AUTH_STATES.ERROR) {
    return <Navigate to={ROUTES_KEYS.ROOT} replace />
  }

  if (status == AUTH_STATES.UNAUTHENTICATED) {
    return <Navigate to={ROUTES_KEYS.ROOT} replace />
  }

  return <Outlet />
}

export const UserSetUpGuardian = () => {
  const { user } = useAuthenticatedAuth()

  if (user.user.required || user.subscription.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <Navigate to={ROUTES_KEYS.DASHBOARD} />
}

export const OnboardingGuardian = () => {
  const { user } = useAuthenticatedAuth()

  if (!user.user.required && !user.subscription.required) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  if (user.user.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (user.subscription.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <Navigate to={ROUTES_KEYS.DASHBOARD} />
}

export const OnboardingProfileGuardian = () => {
  const { user } = useAuthenticatedAuth()

  if (!user.user.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <Outlet />
}

export const OnboardingSubscriptionGuardian = () => {
  const { user } = useAuthenticatedAuth()

  if (!user.subscription.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <Outlet />
}

export const DashboardGuardian = () => {
  const { user } = useAuthenticatedAuth()
  useLoadParticipants()

  if (user.user.required || user.subscription.required) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING} />
  }

  return <Outlet />
}

export const RoleGuardian = ({ children, roles }: RoleGuardianProps) => {
  const { user } = useAuthenticatedAuth()

  if (!user.user.group || !roles.includes(user.user.group as GroupKey)) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  return <>{children}</>
}
