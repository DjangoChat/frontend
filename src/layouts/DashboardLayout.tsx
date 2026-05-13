import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded"
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded"
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import PaidRoundedIcon from "@mui/icons-material/PaidRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Divider from "@mui/joy/Divider"
import GlobalStyles from "@mui/joy/GlobalStyles"
import IconButton from "@mui/joy/IconButton"
import Input from "@mui/joy/Input"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Sheet from "@mui/joy/Sheet"
import Typography from "@mui/joy/Typography"
import { Outlet } from "react-router"
import { ThemeToggleButton } from "../components/ThemeToggleButton"
import type { RouteKey } from "../constants"
import { ROUTES_KEYS } from "../constants"
import { GROUPS, type GroupKey } from "../constants/Groups"
import { useAuth } from "../hooks"

type MenuItem = {
  id: string
  label: string
  icon: React.ReactNode
  href: RouteKey
}

const MENU_ITEMS_BY_GROUP: Record<GroupKey, MenuItem[]> = {
  MEMBER: [
    {
      id: "home",
      label: "Home",
      icon: <HomeRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD,
    },
    {
      id: "chats",
      label: "Chats",
      icon: <ChatBubbleRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_CHAT,
    },
    {
      id: "groups",
      label: "Groups",
      icon: <GroupRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_GROUP,
    },
    {
      id: "agents",
      label: "Agents",
      icon: <SmartToyRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_AGENT,
    },
  ],
  MAINTAINER: [
    {
      id: "home",
      label: "Home",
      icon: <HomeRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <AssessmentRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_REPORT,
    },
  ],
  ANALITICAL: [
    {
      id: "home",
      label: "Home",
      icon: <HomeRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD,
    },
    {
      id: "stats",
      label: "Stats",
      icon: <AnalyticsRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_STAT,
    },
  ],
  ADMIN: [
    {
      id: "home",
      label: "Home",
      icon: <HomeRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD,
    },
    {
      id: "prices",
      label: "Prices",
      icon: <AttachMoneyRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_PRICE,
    },
    {
      id: "plan",
      label: "Plan",
      icon: <PaidRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_PLAN,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <PersonRoundedIcon />,
      href: ROUTES_KEYS.DASHBOARD_PROFILE,
    },
  ],
}

const BOTTOM_MENU_ITEMS: MenuItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <PersonRoundedIcon />,
    href: ROUTES_KEYS.DASHBOARD_PROFILE,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsRoundedIcon />,
    href: ROUTES_KEYS.DASHBOARD_SETTING,
  },
]

function Sidebar() {
  const { user } = useAuth()

  // DashboardGuardian ensures user is authenticated, so we can safely assume user exists
  if (!user?.user) {
    return null
  }

  const userGroup = user.user.group as GroupKey
  const menuItems = MENU_ITEMS_BY_GROUP[userGroup]
  const isMember = userGroup === GROUPS.MEMBER

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Platform</Typography>
        <ThemeToggleButton />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Search"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": theme => theme.vars.radius.sm,
          }}
        >
          {menuItems.map(item => (
            <ListItem key={item.id}>
              <ListItemButton role="menuitem" component="a" href={item.href}>
                {item.icon}
                <ListItemContent>
                  <Typography level="title-sm">{item.label}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": theme => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          {BOTTOM_MENU_ITEMS.map(item => (
            <ListItem key={item.id}>
              <ListItemButton role="menuitem" component="a" href={item.href}>
                {item.icon}
                <ListItemContent>
                  <Typography level="title-sm">{item.label}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}

          {isMember && (
            <ListItem>
              <ListItemButton
                role="menuitem"
                component="a"
                href={ROUTES_KEYS.DASHBOARD_SUBSCRIPTION}
              >
                <PaidRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Subscription</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={user.user.avatar ?? undefined}
        >
          {!user.user.avatar &&
            `${user.user.first_name[0]}${user.user.last_name[0]}`}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user.user.first_name}</Typography>
          <Typography level="body-xs">{user.user.nickname}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  )
}

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
        }}
      >
        {/* Main content area */}
        <Box sx={{ p: 2, flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
