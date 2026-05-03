import { Language as LanguageIcon, Menu as MenuIcon } from "@mui/icons-material"
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
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

export const OnboardingHeader = () => {
  const { setLocale, locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()
  const { appName, languageSelector } = useIntlayer("topbar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ maxWidth: "md" }}
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
                  <Select
                    value={locale}
                    onChange={(_, value) => {
                      if (value) {
                        const newLocale = value as LocalesValues
                        const newUrl = getLocalizedUrl(
                          location.pathname,
                          newLocale,
                        )
                        setLocale(newLocale)
                        void navigate(newUrl)
                      }
                    }}
                    size="sm"
                    variant="outlined"
                    startDecorator={
                      <LanguageIcon sx={{ fontSize: "1.25rem" }} />
                    }
                    sx={{ width: "100%" }}
                  >
                    <Option value={LANGUAGES.EN}>
                      {languageSelector.english as unknown as string}
                    </Option>
                    <Option value={LANGUAGES.ES}>
                      {languageSelector.spanish as unknown as string}
                    </Option>
                  </Select>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Stack>
      </Box>
    </Box>
  )
}
