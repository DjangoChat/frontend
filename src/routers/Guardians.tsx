import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"
import { LoadingPage } from "../components"
import type { AuthStates } from "../constants"
import { AUTH_STATES, ROUTES_KEYS } from "../constants"
import type { GroupKey } from "../constants/Groups"
import { GROUPS } from "../constants/Groups"
import { useAuth } from "../hooks"

type GuardianProps = {
  children?: ReactNode
}

function CheckUserIsLoading(status: AuthStates): boolean {
  return status === AUTH_STATES.LOADING
}

function isNullable<T>(value: T): value is Extract<T, null | undefined> {
  return value == null
}

export const OnboardingProfileGuardian = ({ children }: GuardianProps) => {
  const { user } = useAuth()

  if (isNullable(user.user)) {
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

export const AuthenticatedGuardian = () => {
  const { user, status } = useAuth()

  if (CheckUserIsLoading(status)) {
    return <LoadingPage />
  }

  if (isNullable(user)) {
    return <Navigate to={ROUTES_KEYS.ROOT} />
  }

  if (
    !isNullable(user.user.required) &&
    !isNullable(user.subscription.required) &&
    !isNullable(user.has_access.required)
  ) {
    return <Navigate to={ROUTES_KEYS.DASHBOARD} />
  }

  if (isNullable(user.user)) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_PROFILE} />
  }

  if (isNullable(user.subscription) && user.user.group === GROUPS.MEMBER) {
    return <Navigate to={ROUTES_KEYS.ONBOARDING_SUBSCRIPTION} />
  }

  return <Outlet />
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
