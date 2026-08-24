import { Chat, Group, Home, Settings } from "@mui/icons-material"
import type { RouteObject } from "react-router"
import { GROUPS, ROUTES_KEYS } from "../constants"
import { Plan, Price } from "../features/admin"
import { Stats } from "../features/analitical"
import { Report } from "../features/maintainer"
import { Agent, Subscription } from "../features/member"
import { Profile } from "../features/shared"
import DashboardLayout from "../layouts/DashboardLayout"
import { DashboardGuardian, RoleGuardian } from "./Guardians"

const ALL_DASHBOARD_ROLES = [
  GROUPS.ADMIN,
  GROUPS.ANALITICAL,
  GROUPS.MAINTAINER,
  GROUPS.MEMBER,
]

export const dashboardRoutes = (): RouteObject[] => [
  {
    path: ROUTES_KEYS.DASHBOARD.slice(1),
    element: <DashboardGuardian />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <RoleGuardian roles={ALL_DASHBOARD_ROLES}>
                <Home />
              </RoleGuardian>
            ),
          },
          {
            path: "chat/",
            element: (
              <RoleGuardian roles={[GROUPS.MEMBER]}>
                <Chat />
              </RoleGuardian>
            ),
          },
          {
            path: "group/",
            element: (
              <RoleGuardian roles={[GROUPS.MEMBER]}>
                <Group />
              </RoleGuardian>
            ),
          },
          {
            path: "agent/",
            element: (
              <RoleGuardian roles={[GROUPS.MEMBER]}>
                <Agent />
              </RoleGuardian>
            ),
          },
          {
            path: "subscription/",
            element: (
              <RoleGuardian roles={[GROUPS.MEMBER]}>
                <Subscription />
              </RoleGuardian>
            ),
          },
          {
            path: "report/",
            element: (
              <RoleGuardian roles={[GROUPS.MAINTAINER]}>
                <Report />
              </RoleGuardian>
            ),
          },
          {
            path: "stat/",
            element: (
              <RoleGuardian roles={[GROUPS.ANALITICAL]}>
                <Stats />
              </RoleGuardian>
            ),
          },
          {
            path: "plan/",
            element: (
              <RoleGuardian roles={[GROUPS.ADMIN]}>
                <Plan />
              </RoleGuardian>
            ),
          },
          {
            path: "price/",
            element: (
              <RoleGuardian roles={[GROUPS.ADMIN]}>
                <Price />
              </RoleGuardian>
            ),
          },
          {
            path: "profile/",
            element: (
              <RoleGuardian roles={ALL_DASHBOARD_ROLES}>
                <Profile />
              </RoleGuardian>
            ),
          },
          {
            path: "setting/",
            element: (
              <RoleGuardian roles={ALL_DASHBOARD_ROLES}>
                <Settings />
              </RoleGuardian>
            ),
          },
        ],
      },
    ],
  },
]
