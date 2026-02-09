import { Language as LanguageIcon, Menu as MenuIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy"
import { getLocalizedUrl, type LocalesValues } from "intlayer"
import { useState } from "react"
import { useIntlayer, useLocale } from "react-intlayer"
import { Link, useLocation, useNavigate } from "react-router"
import { ThemeToggleButton } from "../components"
import { LANGUAGES, ROUTES_KEYS } from "../constants"

export const TopBar = () => {
  const { setLocale, locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()
  const { appName, login, signUp, languageSelector } = useIntlayer("topbar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.surface",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          {/* Logo */}
          <Link
            to={ROUTES_KEYS.ROOT}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography level="h4" fontWeight="bold" sx={{ color: "#25D366" }}>
              {appName as unknown as string}
            </Typography>
          </Link>

          {/* Navigation and Controls */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Login Button - hidden on mobile */}
            <Button
              component={Link}
              to={ROUTES_KEYS.LOGIN}
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                display: { xs: "none", sm: "flex" },
                height: 36,
                minWidth: 80,
                borderRadius: "sm",
              }}
            >
              {login as unknown as string}
            </Button>

            {/* Sign Up Button - hidden on mobile */}
            <Button
              component={Link}
              to={ROUTES_KEYS.REGISTER}
              variant="solid"
              size="sm"
              sx={{
                bgcolor: "#25D366",
                "&:hover": {
                  bgcolor: "#128C7E",
                },
                display: { xs: "none", sm: "flex" },
                height: 36,
                minWidth: 80,
                borderRadius: "sm",
              }}
            >
              {signUp as unknown as string}
            </Button>

            {/* Language Selector */}
            <Select
              value={locale}
              onChange={(_, value) => {
                if (value) {
                  const newLocale = value as LocalesValues
                  const newUrl = getLocalizedUrl(location.pathname, newLocale)
                  setLocale(newLocale)
                  void navigate(newUrl)
                }
              }}
              size="sm"
              variant="outlined"
              startDecorator={<LanguageIcon sx={{ fontSize: "1.25rem" }} />}
              sx={{
                minWidth: { xs: 60, sm: 100 },
                height: 36,
                "& .MuiSelect-button": {
                  display: "flex",
                  alignItems: "center",
                  py: 0,
                },
                "& .MuiSelect-startDecorator": {
                  mt: 0,
                  mb: 0,
                  display: "flex",
                  alignItems: "center",
                },
              }}
              slotProps={{
                button: {
                  sx: {
                    borderRadius: "sm",
                    height: "100%",
                    py: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  },
                },
              }}
            >
              <Option value={LANGUAGES.EN}>
                {languageSelector.english as unknown as string}
              </Option>
              <Option value={LANGUAGES.ES}>
                {languageSelector.spanish as unknown as string}
              </Option>
            </Select>

            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Mobile Menu Button */}
            <IconButton
              variant="outlined"
              color="neutral"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(true)
              }}
              sx={{
                display: { xs: "flex", sm: "none" },
                height: 36,
                width: 36,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>

          {/* Mobile Drawer */}
          <Drawer
            open={mobileMenuOpen}
            onClose={() => {
              setMobileMenuOpen(false)
            }}
            anchor="right"
            size="sm"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <Box sx={{ p: 2 }}>
              <Typography level="title-lg" sx={{ mb: 2, color: "#25D366" }}>
                {appName as unknown as string}
              </Typography>
              <List>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to={ROUTES_KEYS.LOGIN}
                    onClick={() => {
                      setMobileMenuOpen(false)
                    }}
                  >
                    {login as unknown as string}
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to={ROUTES_KEYS.REGISTER}
                    onClick={() => {
                      setMobileMenuOpen(false)
                    }}
                    sx={{ color: "#25D366", fontWeight: 600 }}
                  >
                    {signUp as unknown as string}
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Stack>
      </Container>
    </Box>
  )
}
